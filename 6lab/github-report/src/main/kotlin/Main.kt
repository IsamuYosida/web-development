import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.File

// Класс для хранения данных об одном репозитории
// @JsonIgnoreProperties(ignoreUnknown = true) — игнорирует поля из JSON, которых нет в классе
@JsonIgnoreProperties(ignoreUnknown = true)
data class Repository(
    @JsonProperty("name") val name: String,
    @JsonProperty("stargazers_count") val stars: Int,
    @JsonProperty("forks_count") val forks: Int,
    @JsonProperty("language") val language: String?,
    @JsonProperty("updated_at") val lastUpdate: String
)

// Функция получения списка репозиториев с GitHub API
fun fetchRepositories(username: String): List<Repository> {
    val client = OkHttpClient()
    val url = "https://api.github.com/users/$username/repos"

    val request = Request.Builder()
        .url(url)
        .get()
        .build()

    println("Отправляю запрос к GitHub API для пользователя: $username...")

    client.newCall(request).execute().use { response ->
        if (!response.isSuccessful) {
            throw Exception("Ошибка запроса: ${response.code} ${response.message}. Возможно, пользователь '$username' не найден.")
        }

        val responseBody = response.body?.string()
            ?: throw Exception("Пустое тело ответа")

        val mapper = jacksonObjectMapper()
        return mapper.readValue(responseBody)
    }
}

// Функция преобразования списка репозиториев в CSV-строку
fun repositoriesToCsv(repositories: List<Repository>): String {
    val header = "Название репозитория,Количество звезд,Количество форков,Язык программирования,Дата последнего обновления"

    val rows = repositories.joinToString("\n") { repo ->
        val language = repo.language ?: "Не указан"
        // Убираем возможные запятые в дате, чтобы не сломать CSV
        val cleanDate = repo.lastUpdate.replace(",", " ")
        "${repo.name},${repo.stars},${repo.forks},$language,$cleanDate"
    }

    return "$header\n$rows"
}

// Точка входа — функция main
fun main() {
    println("Введите имя пользователя GitHub:")
    val username = readln()

    try {
        val repos = fetchRepositories(username)

        if (repos.isEmpty()) {
            println("У пользователя '$username' нет публичных репозиториев.")
            return
        }

        // Расчёт среднего количества звёзд
        val averageStars = repos.map { it.stars }.average()
        println("Общее количество репозиториев: ${repos.size}")
        println("Среднее количество звезд: ${"%.2f".format(averageStars)}")

        // Генерация CSV
        val csvContent = repositoriesToCsv(repos)

        // Сохранение в файл
        val fileName = "${username}_repositories.csv"
        File(fileName).writeText(csvContent, Charsets.UTF_8)

        println("Отчет успешно сохранен в файл: $fileName")
        println("Полный путь: ${File(fileName).absolutePath}")

    } catch (e: Exception) {
        System.err.println("Произошла ошибка: ${e.message}")
    }
}
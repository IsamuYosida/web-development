// текущий игрок
let currentPlayer = 'X';
// игровое поле (двумерный массив)
let board = [];
// размер поля
let size = 3;
// флаг окончания игры
let gameOver = false;

function startGame() {
  // преобразуем в число
  size = parseInt(document.getElementById('size').value);
  const game = document.getElementById('game');

  // сброс состояния
  game.innerHTML = '';
  board = [];
  currentPlayer = 'X';
  gameOver = false;

  // создаем grid
  game.style.gridTemplateColumns = `repeat(${size}, 60px)`;

  for (let i = 0; i < size; i++) {
  board[i] = [];  // Создаем новый ряд в массиве
    for (let j = 0; j < size; j++) {
      board[i][j] = '';  // Пустая клетка
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.addEventListener('click', () => makeMove(i, j, cell));
      game.appendChild(cell); //добавляем кнопку
    }
  }
}

function makeMove(i, j, cell) {
  // нельзя ходить, если игра закончена +проверка на занятость клетки
  if (board[i][j] !== '' || gameOver) return;

  board[i][j] = currentPlayer; //смотрит кто занял клетку и отображает 
  cell.textContent = currentPlayer;

  if (checkWin(i, j)) {
    alert(`Победил ${currentPlayer}`); //сообщение с победой
    gameOver = true;
    return;
  }

  if (checkDraw()) {
    alert('Ничья!');  //also
    gameOver = true;
    return;
  }
  // смена игрока
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //Тернарный оператор 
}

function restartGame() {
  startGame();
}

function checkWin(row, col) {
  // проверка строки
  if (board[row].every(cell => cell === currentPlayer)) return true;
  // проверка столбца
  if (board.every(r => r[col] === currentPlayer)) return true;
  // главная диагональ
  if (row === col && board.every((r, i) => r[i] === currentPlayer)) return true;
  // побочная диагональ
  if (
    row + col === size - 1 &&
    board.every((r, i) => r[size - 1 - i] === currentPlayer)
  ) return true;

  return false;
}

function checkDraw() {
  return board.every(row => row.every(cell => cell !== ''));
}
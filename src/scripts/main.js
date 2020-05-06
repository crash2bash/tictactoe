'use strict';

const winningCombination = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

let playerX = [];
let playerY = [];
let count = 0;
let drawCounter = 0;

const game = document.querySelector('.game');

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.createElement('div');

  wrapper.className = 'game__wrapper';
  game.appendChild(wrapper);

  for (let i = 0; i < 3; i++) {
    const field = document.createElement('div');

    field.className = 'game__row';

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');

      cell.className = 'game__cell';
      field.appendChild(cell);
    }

    wrapper.appendChild(field);
  }

  const button = document.createElement('button');

  button.className = 'game__button';
  button.textContent = 'restart';
  game.appendChild(button);

  const modalCreate = document.createElement('div');

  modalCreate.className = 'modal';
  game.appendChild(modalCreate);

  const winCreate = document.createElement('div');

  winCreate.className = 'game__win';
  game.appendChild(winCreate);

  const winTextCreate = document.createElement('p');

  winTextCreate.className = 'game__win-text';
  winCreate.appendChild(winTextCreate);

  const gameCell = document.querySelectorAll('.game__cell');
  const restart = document.querySelector('.game__button');
  const winModal = document.querySelector('.game__win');
  const modal = document.querySelector('.modal');

  const winner = function(counter) {
    if (counter % 2 === 0) {
      modal.classList.add('show');
      winModal.classList.add('show');

      winTextCreate.textContent
        = 'Выиграли нолики! Поздравляем с победой!';
    } else {
      modal.classList.add('show');
      winModal.classList.add('show');

      winTextCreate.textContent
        = 'Выиграли крестики! Поздравляем с победой!';
    }
  };

  const checkWinner = function(ind, arr, counter) {
    let index = ind;

    index += 1;

    for (let i = 0; i < winningCombination.length; i++) {
      let total = 0;
      const win = winningCombination[i];

      if (win.indexOf(index) !== -1) {
        for (let j = 0; j < win.length; j++) {
          if (arr.indexOf(win[j]) !== -1) {
            total++;

            if (total === 3) {
              drawCounter = 0;
              total = 0;
              winner(counter);
            }
          }
        }
        total = 0;
      }
    }
  };

  function checkDraw(item) {
    if (item.classList.contains('circle') || item.classList.contains('cross')) {
      drawCounter++;
    }

    if (drawCounter > 8) {
      winTextCreate.textContent
        = 'Ничья! Сыграйте еще!';
      winModal.classList.add('show');
      modal.classList.add('show');
      drawCounter = 0;
    }
  }

  gameCell.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('circle')
        || item.classList.contains('cross')) {
        return;
      }

      if (count % 2 === 0) {
        item.classList.add('cross');
        playerX.push(index + 1);
      } else {
        item.classList.add('circle');
        playerY.push(index + 1);
      }

      count++;

      checkDraw(item);

      if (playerX.length > 2 || playerY.length > 2) {
        checkWinner(index, playerX, count)
        || checkWinner(index, playerY, count);
      }
    });
  });

  function restartGame() {
    playerX = [];
    playerY = [];
    count = 0;

    gameCell.forEach(item => item.classList.contains('cross')
      ? item.classList.remove('cross')
      : item.classList.remove('circle'));
  }

  restart.addEventListener('click', function() {
    restartGame();
  });

  modal.addEventListener('click', function() {
    restartGame();

    modal.classList.remove('show');
    winModal.classList.remove('show');
  });
});

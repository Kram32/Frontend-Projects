'use strict';
let text = document.querySelector('.text');
let againButton = document.querySelector('.again');
let checkButton = document.querySelector('.check');
let message = document.querySelector('.message');
let score1 = document.querySelector('.score');
let highScore1 = document.querySelector('.highscore');
let number = document.querySelector('.number');
let body = document.querySelector('body');

let guessNumber = Math.trunc(Math.random() * 20) + 1;
let score2 = 20;
let highScore2 = 0;

checkButton.addEventListener('click', function () {
  let value = Number(document.querySelector('.guess').value);

  if (value === guessNumber) {
    if (score2 > highScore2) {
      message.textContent = 'You got it right!';
      body.style.backgroundColor = 'blue';
      highScore2 = score2;
      highScore1.textContent = highScore2;
      number.textContent = guessNumber;
    }
  } else if (!value) {
    message.textContent = 'Pls input 1 to 20!';
  } else if (value > guessNumber) {
    if (score2 > 1) {
      score2--;
      message.textContent = 'Your too high!';
      score1.textContent = score2;
    } else {
      message.textContent = 'You lost the game!';
      score1.textContent = 0;
      body.style.backgroundColor = 'red';
    }
  } else if (value < guessNumber) {
    if (score2 > 1) {
      score2--;
      message.textContent = 'Your too low!';
      score1.textContent = score2;
    } else {
      message.textContent = 'You lost the game!';
      score1.textContent = 0;
      body.style.backgroundColor = 'red';
    }
  }
});

againButton.addEventListener('click', function () {
  document.querySelector('.guess').value = '';
  score2 = 20;
  score1.textContent = 20;
  guessNumber = Math.trunc(Math.random() * 20) + 1;
  message.textContent = 'Start guessing...';
  body.style.backgroundColor = '#222';
  number.textContent = '?';
});

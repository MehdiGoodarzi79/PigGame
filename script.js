'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

const score0 = document.getElementById('player-0-score');
const score1 = document.getElementById('player-1-score');

const current0 = document.getElementById('player-0-current-amount');
const current1 = document.getElementById('player-1-current-amount');

const dice = document.querySelector('.dice-image');

const btn_new = document.querySelector('.btn-new-game');
const btn_roll = document.querySelector('.btn-roll-dice');
const btn_hold = document.querySelector('.btn-hold-score');

score0.textContent = 0;
score1.textContent = 0;
let scores = [0, 0];
let activeplayer = 0;
let currentscore = 0;
let playing = true;


const newGame = function () {
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.remove("hidden");
  player0.classList.add('active-player');
  player1.classList.remove('active-player');
  document.querySelector("body").style.background = "#69cbc0" ;
  document.querySelector(".btn-hold-score").style.backgroundColor = "#e64980" ;
  document.querySelector(".btn-roll-dice").style.backgroundColor = "#228be6" ;
};
newGame();

const switchPlayer = function () {
  document.getElementById(`player-${activeplayer}-current-amount`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle('active-player');
  player1.classList.toggle('active-player');
};

btn_roll.addEventListener('click', function () {
  if (playing) {
    const dice_number = Math.ceil(Math.random() * 6);
    dice.src = `./dice-${dice_number}.png`;
    if (dice_number !== 1) {
      currentscore += dice_number;
      document.getElementById(`player-${activeplayer}-current-amount`).textContent = currentscore;
    } else {
      switchPlayer();
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (playing) {
    scores[activeplayer] += currentscore;

    document.getElementById(`player-${activeplayer}-score`).textContent = scores[activeplayer];
    if (scores[activeplayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");

      document.querySelector(".btn-hold-score").style.backgroundColor = "#333" ;
      document.querySelector(".btn-roll-dice").style.backgroundColor = "#333" ;

      document.querySelector("body").style.background = "#e64980" ;
      document.getElementById(`player-${activeplayer}-current-amount`).textContent = "🎉";
      document.querySelector(`.player-${activeplayer}`).classList.remove('active-player'); 
    } else {
      switchPlayer();
    }
  }
});

btn_new.addEventListener('click', newGame);
'use strict';

// Select DOM elements
const
    scorePlayerOne = document.querySelector('#score--0'),
    scorePlayerTwo = document.querySelector('#score--1'),
    dice = document.querySelector('.dice'),
    buttonRoll = document.querySelector('.btn--roll'),
    buttonHold = document.querySelector('.btn--hold'),
    buttonNew = document.querySelector('.btn--new'),
    winner = document.querySelectorAll('.winner')

let
    scores = [0,0],
    currentScore = 0,
    activePlayer = 0

// Starting conditions
scorePlayerOne.textContent = String(0)
scorePlayerTwo.textContent = String(0)

// Rolling the dice functionality
const rollDice = () => {
    // generate random number between 1 and 6
    let numberRolled = Math.trunc(Math.random() * 6) + 1

    // display the dice associated with the random number
    dice.src = `dice-${numberRolled}.png`

    // check if rolled 1
    if (numberRolled === 1) {
        currentScore = 0
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        activePlayer = activePlayer === 0 ? 1 : 0
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    } else {
        document.querySelector(`#current--${activePlayer}`)
        currentScore += numberRolled
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    }
}

// Hold the score
const holdScore = () => {
    scores[activePlayer] += currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]
    currentScore = 0
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

    if (scores[activePlayer] >= 100) {
        winner[activePlayer].classList.remove('hidden')
        buttonRoll.disabled = true
    } else {
        activePlayer = activePlayer === 0 ? 1 : 0
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    }

}

// Reset the game
const resetGame = () => {
    currentScore = 0
    scores = [0,0]
    scorePlayerOne.textContent = scores[0]
    scorePlayerTwo.textContent = scores[1]
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    winner[activePlayer].classList.add('hidden')
    buttonRoll.disabled = false
}

buttonRoll.addEventListener('click', rollDice)

buttonHold.addEventListener('click', holdScore)

buttonNew.addEventListener('click', resetGame)






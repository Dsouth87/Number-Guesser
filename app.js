let maxNum = 10,
  minNum = 1,
  answer = getRandomNumber(minNum, maxNum),
  guessLeft = 5

const gameUI = document.querySelector('#game')
const maxNumUI = document.querySelector('.max-num')
const minNumUI = document.querySelector('.min-num')
const guessUI = document.querySelector('#guess-input')
const submitUI = document.querySelector('.guess-btn')
const messageUI = document.querySelector('.message')
const scoreboardUI = document.querySelector('.scoreboard')
const scoreUI = document.querySelector('.score')

submitUI.addEventListener('click', submitGuess)
gameUI.addEventListener('mousedown', playAgain)

minNumUI.textContent = minNum
maxNumUI.textContent = maxNum

checkLocalStorage()

function submitGuess(e) {
  const guess = parseInt(guessUI.value)
  if (isNaN(guess) || guess > maxNum || guess < minNum) {
    setMessage(`Please select a number between ${minNum} and ${maxNum}`, 'red')
  } else if (guess === answer) {
    gameOver(true, `${answer} is the correct answer! YOU WIN!!`)
  } else {
    guessLeft -= 1

    if (guessLeft === 0) {
      gameOver(false, `You lost! The correct number was ${answer}`)
    } else {
      if (guess > answer) {
        setMessage(
          `${guess} is too high. You have ${guessLeft} guesses left.`,
          'red'
        )
      } else {
        setMessage(
          `${guess} is too low. You have ${guessLeft} guesses left.`,
          'red'
        )
      }
    }
  }
  guessUI.value = ''
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function playAgain(e) {
  if (e.target.className.includes('play-again')) {
    window.location.reload()
  }
}

function gameOver(win, msg) {
  const color = win ? 'green' : 'red'
  guessUI.disabled = true
  setMessage(msg, color)
  submitUI.value = 'Play Again?'
  submitUI.className += ' play-again'
  if (win) {
    if (window.localStorage.getItem('score') === null) {
      window.localStorage.setItem('score', (6 - guessLeft).toString())
      scoreUI.textContent = 6 - guessLeft
      scoreboardUI.style.display = 'flex'
    } else if (
      guessLeft >
      5 - JSON.parse(window.localStorage.getItem('score'))
    ) {
      window.localStorage.setItem('score', JSON.stringify(6 - guessLeft))
      scoreUI.textContent = 6 - guessLeft
      scoreboardUI.style.display = 'flex'
    }
  }
}

function setMessage(message, color) {
  messageUI.textContent = message
  guessUI.style.borderColor = color
  messageUI.style.color = color
}

function checkLocalStorage() {
  if (window.localStorage.getItem('score')) {
    scoreUI.textContent = window.localStorage.getItem('score')
    scoreboardUI.style.display = 'flex'
  }
}

/*------------------------ Cached Element References ------------------------*/
const startBtn = document.querySelector('#start-btn')
const catcherElement = document.querySelector('#net-object')
const fallingObjectsElement = document.querySelector('#falling-objects')
const scoreElement = document.querySelector('#score')
const livesElement = document.querySelector('#lives')
const startScreenElement = document.querySelector('#start-screen')
const gameOverElement = document.querySelector('#game-over-screen')
const winScreenElement = document.querySelector('#win-screen')
const playAgainBtns = document.querySelectorAll('.play-again')
const finalScoreElement = document.querySelector('#final-score')

// console.log(startBtn, catcherElement, fallingObjectsElement, scoreElement, livesElement, startScreenElement, gameOverElement, winScreenElement, playAgainBtns, finalScoreElement)

/*-------------------------------- Constants --------------------------------*/
const keys = { Left: false, Right: false }
const fishTypes = ['🐟', '🐠', '🐡', '🦈', '🦑', '🦐']
const bomb = '🧨'

/*---------------------------- Variables (state) ----------------------------*/
let catcher = 650
let score = 0
let lives = []
let gameRunning = false

let movementInterval
let objectInterval
let fallIntervals = []

/*---------------------------- Functions ----------------------------*/
function init() {
    // reset all values 
    clearInterval(movementInterval)
    clearInterval(objectInterval)

    fallIntervals.forEach(clearInterval)
    fallIntervals = []

    fallingObjectsElement.innerHTML = ''

    startScreenElement.classList.add('hidden')
    gameOverElement.classList.add('hidden')
    winScreenElement.classList.add('hidden')

    catcher = 650
    score = 0
    lives = ['❤️', '❤️', '❤️']
    gameRunning = true

    scoreElement.textContent = `Score: ${score}`
    livesElement.textContent = `Lives: ${lives.join(' ')}`

    // save the catcherMovement to be executed every 16ms to movementInterval
    movementInterval = setInterval(catcherMovement, 16)

    startGame()
}

function catcherMovement() {
    if (!gameRunning) return

    // if left key clicked move the catcher 5px to the left
    if (keys.Left) catcher -= 5
    // if right key clicked move the catcher 5px to the right
    if (keys.Right) catcher += 5

    // stops catcher from going out of the container
    if (catcher < 275) catcher = 276
    if (catcher > 925) catcher = 926

    catcherElement.style.left = `${catcher}px`
}

function startGame() {
    fallingObjects()

    // assigns the fallingObjects to be executed every 1.5s to objectInterval
    objectInterval = setInterval(fallingObjects, 1500)
}

function fallingObjects() {
    createObject(Math.random() < 0.7
        ? fishTypes[Math.floor(Math.random() * fishTypes.length)]
        : bomb
    )

}

function createObject(type) {
    // creates span to add objects in html
    const item = document.createElement('span')
    item.textContent = type
    item.style.position = 'absolute'
    item.style.top = '0px'
    item.style.left = Math.floor(Math.random() * 650) + 'px'

    // adds the span to html using AppendChild (Add span to the <p id="falling-objects"></p>)
    fallingObjectsElement.appendChild(item)

    let y = 0

    const fall = setInterval(() => {

        // if game is not running stop objects from falling
        if (!gameRunning) {
            item.remove()
            clearInterval(fall)
            return
        }

        y += 3
        item.style.top = `${y}px`

        // handleCatching function called to catch the fallen object -item- and its place after falling -fall-
        handleCatching(item, fall)

        // if fallen object falls over 600px vertically (does not appear in screen) remove it and stop its falling
        if (y > 600) {
            item.remove()
            clearInterval(fall)
        }

        // 25 is falling speed, higher number will make it slow, lower number will be faster
    }, 25)

    // add each fallen item into fallIntervals array
    fallIntervals.push(fall)
}

function handleCatching(item, fall) {
    // get catcher and fallenObjects location using .getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const catcherRect = catcherElement.getBoundingClientRect()

    // checking if the catcher and item is near each other 
    if (
        itemRect.left < catcherRect.right &&
        itemRect.right > catcherRect.left &&
        itemRect.top < catcherRect.bottom &&
        itemRect.bottom > catcherRect.top
    ) {
        // check if catching a bomb, minus lives (pop lives out of lives array) and if lives array is empty calls gameOver function
        if (item.textContent === bomb) {
            lives.pop()
            livesElement.textContent = `Lives: ${lives.join(' ')}`

            if (lives.length === 0) return gameOver()

        } else {
            // if not bomb add 10 points in score, update score and if score is 150 calls winGame function
            score += 10
            scoreElement.textContent = `Score: ${score}`

            if (score >= 150) return winGame()
        }
        // otherwise remove the fallen object and delete its falling feature
        item.remove()
        clearInterval(fall)
    }
}

// if player wins reset all and show game winning screen
function winGame() {
    gameRunning = false

    clearInterval(movementInterval)
    clearInterval(objectInterval)

    fallIntervals.forEach(clearInterval)
    fallIntervals = []

    finalScoreElement.textContent = score

    // remove hidden from win screen class to show, and hide the game over screen
    winScreenElement.classList.remove('hidden')
    gameOverElement.classList.add('hidden')
}

// if player loses reset all and show the game over screen
function gameOver() {
    gameRunning = false

    clearInterval(movementInterval)
    clearInterval(objectInterval)

    fallIntervals.forEach(clearInterval)
    fallIntervals = []

    finalScoreElement.textContent = score

    // remove hidden from game over class to show, and hide the win game screen
    gameOverElement.classList.remove('hidden')
    winScreenElement.classList.add('hidden')
}

/*-------------------------------- Evennt Listeners ----------------------------*/
// using window property to handle if a, d, left arrow, right arrow is pressed (Keydown) the keys left and right will be true and movement will start
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = true
    if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = true
})

// if the keyup means player stopped pressing the keys (left and right) be false and movement stops
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = false
    if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = false
})

// Start btn event listener
startBtn.addEventListener('click', init)

// loop each play again btns from game over and winning screen
playAgainBtns.forEach(btn => btn.addEventListener('click', init))

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
    // Stop all previous game intervals and clear old objects    
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

    // Move the catcher every 16 ms
    movementInterval = setInterval(catcherMovement, 16)

    startGame()
}

function catcherMovement() {
    if (!gameRunning) return

    // Move the catcher left while the left key is pressed
    if (keys.Left) catcher -= 5
    // Move the catcher right while the right key is pressed
    if (keys.Right) catcher += 5

    // Stop the catcher from moving outside the game area
    if (catcher < 275) catcher = 276
    if (catcher > 925) catcher = 926

    catcherElement.style.left = `${catcher}px`
}

function startGame() {
    fallingObjects()

    // Create a new falling object every 1.5 seconds
    objectInterval = setInterval(fallingObjects, 1500)
}

function fallingObjects() {
    let object
    // 70% chance to create a fish, 30% chance to create a bomb
    if (Math.random() < 0.7) {
        object = fishTypes[Math.floor(Math.random() * fishTypes.length)]
    } else {
        object = bomb
    }
    // Create the selected object
    createObject(object)
}

function createObject(type) {
    // Create a new span element for the falling object
    const item = document.createElement('span')
    item.textContent = type
    item.style.position = 'absolute'
    item.style.top = '0px'
    item.style.left = Math.floor(Math.random() * 650) + 'px'

    // Add the object to the game area
    fallingObjectsElement.appendChild(item)

    let y = 0

    // Update the object's position every 25 ms
    const fall = setInterval(() => {

        // Stop this object if the game has ended
        if (!gameRunning) {
            item.remove()
            clearInterval(fall)
            return
        }

        y += 3
        item.style.top = `${y}px`

        // Check whether the catcher has caught the object
        handleCatching(item, fall)

        // Remove the object after it leaves the game area
        if (y > 600) {
            item.remove()
            clearInterval(fall)
        }

    }, 25)

    // Store the interval so it can be stopped later
    fallIntervals.push(fall)
}

function handleCatching(item, fall) {
    // Get the positions of the object and the catcher
    const itemRect = item.getBoundingClientRect()
    const catcherRect = catcherElement.getBoundingClientRect()

    // Check if the object and catcher overlap
    if (
        itemRect.left < catcherRect.right &&
        itemRect.right > catcherRect.left &&
        itemRect.top < catcherRect.bottom &&
        itemRect.bottom > catcherRect.top
    ) {
        // Lose a life if a bomb is caught
        if (item.textContent === bomb) {
            lives.pop()
            livesElement.textContent = `Lives: ${lives.join(' ')}`

            if (lives.length === 0) return gameOver()

        } else {
            // Increase the score and check for a win
            score += 10
            scoreElement.textContent = `Score: ${score}`

            if (score >= 150) return winGame()
        }
        // Remove the caught object and stop its falling interval
        item.remove()
        clearInterval(fall)
    }
}

// Stop the game and show the win screen
function winGame() {
    gameRunning = false

    clearInterval(movementInterval)
    clearInterval(objectInterval)

    fallIntervals.forEach(clearInterval)
    fallIntervals = []

    finalScoreElement.textContent = score

    // Show the win screen and hide the game over screen
    winScreenElement.classList.remove('hidden')
    gameOverElement.classList.add('hidden')
}

// Stop the game and show the game over screen
function gameOver() {
    gameRunning = false

    clearInterval(movementInterval)
    clearInterval(objectInterval)

    fallIntervals.forEach(clearInterval)
    fallIntervals = []

    finalScoreElement.textContent = score

    // Show the game over screen and hide the win screen
    gameOverElement.classList.remove('hidden')
    winScreenElement.classList.add('hidden')
}

/*-------------------------------- Evennt Listeners ----------------------------*/
// Start moving when a movement key is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = true
    if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = true
})

// Stop moving when the movement key is released
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = false
    if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = false
})

// Start btn event listener
startBtn.addEventListener('click', init)

// Restart the game when any "Play Again" button is clicked
playAgainBtns.forEach(btn => btn.addEventListener('click', init))

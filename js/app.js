/*------------------------ Cached Element References ------------------------*/
const startBtn = document.querySelector('#start-btn')
const playAgainBtn = document.querySelector('#play-again-btn')
const catcherElement = document.querySelector('#net-object')
const fallingObjectsElement = document.querySelector('#falling-objects')
const scoreElement = document.querySelector('#score')
const livesElement = document.querySelector('#lives')
const startScreenElement = document.querySelector('#start-screen')
const gameBoardElement = document.querySelector('#game-container')
console.log(startBtn, playAgainBtn, catcherElement, fallingObjectsElement, scoreElement, livesElement, startScreenElement, gameBoardElement)

/*-------------------------------- Constants --------------------------------*/
const keys = {
    Left: false,
    Right: false
}
const fishTypes = ['🐟', '🐠', '🐡', '🦈']

/*---------------------------- Variables (state) ----------------------------*/
let catcher = 650


/*-------------------------------- Functions --------------------------------*/
function init() {
    startScreenElement.classList.add('hidden')

    setInterval(catcherMovement, 16)
    startGame()
    collecting()
}

function catcherMovement() {
    console.log(catcher)
    if (catcher <= 300) catcher = 301
    if (catcher >= 976) catcher = 977

    if (keys.Left) catcher -= 5
    if (keys.Right) catcher += 5

    catcherElement.style.left = `${catcher}px`
    collecting()

}

function collecting() {
    console.log('collecting' + catcher)

}

function startGame() {
    fallingFish()
    setInterval(fallingFish, 1500)
}

function fallingFish() {

    const fish = document.createElement('span')

    fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)]

    fish.style.position = 'absolute'
    fish.style.top = '0px'
    fish.style.left = Math.floor(Math.random() * 650) + 'px'

    fallingObjectsElement.appendChild(fish)

    let y = 0

    const fall = setInterval(() => {
        y += 3
        fish.style.top = y + 'px'

        if (y > 600) {
            fish.remove()
            clearInterval(fall)
        }
    }, 25)
}

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = true
    if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = true
})

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = false
    if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = false
})
startBtn.addEventListener('click', init)


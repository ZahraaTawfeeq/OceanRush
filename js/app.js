/*------------------------ Cached Element References ------------------------*/
const startBtn = document.querySelector('#start-btn')
const playAgainBtn = document.querySelector('#play-again-btn')
const catcherElement = document.querySelector('#net-object')
const fishElement = document.querySelectorAll('.falling-object')
const scoreElement = document.querySelector('#score')
const livesElement = document.querySelector('#lives')
const startScreenElement = document.querySelector('#start-screen')
const gameBoardElement = document.querySelector('#game-container')
console.log(startBtn, playAgainBtn, catcherElement, fishElement, scoreElement, livesElement, startScreenElement, gameBoardElement)

/*-------------------------------- Constants --------------------------------*/
const catcherWidth = 70
const boardWidth = 100
const keys = {
    Left: false,
    Right: false
}

/*---------------------------- Variables (state) ----------------------------*/
let catcher = 165


/*-------------------------------- Functions --------------------------------*/
function catcherMovement() {
    if (keys.Left) catcher -= 5
    if (keys.Right) catcher += 5

    catcherElement.style.left = `${catcher}px`
}

function init() {
    startScreenElement.classList.add('hidden')

    catcher = 165
    catcherElement.style.left = `${catcher}px`

    setInterval(catcherMovement, 16)
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


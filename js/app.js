/*------------------------ Cached Element References ------------------------*/
const startBtn = document.querySelector('#start-btn')
const playAgainBtn = document.querySelector('#play-again-btn')
const catcherElement = document.querySelector('#net-object')
const fallingObjectsElement = document.querySelector('#falling-objects')
const scoreElement = document.querySelector('#score')
const livesElement = document.querySelector('#lives')
const startScreenElement = document.querySelector('#start-screen')
const gameBoardElement = document.querySelector('#game-container')
const gameOverElement = document.querySelector('#game-over-screen')

/*-------------------------------- Constants --------------------------------*/
const keys = {
    Left: false,
    Right: false
}

const fishTypes = ['🐟', '🐠', '🐡', '🦈', '🦑', '🦐']
const bomb = '🧨'

/*---------------------------- Variables (state) ----------------------------*/
let catcher = 650
let score = 0
let lives = ['❤️', '❤️', '❤️']

/*-------------------------------- Functions --------------------------------*/

function init() {
    startScreenElement.classList.add('hidden')

    scoreElement.textContent = `Score: ${score}`
    livesElement.textContent = `Lives: ${lives}`

    setInterval(catcherMovement, 16)
    startGame()
}

function catcherMovement() {
    if (keys.Left) catcher -= 5
    if (keys.Right) catcher += 5

    if (catcher < 300) catcher = 300
    if (catcher > 976) catcher = 976

    catcherElement.style.left = `${catcher}px`
}

function startGame() {
    fallingObjects()
    setInterval(fallingObjects, 1500)
}

function fallingObjects() {
    createObject(
        fishTypes[Math.floor(Math.random() * fishTypes.length)]
    )

    createObject(bomb)
}

function createObject(type) {
    const item = document.createElement('span')

    item.textContent = type
    item.style.position = 'absolute'
    item.style.top = '0px'
    item.style.left = Math.floor(Math.random() * 650) + 'px'

    fallingObjectsElement.appendChild(item)

    let y = 0

    const fall = setInterval(() => {
        y += 3
        item.style.top = y + 'px'

        catching(item, fall)

        if (y > 600) {
            item.remove()
            clearInterval(fall)
        }
    }, 25)
}

function catching(item, fall) {


    const itemRect = item.getBoundingClientRect()
    const catcherRect = catcherElement.getBoundingClientRect()
    if (
        itemRect.left < catcherRect.right &&
        itemRect.right > catcherRect.left &&
        itemRect.top < catcherRect.bottom &&
        itemRect.bottom > catcherRect.top
    ) {

        if (lives.length < 1) { gameOver() }

        if (item.textContent === bomb) {

            lives.pop()
            livesElement.textContent = `Lives: ${lives}`
            if (lives.length === 0) {
                gameOver()
            }
        } else {
            score += 10
            scoreElement.textContent = `Score: ${score}`
        }

        item.remove()
        clearInterval(fall)
    }

}
function gameOver() {

    gameOverElement.classList.remove('hidden')
    score = 0
    lives = ['❤️', '❤️', '❤️']

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
playAgainBtn.addEventListener('click', init)


// /*------------------------ Cached Element References ------------------------*/
// const startBtn = document.querySelector('#start-btn')
// const playAgainBtn = document.querySelector('#play-again-btn')
// const catcherElement = document.querySelector('#net-object')
// const fallingObjectsElement = document.querySelector('#falling-objects')
// const scoreElement = document.querySelector('#score')
// const livesElement = document.querySelector('#lives')
// const startScreenElement = document.querySelector('#start-screen')
// const gameBoardElement = document.querySelector('#game-container')
// console.log(startBtn, playAgainBtn, catcherElement, fallingObjectsElement, scoreElement, livesElement, startScreenElement, gameBoardElement)

// /*-------------------------------- Constants --------------------------------*/
// const keys = {
//     Left: false,
//     Right: false
// }
// const fishTypes = ['🐟', '🐠', '🐡', '🦈', '🦑', '🦐']
// const bomb = '🧨'
// /*---------------------------- Variables (state) ----------------------------*/
// let catcher = 650
// let score = 0

// /*-------------------------------- Functions --------------------------------*/
// function init() {
//     startScreenElement.classList.add('hidden')

//     setInterval(catcherMovement, 16)
//     startGame()
// }

// function catcherMovement() {
//     // console.log(catcher)
//     if (catcher <= 300) catcher = 301
//     if (catcher >= 976) catcher = 977

//     if (keys.Left) catcher -= 5
//     if (keys.Right) catcher += 5

//     catcherElement.style.left = `${catcher}px`
//     // catching()

// }


// function startGame() {
//     fallingFish()
//     setInterval(fallingFish, 1500)
// }


// function fallingFish() {
//     const fish = document.createElement('span')
//     const bombs = document.createElement('span')

//     bombs.textContent = bomb * 10
//     fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)]

//     fish.style.position = 'absolute'
//     fish.style.top = '0px'
//     fish.style.left = Math.floor(Math.random() * 650) + 'px'

//     bombs.style.position = 'absolute'
//     bombs.style.top = '0px'
//     bombs.style.left = Math.floor(Math.random() * 650) + 'px'


//     fallingObjectsElement.appendChild(fish)
//     fallingObjectsElement.appendChild(bombs)

//     let y = 0

//     const fall = setInterval(() => {
//         y += 3
//         fish.style.top = y + 'px'
//         bombs.style.top = y + 'px'


//         catching(fish, fall)
//         catching(bombs, fall)

//         if (y > 600) {
//             fish.remove()
//             bombs.remove()
//             clearInterval(fall)
//         }
//     }, 25)



// }

// function catching(fish, fall) {
//     const fishRect = fish.getBoundingClientRect()
//     const catcherRect = catcherElement.getBoundingClientRect()
// const bomb =
//     if (
//         fishRect.left < catcherRect.right &&
//         fishRect.right > catcherRect.left &&
//         fishRect.top < catcherRect.bottom &&
//         fishRect.bottom > catcherRect.top
//     ) {
//         score += 10
//         scoreElement.textContent = `Score: ${score}`

//         fish.remove()
//         clearInterval(fall)
//     }

//     else if (
//         fishRect.left < catcherRect.right &&
//         fishRect.right > catcherRect.left &&
//         fishRect.top < catcherRect.bottom &&
//         fishRect.bottom > catcherRect.top
//     ) {
//         score += 10
//         scoreElement.textContent = `Score: ${score}`

//         fish.remove()
//         clearInterval(fall)
//     }
// }

// /*----------------------------- Event Listeners -----------------------------*/

// window.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = true
//     if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = true
// })

// window.addEventListener('keyup', (e) => {
//     if (e.key === 'ArrowLeft' || e.key === 'a') keys.Left = false
//     if (e.key === 'ArrowRight' || e.key === 'd') keys.Right = false
// })

// startBtn.addEventListener('click', init)


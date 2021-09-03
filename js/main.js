function init() {
const startGameButton = document.querySelector('button')
const body = document.querySelector('body')
const wrapDiv = document.querySelector('.wrap')

wrapDiv.style.visibility = 'hidden'
const grid = document.querySelector(".grid")
body.style.backgroundColor = 'black'
grid.style.backgroundColor = 'white'

function startGame() {
  // Global variables

  // grid
const grid = document.querySelector(".grid")
const width = 9;
const cellSize = width * width;
const cells = [];

  // Ship class and position\
const spaceShipClass = "spaceShip"
const startingPositionShip = 76
let currentPositionShip = startingPositionShip

  // Aliens class and position
const aliensClass = "aliens"
const aliens = [];
const aliensArray = [2, 3, 4, 5, 6, 11, 12, 13, 14, 15];
const startingPositionAlien = 0;
let movement = 1;
let movementRight = true;
let currentAlienPositions = startingPositionAlien;

  // Keeping track of player lives
const playerLives = document.getElementById("playerLives");
playerLivesTracker = 3;
playerLives.innerText = 3;

  // Keeping track of player score
const playerScore = document.getElementById("playerScore");
let playerScoreTracker = 0;
playerScore.innerText = 0;

  // Generating the game grid
function gridCreation(startPos) {
    for (let i = 0; i < cellSize; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
    cells.push(cell);
    }
    startShip(startPos);
    startAliens(startPos);
}
  // Player/Ship add + remove
function startShip(cellPosition) {
    cells[cellPosition].classList.add(spaceShipClass);
}

function removeShip(removePosition) {
    cells[removePosition].classList.remove(spaceShipClass);
}

  // Aliens add + remove
function startAliens() {
    for (let i = 0; i < aliensArray.length; i++) {
    if (!aliens.includes(i)) {
        cells[aliensArray[i]].classList.add(aliensClass);
    }
    }
}

function removeAliens() {
    for (let i = 0; i < aliensArray.length; i++) {
    cells[aliensArray[i]].classList.remove(aliensClass);
    }
}

function movingSpaceShip(event) {
    removeShip(currentPositionShip);

    const key = event.keyCode;
    const rightKey = 39;
    const leftKey = 37;
    const space = 32;

    if (key === rightKey && currentPositionShip % width !== width - 1) {
    currentPositionShip++;
    } else if (key === leftKey && currentPositionShip % width !== 0) {
    currentPositionShip--;
    } 
    startShip(currentPositionShip);
}

document.addEventListener("keydown", movingSpaceShip)

function movingAliens() {
    const moveRight = aliensArray[aliensArray.length - 1] % width === width - 1;
    const moveLeft = aliensArray[0] % width === 0;

    removeAliens();

    if (moveRight && movementRight) {
    for (let i = 0; i < aliensArray.length; i++) {
        aliensArray[i] += width + 1;
        movement = -1;
        movementRight = false;
    }
    }
    if (moveLeft && !movementRight) {
    for (let i = 0; i < aliensArray.length; i++) {
        aliensArray[i] += width - 1;
        movement = 1;
        movementRight = true;
    }
    }
    for (let i = 0; i < aliensArray.length; i++) {
    aliensArray[i] += movement;
    }
    startAliens();
}
const alienMovement = setInterval(movingAliens, 500) // Should be 500, less used only for testing purposes


  // Bullets/Projectile movement
function flyingProjectiles(event) {
    let timerProjectiles = null;
    let currentProjectilePositions = currentPositionShip;
    function shootProjectile() {

    cells[currentProjectilePositions].classList.remove("bullets");
    console.log('shooting', currentProjectilePositions)
    currentProjectilePositions -= width;
    if (cells[currentProjectilePositions]) {
        
        cells[currentProjectilePositions].classList.add("bullets");

        if (cells[currentProjectilePositions].classList.contains(aliensClass)) {
        cells[currentProjectilePositions].classList.remove("bullets");
        cells[currentProjectilePositions].classList.remove("alien");
        cells[currentProjectilePositions].classList.add("bullets2");

        setTimeout(
            () =>
            cells[currentProjectilePositions].classList.remove("bullets2"),
            200);
            
        clearInterval(timerProjectiles);

        const alientsHit = aliensArray.indexOf(currentProjectilePositions)
        aliens.push(alientsHit)
        playerScoreTracker += 100
        playerScore.innerHTML = playerScoreTracker
        } 
    } else{
        clearInterval(timerProjectiles);
    }
    }
    if (event.keyCode === 32) {
        timerProjectiles = setInterval(shootProjectile, 200)
        }
}

// END GAME CONDITIONS, NOT FINISHED

function gameOver() {
    if(aliens.length === aliensArray.length) {
        wrapDiv.style.diplay= 'none'
        alert('Game Over by defeating all enemies, player wins!')
    } else if ((cells[currentPositionShip].classList.contains(aliensClass, spaceShipClass))) {
        wrapDiv.style.display = 'none'
        alert('Game Over by alien invasion, enemy wins!')
}
}

const aliensHittingShip = setInterval(gameOver, 1000)
function gameOverTimer() {
aliensHittingShip
}

gameOverTimer()
gridCreation(startingPositionShip)
document.addEventListener("keyup", flyingProjectiles);

startGameButton.style.visibility = 'hidden'
body.style.backgroundColor = 'black'
body.style.color = 'white'
wrapDiv.style.visibility = 'visible'
}
startGameButton.addEventListener('click', startGame)

}

// REMAINING TASKS
/*
0. Fix centering css
1. Add enemy bullets
2. Make bullet drops random
3. Take off lives for 
*/


  /* Initial PLAN */

  // Start button for the game, which will have an event listener 'click'

  // Will have the gun spawn at the centre of the bottom row on the grid, may change it to a random spawn point in the bottom row though later on.

  // Player score should be global, and always start at 0
  // const playerScore = 0

  // Starting amount of player lives for each game
  // const PlayerLives = 3

  // What happens when start game button is clicked?
/*
0. Ideally to make it all in sync, there should be a short/small countdown, eg 3 seconds for everything to begin.
0.1 During this time, the 'aliens' should spawn randomly distributed, alongside the mounted gun turret spawning at the bottom.

1. Once the above countdown/timer/interval is over, it should be possible for the alien armada to move, and also possible for the mounted gun to move.
- Mounted gun should be able to shoot projectiles, and move from left to right alongside the grid. it is not able to move vertically though.
- Alien armada is able to move both horizontally and then vertically, as it drops lower, the speed of moving vertically and horizontally gradually increments/increases.

2. Projectiles
- If a projectile is fired and hits a target, it makes that alien disappear plus adds on to playerScore.

3. Game end/Termination
- Game ends if player finishes all the targets/alien armada
OR
- Game ends if player loses all their lives
*/

/* 
BONUS 

*/


window.addEventListener("DOMContentLoaded", init);

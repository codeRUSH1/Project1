function init() {

// Global variables
const grid = document.querySelector('grid')
const width = 9
const cellSize = width * width 
const cells = []
const startingPosition = 0

function gridCreation() {
    for (let i = 0; i < cellSize; i++) {
        const cell = document.createElement('div')
        cell.innerHTML = i
        grid.appendChild(cell)
        cells.push(cell)
    }
}

gridCreation()




// Start button for the game, which will have an event listener 'click'


// Will have the gun spawn at the centre of the bottom row on the grid, may change it to a random spawn point in the bottom row though later on.


// Player score should be global, and always start at 0
const playerScore = 0

// Starting amount of player lives for each game
const PlayerLives = 3

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

}

window.addEventListener('DOMContentLoaded', init)
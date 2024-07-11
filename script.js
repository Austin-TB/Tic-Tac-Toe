const gridItems = document.querySelectorAll('.grid-item');
const resetGameButton = document.querySelector('#reset-game-button')

//function to hide elements
const hideTiles = () => gridItems.forEach(item => item.innerHTML = '');

hideTiles();

let clickCount = 1;
const message = document.createElement('p');
document.body.appendChild(message);

const winCombs = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['a', 'd', 'g'], ['b', 'e', 'h'], ['c', 'f', 'i'], ['a', 'e', 'i'], ['c', 'e', 'g']].map(item => item.sort());

//func to check if combination is a winning a combination
const checkWin = (clicks) => {
    for (const comb of winCombs) {
        if (comb.every(item => clicks.includes(item))) {
            gameOver=true;
            comb.forEach(item=>{
                document.querySelector(`.${item}`).style.backgroundColor='lightgreen';
            });
            return true;
        }
    }
    return false;
}

let playerOneClicks = []
let playerTwoClicks = []

let gameOver= false

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.innerHTML !== '' || gameOver) return;
        resetGameButton.style.backgroundColor = 'orange';
        if (clickCount % 2 !== 0) {
            item.innerHTML = '<i class="fa-regular fa-circle"></i>'
            playerOneClicks.push(item.classList[1]);
            if (checkWin(playerOneClicks.sort())) {
                message.textContent = 'O wins!'
            }
        }
        else {
            item.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            playerTwoClicks.push(item.classList[1]);
            if (checkWin(playerTwoClicks.sort())) {
                message.textContent = 'X wins!';
            }
        }
        clickCount++;
        if (clickCount === 10) {
            message.textContent = 'Draw. Press Play Again.'
        }
    });
});
resetGameButton.addEventListener('click', () => {
    playerOneClicks = []
    playerTwoClicks = []
    clickCount = 1;
    hideTiles();
    gameOver=false
    resetGameButton.style.backgroundColor = 'grey';
    message.textContent = '';
    gridItems.forEach(item => item.style.backgroundColor='white')
});

const $ = document;

const cells = $.querySelectorAll('.table__cell');
const winner = $.querySelector('.winner');
const modalParent = $.querySelector('.modal-parent');
const modalCells = $.querySelectorAll('.modal-table__cell');
const playAgainBtn = $.querySelector('.play-again');

let moveCounter = 0;
let winnerFlag = false;

function setGameMove(e) {
    //Prevent duplicate clicked cell
    if (!e.target.innerHTML) {
        if (moveCounter % 2 === 0) {
            e.target.innerText = 'X';
        } else {
            e.target.innerText = 'O';
        }

        moveCounter++;
    }
}

//generate array of cell value(x or o) -> (we do that to condition in checkGameOver function be easy to read)
function cellInnerArrayGenerator() {
    let cellsArr = [];
    cells.forEach(function(cell) {
        cellsArr.push(cell.innerHTML);
    });
    
    return cellsArr;
}

function checkGameOver(e, cellsArr) {
    if (
       cellsArr[0] !== '' && cellsArr[0] === cellsArr[1] && cellsArr[0] === cellsArr[2] ||
       cellsArr[0] !== '' && cellsArr[0] === cellsArr[3] && cellsArr[0] === cellsArr[6] ||
       cellsArr[0] !== '' && cellsArr[0] === cellsArr[4] && cellsArr[0] === cellsArr[8] ||
       cellsArr[6] !== '' && cellsArr[6] === cellsArr[7] && cellsArr[6] === cellsArr[8] ||
       cellsArr[2] !== '' && cellsArr[2] === cellsArr[5] && cellsArr[2] === cellsArr[8] ||
       cellsArr[2] !== '' && cellsArr[2] === cellsArr[4] && cellsArr[2] === cellsArr[6] ||
       cellsArr[1] !== '' && cellsArr[1] === cellsArr[4] && cellsArr[1] === cellsArr[7] ||
       cellsArr[3] !== '' && cellsArr[3] === cellsArr[4] && cellsArr[3] === cellsArr[5] 
       ) {
        winnerFlag = true;
        endGame(e);
    }

    if (moveCounter === 9) {
        endGame();
    }
}

function showGameResult() {
    let cellsArr = cellInnerArrayGenerator();
    let cellCounter = 0;

    modalCells.forEach(function(modalCell) {
        modalCell.innerHTML = cellsArr[cellCounter];

        cellCounter++;
    });
}

//error
function endGame(e) {
    if (winnerFlag) {
        if (e.target.innerHTML === 'X') {
            winner.innerHTML = 'X player win';
        } else {
            winner.innerHTML = 'O player win';
        }
    } else { 
        winner.innerHTML = 'nobody win';
    }

    $.querySelector('main').style.filter = 'blur(5px)';

    showGameResult();

    modalParent.style.display = 'block';
}

function resetGame() {
    $.querySelector('main').style.filter = 'blur(0)';
    modalParent.style.display = 'none';
    
    moveCounter = 0;

    cells.forEach(function(cell) {
        cell.innerHTML = '';
    });
}

cells.forEach(function(cell) {
    cell.addEventListener('click', function(e) {
        setGameMove(e);

        let cellsArr = cellInnerArrayGenerator();

        checkGameOver(e, cellsArr);
    });
});

playAgainBtn.addEventListener('click', resetGame);
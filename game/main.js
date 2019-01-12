/* 
puzzle games: 
http://www.raymondhill.net/puzzle-rhill/jigsawpuzzle-rhill.php
https://shout.setfive.com/2015/04/23/javascript-building-a-html5-canvas-puzzle/
*/

let game;

window.addEventListener("beforeunload", function () {
    window.localStorage.setItem('game-state', JSON.stringify(game));
});


// TODO: move in navigation.js
const loadImage = document.getElementById('load__image');
loadImage.addEventListener('input', loadImageEventHandler);

const loadUrl = document.getElementById('load__url');
loadUrl.addEventListener('input', loadUrlEventHandler);

const pieceShape = document.getElementById('piece__shape__difficulty_slider');
const pieceNumber = document.getElementById('piece__number__difficulty_slider');

let loadSavedGame = document.getElementById('load__saved__game');
loadSavedGame.addEventListener('input', loadSavedGameHandler);

function loadImageEventHandler(event) {
    if (!event.target.value) {
        alert('Please Select One');
    } else {
        let reader = new FileReader();
        let imagePath = loadImage.files[0];

        reader.readAsDataURL(imagePath);
        reader.addEventListener("load", () => drawImageFromSrcOnCanvas(reader.result));
    }
}

function loadUrlEventHandler() {
    drawImageFromSrcOnCanvas(loadUrl.value);
}

function drawImageFromSrcOnCanvas(imageSrc) {
    let image = new Image();
    image.src = imageSrc;

    image.addEventListener("load", function () {
        if (typeof game === 'undefined') {
            let difficulty = new Difficulty(pieceNumber.value, pieceShape.value);
            game = new Game(image, difficulty);
        } else {
            game.image = image;
            game.src = image.src;
            game.pieces = [];
            game.solvedPieces = [];
            game.progress = 0;
            let difficulty = new Difficulty(pieceNumber.value, pieceShape.value);
            game.difficulty = difficulty.pieceNumber;
            game.canvas = new Canvas(image, difficulty.pieceShape);
        }

        setGameProgressBar(0);

        game.initializeGame();
    });
}

function onUpEventHandler() {
    game.releasePiece();
}

function onDownEventHandler(event) {
    let clickPosition = game.canvas.getClickCoordinatesOnCanvas(event);
    game.determineClickedPiece(clickPosition);
}

function onMoveEventHandler(event) {
    if (game.clickedPieceIndex !== -1) {
        game.movePiece(event);
    }
}

function onResetEventHandler() {
    game.pieces = [];
    game.solvedPieces = [];
    game.progress = 0;

    let difficulty = new Difficulty(pieceNumber.value, pieceShape.value);
    game.difficulty = difficulty.pieceNumber;
    game.canvas.shapeDifficulty = 9 - difficulty.pieceShape;

    setGameProgressBar(0);

    game.initializePuzzle();
}

// https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
function onRandomSelectedEventHandler() {
    if (game.pieces.length === 0) {
        return;
    }
    let randomIndex = Math.floor(Math.random() * game.pieces.length);
    let piece = game.pieces[randomIndex];
    piece.moveToFinalLocation();
    piece.makeVisible();
    piece.markAsSolved();

    game.moveToSolvedPieces(randomIndex);

    game.progress += game.getProgressIncrement();
    setGameProgressBar(game.progress);
}

function onCurrentlySelectedEventHandler() {
    if (game.lastClickedPieceIndex !== -1) {
        let piece = game.pieces[game.lastClickedPieceIndex];

        piece.moveToFinalLocation();
        piece.makeVisible();
        piece.markAsSolved();

        game.moveToSolvedPieces(game.lastClickedPieceIndex);

        game.progress += game.getProgressIncrement();
        setGameProgressBar(game.progress);

        game.lastClickedPieceIndex = -1;
    }
}

function onSaveEventHandler() {
    let gameData = JSON.stringify(game, null, 4);

    let anchor = document.createElement('a');
    anchor.href = 'data:application/json,' + gameData;
    anchor.style.display = 'none';
    anchor.download = "puzzle-saved-game.json";

    document.body.appendChild(anchor);
    anchor.click(); // Force the browser to show the save file menu without making the user click.
    document.body.removeChild(anchor);
}

function loadSavedGameHandler(event) {
    if (!event.target.value) {
        alert('Please Select One');
    } else {
        let reader = new FileReader();
        let file = loadSavedGame.files[0];
        reader.readAsText(file, "UTF-8");

        reader.addEventListener("load", () => resumeFromSavedGame(reader.result));
    }
}

function resumeFromSavedGame(savedGame) {
    let gameData = JSON.parse(savedGame);
    // console.log(gameData);

    let image = new Image();
    image.src = gameData.src;
    let difficulty = gameData.canvas.shapeDifficulty;

    image.addEventListener("load", function () {
        if (typeof game === 'undefined') {
            let diff = new Difficulty(gameData.difficulty, gameData.canvas.shapeDifficulty);
            game = new Game(image, diff);
        } else {
            game.canvas = new Canvas(image, difficulty);
        }

        game.image = image;
        game.src = gameData.src;
        game.pieces = createPieces(gameData.pieces);
        game.solvedPieces = createPieces(gameData.solvedPieces);
        game.rows = gameData.rows;
        game.columns = gameData.columns;
        game.clickedPieceIndex = gameData.clickedPieceIndex;
        game.lastClickedPieceIndex = gameData.lastClickedPieceIndex;
        game.progress = gameData.progress;
        game.progressIncrement = 100 / game.pieces.length;
        game.displayHelperImage = gameData.displayHelperImage;
        game.difficulty = gameData.difficulty;

        game.canvas.shapeDifficulty = gameData.canvas.shapeDifficulty;

        game.resume();
    });
}

function createPieces(pieces) {
    let pieceObjects = [];
    for (let piece of pieces) {
        let p = new Piece(new Point(), new Point(), 1, 1, 1, 1);
        p.x = piece.x;
        p.y = piece.y;
        p.width = piece.width;
        p.height = piece.height;
        p.finalX = piece.finalX;
        p.finalY = piece.finalY;
        p.row = piece.row;
        p.column = piece.column;
        p.offsetX = piece.offsetX;
        p.offsetY = piece.offsetY;
        p.visible = piece.visible;
        p.solved = piece.solved;

        pieceObjects.push(p);
    }

    return pieceObjects;
}

let savedGame = window.localStorage.getItem("game-state");
if (savedGame !== 'undefined') {
    resumeFromSavedGame(savedGame);
}
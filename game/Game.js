class Game {
    constructor(image, difficulty) {
        this.canvas = new Canvas(image, difficulty.pieceShape);
        this.image = image;
        this.src = image.src;
        this.pieces = [];
        this.solvedPieces = [];
        this.rows = 0;
        this.columns = 0;
        this.clickedPieceIndex = -1;
        this.lastClickedPieceIndex = -1;
        this.progress = 0;
        this.progressIncrement = 100 / this.pieces.length;
        this.displayHelperImage = false;
        this.difficulty = difficulty.pieceNumber;
    }

    toggleDisplayHelperImageWithSolvedPuzzle(event) {
        if (event.code === 'Space') {
            this.displayHelperImage = !this.displayHelperImage;
        }
    }

    getProgressIncrement() {
        return this.progressIncrement;
    }

    makePiecesVisible(pieces) {
        for (let piece of pieces) {
            piece.makeVisible();
        }
    }

    releasePiece() {
        if (this.clickedPieceIndex !== -1) {
            let tmp = this.pieces[this.clickedPieceIndex];
            this.pieces.splice(this.clickedPieceIndex, 1);
            this.pieces.push(tmp);

            this.makePiecesVisible(this.pieces);

            this.pieces[this.clickedPieceIndex].offsetX = 0;
            this.pieces[this.clickedPieceIndex].offsetY = 0;
            this.checkSolved();
            this.clickedPieceIndex = -1;
        }

    }

    checkSolved() {
        let newX = this.pieces[this.clickedPieceIndex].x;
        let newY = this.pieces[this.clickedPieceIndex].y;
        let finalX = this.pieces[this.clickedPieceIndex].finalX;
        let finalY = this.pieces[this.clickedPieceIndex].finalY;

        let snapTolerance = 100;

        if (Math.abs(newX - finalX) < snapTolerance && Math.abs(newY - finalY) < snapTolerance) {
            this.pieces[this.clickedPieceIndex].x = finalX;
            this.pieces[this.clickedPieceIndex].y = finalY;
            this.pieces[this.clickedPieceIndex].markAsSolved();

            this.moveToSolvedPieces(this.clickedPieceIndex);

            this.progress += this.getProgressIncrement();
            setGameProgressBar(this.progress);
        }
    }

    moveToSolvedPieces(index) {
        let piece = this.pieces[index];
        this.pieces.splice(index, 1);
        this.solvedPieces.push(piece);
    }

    drawHelperImageWithSolvedPuzzle() {
        this.canvas.drawHelperImageWithSolvedPuzzle();
    }

    hidePuzzlePieces() {
        for (let piece of this.pieces) {
            piece.makeInvisible();
        }
    }

    drawPuzzlePieces() {
        this.canvas.clear();

        for (let piece of this.solvedPieces) {
            this.canvas.drawPuzzlePiece(piece, this.rows, this.columns);
        }

        for (let piece of this.pieces) {
            this.canvas.drawPuzzlePiece(piece, this.rows, this.columns);
        }

        if (this.displayHelperImage) {
            this.drawHelperImageWithSolvedPuzzle();
        }
    }

    initializeGame() {
        this.initializePuzzle();
        this.setupEventHandlers();

        let self = this;
        this.clearAllIntervals();
        setInterval(function () { self.drawPuzzlePieces(); }, 10);
    }

    clearAllIntervals() {
        var lastIntervalId = window.setInterval("", 0);
        for (var i = 1; i < lastIntervalId; i++) {
            window.clearInterval(i);
        }

    }

    resume() {
        this.clearAllIntervals();

        this.setupEventHandlers();
        let self = this;
        setInterval(function () { self.drawPuzzlePieces(); }, 10);
    }

    initializePuzzle() {
        this.columns = this.difficulty;
        this.rows = this.difficulty;

        this.createPieces();
    }

    determineClickedPiece(click) {
        let x = click.x;
        let y = click.y;

        for (let i = this.pieces.length - 1; i >= 0; --i) {
            if (this.pieces[i].isClicked(click)) {
                this.clickedPieceIndex = i;
                this.lastClickedPieceIndex = i;
                this.hidePuzzlePieces();
                this.pieces[i].makeVisible();
                this.pieces[i].offsetX = x - this.pieces[i].x;
                this.pieces[i].offsetY = y - this.pieces[i].y;
                return;
            }
        }
    }

    setupEventHandlers() {
        let onDown = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
        this.canvas.canvas.addEventListener(onDown, onDownEventHandler, false);

        let onUp = ((document.ontouchstart !== null) ? 'mouseup' : 'touchend');
        this.canvas.canvas.addEventListener(onUp, onUpEventHandler, false);

        let onMove = ((document.ontouchstart !== null) ? 'mousemove' : 'touchmove');
        this.canvas.canvas.addEventListener(onMove, onMoveEventHandler, false);

        let onReset = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
        document.getElementById('reset').addEventListener(onReset, onResetEventHandler, false);

        let self = this;
        document.onkeypress = function (event) { self.toggleDisplayHelperImageWithSolvedPuzzle(event); };

        document.getElementById('random').addEventListener('click', onRandomSelectedEventHandler, false);
        document.getElementById('currentlySelected').addEventListener('click', onCurrentlySelectedEventHandler, false);

        let onSave = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
        document.getElementById('save').addEventListener(onSave, onSaveEventHandler, false);
    }

    movePiece(click) {
        let clickPosition = this.canvas.getClickCoordinatesOnCanvas(click);
        let piece = this.pieces[this.clickedPieceIndex];
        piece.move(clickPosition);
    }

    createPieces() {
        let actualWidth = this.image.width / this.columns;
        let actualHeight = this.image.height / this.rows;
        let maxWidth = this.canvas.canvas.width / this.columns;
        let maxHeight = this.canvas.canvas.height / this.rows;

        let pieceRatio = calculateAspectRatioFit(actualWidth, actualHeight, maxWidth, maxHeight);

        for (let row = 0; row < this.rows; ++row) {
            for (let column = 0; column < this.columns; ++column) {
                let randomLocation = this.computeRandomPieceLocation(pieceRatio);
                let finalLocation = new Point(pieceRatio.width * column, pieceRatio.height * row);

                let piece = new Piece(randomLocation, finalLocation, pieceRatio.width, pieceRatio.height, row, column);
                this.pieces.push(piece);
            }
        }

        this.progressIncrement = 100 / this.pieces.length;
    }

    computeRandomPieceLocation(pieceRatio) {
        let x = computeRandom(0, this.canvas.canvas.width - pieceRatio.width);
        let y = computeRandom(0, this.canvas.canvas.height - pieceRatio.height);

        return new Point(x, y);

    }

}
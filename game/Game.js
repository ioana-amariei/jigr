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
        this.snapTolerance = 100;
        this.drawingEventHandlerId = null;
    }

    isOver() {
        return this.pieces.length === 0;
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
            let clickedPiece = this.pieces[this.clickedPieceIndex];
            this.pieces.splice(this.clickedPieceIndex, 1);
            this.pieces.push(clickedPiece);

            this.makePiecesVisible(this.pieces);

            clickedPiece.offsetToClickLocation = new Point(0, 0);

            this.checkSolved();
            this.clickedPieceIndex = -1;
        }
    }

    satisfiesSnapTolerance(x1, x2) {
        return Math.abs(x1 - x2) < this.snapTolerance;
    }

    canBeSnapped(piece) {
        let currentLocation = piece.currentLocation;
        let finalLocation = piece.finalLocation;

        let canBeSnappedByX = this.satisfiesSnapTolerance(currentLocation.x, finalLocation.x);
        let canBeSnappedByY = this.satisfiesSnapTolerance(currentLocation.y, finalLocation.y);

        return canBeSnappedByX && canBeSnappedByY;
    }

    checkSolved() {
        let clickedPiece = this.pieces[this.clickedPieceIndex];

        if (this.canBeSnapped(clickedPiece)) {
            clickedPiece.moveToFinalLocation();
            clickedPiece.markAsSolved();
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

        if (this.isOver()) {
            this.clearDrawingHandler();
            
            let locale = localStorage.getItem('locale') || 'en';
            let message = locales[locale].gameFinishedMessage;
            iqwerty.toast.Toast(message, options);
        }
    }

    initializeGame() {
        this.initializePuzzle();
        this.setupEventHandlers();
    }

    resume() {
        setGameProgressBar(game.progress);
        this.setupEventHandlers();
    }

    clearDrawingHandler() {
        window.clearInterval(this.drawingEventHandlerId);
    }

    setupDrawingHandler() {
        let self = this;
        this.drawingEventHandlerId = setInterval(function () { self.drawPuzzlePieces(); }, 20);
    }

    initializePuzzle() {
        this.columns = this.difficulty;
        this.rows = this.difficulty;

        this.createPieces();
    }

    determineClickedPiece(click) {
        for (let i = this.pieces.length - 1; i >= 0; --i) {
            let piece = this.pieces[i];

            if (piece.isClicked(click)) {
                this.clickedPieceIndex = i;
                this.lastClickedPieceIndex = i;
                this.hidePuzzlePieces();
                piece.makeVisible();
                piece.offsetToClickLocation = new Point(click.x - piece.currentLocation.x, click.y - piece.currentLocation.y);
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
        document.getElementById('reset__option').addEventListener(onReset, onResetEventHandler, false);

        let self = this;
        document.onkeypress = function (event) { self.toggleDisplayHelperImageWithSolvedPuzzle(event); };

        document.getElementById('random__option').addEventListener('click', onRandomSelectedEventHandler, false);

        let onSave = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
        document.getElementById('save__option').addEventListener(onSave, onSaveEventHandler, false);

        this.clearDrawingHandler();
        this.setupDrawingHandler();
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
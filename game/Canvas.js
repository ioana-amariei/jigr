class Canvas {
    constructor(image, pieceShape) {
        this.image = image;

        this.canvas = document.getElementById('canvas');
        this.canvas.style.backgroundColor = 'white';

        this.context = this.canvas.getContext('2d');

        this.maxWidth = 1350;
        this.maxHeight = 680;

        this.shapeDifficulty = 9 - pieceShape;

        this.setCanvasSize();
    }

    drawPuzzlePieceConnector(piece, edge, arcDirection) {
        let center = piece.getEdgeMiddlePoint(edge);
        let radius = Math.min(piece.height, piece.width) / this.shapeDifficulty;

        let startAngle = 0;
        let endAngle = 0;

        if (edge === EdgeType.TOP) {
            startAngle = Math.radians(180);
            endAngle = Math.radians(0);
        } else if (edge === EdgeType.RIGHT) {
            startAngle = Math.radians(270);
            endAngle = Math.radians(90);
        } else if (edge === EdgeType.BOTTOM) {
            startAngle = Math.radians(0);
            endAngle = Math.radians(180);
        } else if (edge == EdgeType.LEFT) {
            startAngle = Math.radians(90);
            endAngle = Math.radians(270);
        }

        this.context.arc(center.x, center.y, radius, startAngle, endAngle, arcDirection);
    }

    drawTopEdgeConnector(piece) {
        let isPieceRowEven = isEven(piece.row);
        let isPieceColumnEven = isEven(piece.column);

        if (isPieceColumnEven) {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.TOP, ArcDirection.COUNTER_CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.TOP, ArcDirection.CLOCKWISE);
            }
        } else {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.TOP, ArcDirection.CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.TOP, ArcDirection.COUNTER_CLOCKWISE);
            }
        }

    }

    drawRightEdgeConnector(piece) {
        let isPieceRowEven = isEven(piece.row);
        let isPieceColumnEven = isEven(piece.column);

        if (isPieceColumnEven) {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.RIGHT, ArcDirection.CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.RIGHT, ArcDirection.COUNTER_CLOCKWISE);
            }
        } else {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.RIGHT, ArcDirection.COUNTER_CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.RIGHT, ArcDirection.CLOCKWISE);
            }
        }
    }

    drawBottomEdgeConnector(piece) {
        let isPieceRowEven = isEven(piece.row);
        let isPieceColumnEven = isEven(piece.column);

        if (isPieceColumnEven) {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.BOTTOM, ArcDirection.COUNTER_CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.BOTTOM, ArcDirection.CLOCKWISE);
            }
        } else {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.BOTTOM, ArcDirection.CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.BOTTOM, ArcDirection.COUNTER_CLOCKWISE);
            }
        }
    }

    drawLeftEdgeConnector(piece) {
        let isPieceRowEven = isEven(piece.row);
        let isPieceColumnEven = isEven(piece.column);

        if (isPieceColumnEven) {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.LEFT, ArcDirection.CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.LEFT, ArcDirection.COUNTER_CLOCKWISE);
            }
        } else {
            if (isPieceRowEven) {
                this.drawPuzzlePieceConnector(piece, EdgeType.LEFT, ArcDirection.COUNTER_CLOCKWISE);
            } else {
                this.drawPuzzlePieceConnector(piece, EdgeType.LEFT, ArcDirection.CLOCKWISE);
            }
        }
    }

    drawPuzzlePieceBoundary(piece, rows, columns) {
        this.context.beginPath();

        this.context.moveTo(piece.currentLocation.x, piece.currentLocation.y);

        if (piece.row > 0) {
            this.drawTopEdgeConnector(piece);
        }

        this.context.lineTo(piece.currentLocation.x + piece.width, piece.currentLocation.y);

        if (piece.column < columns - 1) {
            this.drawRightEdgeConnector(piece);
        }

        this.context.lineTo(piece.currentLocation.x + piece.width, piece.currentLocation.y + piece.height);

        if (piece.row < rows - 1) {
            this.drawBottomEdgeConnector(piece);
        }

        this.context.lineTo(piece.currentLocation.x, piece.currentLocation.y + piece.height);

        if (piece.column > 0) {
            this.drawLeftEdgeConnector(piece);
        }

        this.context.lineTo(piece.currentLocation.x, piece.currentLocation.y);
        this.context.closePath();
    }

    drawPuzzlePiece(piece, rows, columns) {
        this.context.save();

        if (!piece.isVisible()) {
            this.context.globalAlpha = 0.25;
        }

        this.drawPuzzlePieceBoundary(piece, rows, columns);

        this.context.clip();

        let x = 0 - piece.finalLocation.x + piece.currentLocation.x;
        let y = 0 - piece.finalLocation.y + piece.currentLocation.y;

        this.context.drawImage(this.image, x, y, this.canvas.width, this.canvas.height);

        this.context.stroke();
        this.context.restore();
    }

    getClickCoordinatesOnCanvas(click) {
        let canvasBoundary = this.canvas.getBoundingClientRect();

        let x = click.clientX - canvasBoundary.left;
        let y = click.clientY - canvasBoundary.top;

        if (typeof click.changedTouches !== 'undefined') {
            x = click.changedTouches[0].pageX - canvasBoundary.left;
            y = click.changedTouches[0].pageY - canvasBoundary.top;
        }

        return new Point(x, y);
    }

    setCanvasSize() {
        let aspectRatio = calculateAspectRatioFit(this.image.width, this.image.height, this.maxWidth, this.maxHeight);
        this.canvas.width = aspectRatio.width;
        this.canvas.height = aspectRatio.height;
    }

    drawHelperImageWithSolvedPuzzle() {
        let ratio = calculateAspectRatioFit(this.image.width, this.image.height, this.maxWidth, this.maxHeight);
        this.context.drawImage(this.image, 0, 0, ratio.width, ratio.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
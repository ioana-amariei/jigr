class Piece {
    constructor(randomLocation, finalLocation, width, height, row, column) {
        this.x = randomLocation.x;
        this.y = randomLocation.y;
        this.width = width;
        this.height = height;
        this.finalX = finalLocation.x;
        this.finalY = finalLocation.y;
        this.row = row;
        this.column = column;
        this.offsetX = -1;
        this.offsetY = -1;
        this.visible = true;
        this.solved = false;
    }

    getEdgeMiddlePoint(edge) {
        if (edge === EdgeType.TOP) {
            return new Point(this.x + (this.width / 2), this.y);
        } else if (edge === EdgeType.RIGHT) {
            return new Point(this.x + this.width, this.y + (this.height / 2));
        } else if (edge === EdgeType.BOTTOM) {
            return new Point(this.x + (this.width / 2), this.y + this.height);
        } else if (edge === EdgeType.LEFT) {
            return new Point(this.x, this.y + (this.height / 2));
        } else {
            throw "Edge not defined: " + edge;
        }
    }

    isClicked(click) {
        if (this.isSolved()) {
            return false;
        }

        if (click.y < this.y) {
            return false;
        }

        if (click.y > this.y + this.height) {
            return false;
        }

        if (click.x < this.x) {
            return false;
        }

        if (click.x > this.x + this.width) {
            return false;
        }

        return true;
    }

    move(click) {
        this.x = click.x - this.offsetX;
        this.y = click.y - this.offsetY;
    }

    moveToFinalLocation() {
        this.x = this.finalX;
        this.y = this.finalY;
    }

    markAsSolved() {
        this.solved = true;
    }

    isSolved() {
        return this.solved;
    }

    isVisible() {
        return this.visible;
    }

    makeVisible() {
        this.visible = true;
    }

    makeInvisible() {
        this.visible = false;
    }
}
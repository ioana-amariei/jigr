class Piece {
    constructor(currentLocation, finalLocation, width, height, row, column) {
        this.currentLocation = currentLocation;
        this.finalLocation = finalLocation;
        this.offsetToClickLocation = new Point(0, 0);
        this.width = width;
        this.height = height;
        this.row = row;
        this.column = column;
        this.visible = true;
        this.solved = false;
    }

    getEdgeMiddlePoint(edge) {
        if (edge === EdgeType.TOP) {
            return new Point(this.currentLocation.x + (this.width / 2), this.currentLocation.y);
        } else if (edge === EdgeType.RIGHT) {
            return new Point(this.currentLocation.x + this.width, this.currentLocation.y + (this.height / 2));
        } else if (edge === EdgeType.BOTTOM) {
            return new Point(this.currentLocation.x + (this.width / 2), this.currentLocation.y + this.height);
        } else if (edge === EdgeType.LEFT) {
            return new Point(this.currentLocation.x, this.currentLocation.y + (this.height / 2));
        } else {
            throw "Edge not defined: " + edge;
        }
    }

    isClicked(click) {
        if (this.isSolved()) {
            return false;
        }

        if (click.y < this.currentLocation.y) {
            return false;
        }

        if (click.y > this.currentLocation.y + this.height) {
            return false;
        }

        if (click.x < this.currentLocation.x) {
            return false;
        }

        if (click.x > this.currentLocation.x + this.width) {
            return false;
        }

        return true;
    }

    move(click) {
        this.currentLocation.x = click.x - this.offsetToClickLocation.x;
        this.currentLocation.y = click.y - this.offsetToClickLocation.y;
    }

    moveToFinalLocation() {
        this.currentLocation = this.finalLocation;
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
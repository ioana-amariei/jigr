/* 
puzzle games: 
http://www.raymondhill.net/puzzle-rhill/jigsawpuzzle-rhill.php
https://shout.setfive.com/2015/04/23/javascript-building-a-html5-canvas-puzzle/
*/

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const loadImage = document.getElementById('load__image');
loadImage.addEventListener('input', loadImageEventHandler);

const loadUrl = document.getElementById('load__url');
loadUrl.addEventListener('input', loadUrlEventHandler);

function loadImageEventHandler(event) {
    if (!event.target.value) {
        alert('Please Select One');
    } else {
        let reader = new FileReader();
        let imagePath = loadImage.files[0];

        reader.readAsDataURL(imagePath);
        reader.addEventListener("load", () => drawImageFromSrcOnCanvas(reader.result), false);
    }
}

function loadUrlEventHandler() {
    drawImageFromSrcOnCanvas(loadUrl.value);
}

function drawImageFromSrcOnCanvas(imageSrc) {
    let image = new Image();
    image.src = imageSrc;

    image.addEventListener("load", () => drawImageOnCanvas(image));
}

function drawImageOnCanvas(image) {
    clearCanvas();

    let imageRatio = calculateAspectRatioFit(image.width, image.height, canvas.width, canvas.height);
    let imageOffset = calculateOffset(imageRatio.width, imageRatio.height);

    let pieces = [];
    let numColsToCut = 4;
    let numRowsToCut = 4;

    let widthOfOnePiece = image.width / numColsToCut;
    let heightOfOnePiece = image.height / numRowsToCut;
    let maxWidth = imageRatio.width / numColsToCut;
    let maxHeight = imageRatio.height / numRowsToCut;

    let pieceRatio = calculateAspectRatioFit(widthOfOnePiece, heightOfOnePiece, maxWidth, maxHeight);
    let destinationWidth = pieceRatio.width;
    let destinationHeight = pieceRatio.height;

    for (var x = 0; x < numColsToCut; ++x) {
        let imageOffsetX = imageOffset.x + x * destinationWidth;
        // let imageOffsetX = computeRandom(0, canvas.width - widthOfOnePiece);
        for (var y = 0; y < numRowsToCut; ++y) {
            let imageOffsetY = imageOffset.y + y * destinationHeight;
            // let offset = {
            //     x: imageOffsetX,
            //     y: imageOffsetY
            // }
            // console.log(offset);

            // let imageOffsetY = computeRandom(0, canvas.height - heightOfOnePiece);

            // context.drawImage(image, imageOffsetX, imageOffsetY, widthOfOnePiece, heightOfOnePiece);

            context.drawImage(
                image,
                x * widthOfOnePiece,  // sourceX (x coordinate from where to start image cropp)
                y * heightOfOnePiece, // sourceY (y coordinate from where to start image cropp)
                widthOfOnePiece,      // sourceWidth (width of puzzle piece from original image)
                heightOfOnePiece,     // sourceHeight (height of puzzle piece from original image)
                imageOffsetX,         // destinationX (x coordinate where from where to draw on canvas)
                imageOffsetY,         // destinationY (y coordinate from where to draw on canvas)
                destinationWidth,      // width of puzzle piece to be drawn on canvas
                destinationHeight);    // height of puzzle piece to be drawn on canvas

            pieces.push(canvas.toDataURL());
        }
    }

    // context.drawImage(image, imageOffset.x, imageOffset.y, imageRatio.width, imageRatio.height);
}

function computeRandom(min, max) {
    return ((Math.random() * (max - min) + min));
}

// https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
function calculateAspectRatioFit(imageWidth, imageHeigth, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeigth);
    return { width: imageWidth * ratio, height: imageHeigth * ratio };
}

// https://stackoverflow.com/questions/16317971/draw-images-on-in-the-middle-of-a-canvas
function calculateOffset(imageWidth, imageHeigth) {
    return {
        x: canvas.width / 2 - imageWidth / 2,
        y: canvas.height / 2 - imageHeigth / 2
    };
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
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

let pieces = [];

function drawImageOnCanvas(image) {
    clearCanvas();

    canvas.width = 1350;
    canvas.height = 680;
    let imageRatio = calculateAspectRatioFit(image.width, image.height, canvas.width, canvas.height);
    let imageOffset = calculateOffset(imageRatio.width, imageRatio.height);

    context.drawImage(image, imageOffset.x, imageOffset.y, imageRatio.width, imageRatio.height);
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
/* 
puzzle games: 
http://www.raymondhill.net/puzzle-rhill/jigsawpuzzle-rhill.php
https://shout.setfive.com/2015/04/23/javascript-building-a-html5-canvas-puzzle/
*/ 

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const loadImage = document.getElementById('load__image');
loadImage.addEventListener('input', loadImageEventHandler);

const loadUrl = document.getElementById('load__url');
loadUrl.addEventListener('input', loadUrlEventHandler);

function loadImageEventHandler(event) {
    if (!event.target.value) {
        alert('Please Select One');
    } else {
        let reader  = new FileReader();
        let imagePath = loadImage.files[0];
        
        reader.readAsDataURL(imagePath);
        reader.addEventListener("load", () => drawImageFromSrcOnCanvas(reader.result), false);
    }
}

function loadUrlEventHandler() {
    drawImageFromSrcOnCanvas(loadUrl.value);
}

function drawImageFromSrcOnCanvas(imageSrc) {
    let img = new Image();
    img.src = imageSrc;

    img.addEventListener("load", () => drawImageOnCanvas(img));
}

function drawImageOnCanvas(image) {
    ctx.drawImage(image, 250, 50, canvas.width, canvas.height);
}
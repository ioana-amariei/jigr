function isEven(value) {
    return value % 2 === 0;
}

function computeRandom(min, max) {
    return ((Math.random() * (max - min) + min));
}

function setGameProgressBar(percent) {
    var progressBar = document.getElementById("progress__bar");
    progressBar.style.width = percent + "%";
}

// https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
function calculateAspectRatioFit(actualWidth, actualHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / actualWidth, maxHeight / actualHeight);
    return { width: actualWidth * ratio, height: actualHeight * ratio };
}

// http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

function pointInCircle(point, circle) {
    return Math.sqrt((point.x - circle.x) * (point.x - circle.x) + (point.y - circle.y) * (point.y - circle.y)) < circle.r;
}
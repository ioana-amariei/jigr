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
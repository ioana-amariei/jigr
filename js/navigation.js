function toggleNavigationMenu() {
    var navMenu = document.getElementsByClassName("nav__container")[0];
    if (navMenu.style.display === "none") {
        navMenu.style.display = "flex";
    } else {
        navMenu.style.display = "none";
    }
} 

function setGameProgressBar(percent){
    var progressBar = document.getElementById("progress__bar");
    progressBar.style.width = percent + "%";
}


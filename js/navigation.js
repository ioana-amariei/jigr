function toggleNavigationMenu() {
    var navMenu = document.getElementById("nav__container");
    if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "flex";
    }
} 

function setGameProgressBar(percent){
    var progressBar = document.getElementById("progress__bar");
    progressBar.style.width = percent + "%";
}

function toggleArrowDirection(){
    var menuButton = document.getElementById("menu__button");
    var classes = menuButton.className;

    if(classes.includes('arrow__up')){
        classes = classes.replace('arrow__up', 'arrow__down');
    } else {
        classes = classes.replace('arrow__down', 'arrow__up');
    }

    menuButton.className = classes;
}


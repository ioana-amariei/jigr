let locales = {
    en: {
        helpAbout: "About",
        helpMadeBy: "Made by",
        helpDescribePlay: "Starts the game. A new game can be started by either loading a image from the local storage, or by using an URL.",
        helpDescribeSolvePiece: "Moves a randomly selected puzzle piece to its final location.",
        helpDescribeLoad: "Resume a game from a previously saved state.",
        helpDescribeSave: "Save the progress of the current game; this will provide the possibility to resume the game at a later time.",
        helpDescribeDifficulty: "The difficulty of the game can be controlled in several directions: 1. The number of pieces to generate for the new puzzle; 2. The shape of those pieces.",
        helpDescribeReset: "Restart the game from a new randomly generated state.",
        language: "EN",
        progress: "Progress",
        play: "Play",
        solvePiece: "Solve piece",
        currentlySelected: "Currently selected",
        random: "Random",
        reset: "Reset",
        load: "Load",
        chooseImageToUpload: "Choose image to upload",
        enterImageUrl: "Enter image URL",
        loadSavedGame: "Load saved game",
        save: "Save",
        difficulty: "Difficulty",
        game: "Game",
        pieceNumber: "Piece number",
        pieceShape: "Piece shape",
        resumeGameMessage: "Resuming the last played game !",
        gameFinishedMessage: "Puzzle completed !"
    },
    ro: {
        helpAbout: "Despre",
        helpMadeBy: "Dezvoltat de",
        helpDescribePlay: "Incepe un nou joc fie prin selectarea unei imagini de pe sistemul de fisiere local, ori furnizand URL-ul catre o imagine.",
        helpDescribeSolvePiece: "Muta o piesa aleasa aleatoriu pe pozitia sa finala.",
        helpDescribeLoad: "Continua un joc folosind o stare salvata anterior.",
        helpDescribeSave: "Salveaza progresul curent al jocului; ofera posibilitatea de a continua jocul mai tarziu.",
        helpDescribeDifficulty: "Dificultatea jocului poate fi controlata in mai multe moduri: 1. Numarul pieselor generate pentru noul joc; 2. Forma pieselor generate.",
        helpDescribeReset: "Reincepe jocul dintr-o stare generata in mod aleatoriu.",
        language: "RO",
        progress: "Progres",
        play: "Joaca",
        solvePiece: "Rezolva piesa",
        currentlySelected: "Selectata in mod curent",
        random: "Aleatoriu",
        reset: "Reseteaza",
        load: "Incarca",
        chooseImageToUpload: "Alege imagine",
        enterImageUrl: "Introdu URL-ul imaginii",
        loadSavedGame: "Continua un joc salvat",
        save: "Salveaza",
        difficulty: "Dificultate",
        game: "Joc",
        puzzleGeneration: "Generare puzzle",
        pieceNumber: "Numar piese",
        pieceShape: "Forma piese",
        resumeGameMessage: "Reluarea ultimului joc !",
        gameFinishedMessage: "Puzzle finalizat !"
      
    },
    
    ru: {
        helpAbout: "О нас",
        helpMadeBy: "Разработано",
        helpPlay: "играть",
        helpDescribePlay: "Acesta este butonul de incepere a jocului",
        helpSolvePiece: "Rezolva piesa",
        helpDescribeSolvePiece: "Acesta este butonul de rezolvare a unei piese.",
        helpDescribeSolvePiece1: "Rezolva in mod aleatoriu sau rezolva piesa curenta.",
        language: "RU",
        progress: "прогресс",
        play: "играть",
        solvePiece: "решить фрагмент",
        currentlySelected: "выбранного",
        random: "случайный",
        reset: "сбросить",
        load: "загрузить",
        chooseImageToUpload: "Выберите изображение для загрузки",
        enterImageUrl: "Введите URL-адрес изображения",
        loadSavedGame: "Загрузка сохраненные игры",
        save: "сохранить",
        difficulty: "сложности",
        game: "игра",
        pieceNumber: "Номер части",
        pieceShape: "Форма фигуры",
        resumeGameMessage: "Возобновление последней сыгранной игры !",
        gameFinishedMessage: "Головоломка завершена !"
    },

    fr: {
        helpAbout: "À propos", 
        helpMadeBy: "Faite par",
        helpPlay: "Jouer",
        helpDescribePlay: "Acesta este butonul de incepere a jocului",
        helpSolvePiece: "Rezolva piesa",
        helpDescribeSolvePiece: "Acesta este butonul de rezolvare a unei piese.",
        helpDescribeSolvePiece1: "Rezolva in mod aleatoriu sau rezolva piesa curenta.",
        language: "FR",
        progress: "progrès",
        play: "Jouer",
        solvePiece: "Résoudre la pièce",
        currentlySelected: "Actuellement sélectionné",
        random: "Aléatoire",
        reset: "Réinitialiser",
        load: "Charge",
        chooseImageToUpload: "Choisissez l’image à télécharger",
        enterImageUrl: "Entrez l’URL de l’image",
        loadSavedGame: "Jeu de charge sauvé",
        save: "Sauver",
        difficulty: "Difficulté",
        game: "Jeu",
        pieceNumber: "Numéro de pièce",
        pieceShape: "Pièce de forme",
        resumeGameMessage: "Reprise du dernier jeu joué!",
        gameFinishedMessage: "Puzzle terminé !"
    }
}

function updateLocale(locale) {
    localStorage.setItem('locale', locale);
    let localizedElements = document.getElementsByClassName("i18n");
    
    for (localizedElement of localizedElements){
        let id = localizedElement.id;
        localizedElement.innerHTML = locales[locale][id];
    };
}

let currentlySelectedLocale = localStorage.getItem('locale') || 'en';
updateLocale(currentlySelectedLocale);
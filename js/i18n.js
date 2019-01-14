let locales = {
    en: {
        helpAbout: "About",
        helpMadeBy: "Made by",
        helpPlay: "Play",
        helpDescribePlay: "This is the play button",
        helpSolvePiece: "Solve piece",
        helpDescribeSolvePiece: "This is the solve piece button",
        helpDescribeSolvePiece1: "Solve a random or selected puzzle piece.",
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
        helpPlay: "Joaca",
        helpDescribePlay: "Acesta este butonul de incepere a jocului",
        helpSolvePiece: "Rezolva piesa",
        helpDescribeSolvePiece: "Acesta este butonul de rezolvare a unei piese.",
        helpDescribeSolvePiece1: "Rezolva in mod aleatoriu sau rezolva piesa curenta.",
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
        puzzleGeneration: "Генерировать головоломку"
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
        puzzleGeneration: "Générer des puzzle"
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
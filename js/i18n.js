let locales = {
    en: {
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
        puzzleGeneration: "Puzzle generation"
    },
    ro: {
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
        puzzleGeneration: "Generare puzzle"
    }
}

function updateLocale(locale) {
    let localizedElements = document.getElementsByClassName("i18n");

    for (localizedElement of localizedElements){
        let id = localizedElement.id;
        localizedElement.innerHTML = locales[locale][id];
    };
}


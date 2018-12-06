let locales = {
    en: {
        language: "EN",
        play: "Play",
        solvePiece: "Solve piece",
        reset: "Reset",
        load: "Load",
        save: "Save",
        difficulty: "Difficulty"

    },
    ro: {
        language: "RO",
        play: "Joaca",
        solvePiece: "Rezolva piesa",
        reset: "Reseteaza",
        load: "Incarca",
        save: "Salveaza",
        difficulty: "Dificultate"
    }
}

function updateLocale(locale) {
    let localizedElements = document.getElementsByClassName("i18n");

    for (localizedElement of localizedElements){
        let id = localizedElement.id;
        localizedElement.innerHTML = locales[locale][id];
    };
}


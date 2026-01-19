var language = getDefaultLanguage();

function i18n(key){
    path = key.split(".");

    let result = translations[language];

    path.forEach(keyPart => {
        if (typeof result != "string" && keyPart in result){
            result = result[keyPart];
        } else {
            console.error("i18n: Incorrect key.");
        }
    });

    return result;
}


function getDefaultLanguage(){
    let lang;
    if (navigator.language != undefined){
        lang = (new Intl.Locale(navigator.language)).language;
    }

    if (lang != "en" && lang != "fr"){
        lang = "en";
    }

    return lang;
}
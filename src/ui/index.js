var mt = undefined;

function main() {
    readFile(result => {
        mt = new MachineTuring(result);

        loadMtUI(mt)
    });
}



function loadMtUI(mt) {

    execution.innerHTML = "";
    removeAllCursors();

    if(mt.isCorrect()) {
        const tapes = mt.getTapes();
        const posCursors = mt.getPosCursor();
        const transitions = mt.getTransitions();

        for (let i=0; i<tapes.length; i++) {
            const tape = tapes[i];

            const ruban = document.createElement('div');
            ruban.id = "ruban" + i;

            const table = split(tape,i);
            ruban.appendChild(table);
            execution.appendChild(ruban);

            const currentPos = posCursors[i];

            const idCursor = getIdCursor(currentPos,i);
            const element = document.getElementById(idCursor);
            colorCursor(element);
        }

        const state = document.createElement('div');
        state.id = "state";

        const cState = document.createElement('div');
        cState.id = "cState";

            cState.innerText = `${i18n("currentState")} : ${mt.getCurrentState()}`;

        const nextButton = document.createElement('button');
        nextButton.type = "button";
        nextButton.name = "Next";

            nextButton.id="next";
        nextButton.innerText = i18n("button.next");
        nextButton.addEventListener("click", (event) => {
            mt.next();
            loadMtUI(mt);
        })

        const tableTransitions = document.createElement('table');
        tableTransitions.id = "tabTransitions";

        const tbody = document.createElement('tbody');

        // Permet de ne pas avoir de doublons
        const listeAlphabet = new Set();
        for (const etat in transitions) {
            for (const symbole in transitions[etat]) {
                listeAlphabet.add(symbole);
            }
        }

        // On transforme listeAlphabet en tableau
        const alphabet = Array.from(listeAlphabet);

        const alphabetRow = document.createElement('tr');
        alphabetRow.innerHTML = `<td></td>`;
        alphabet.forEach(lettre => {
            const th = document.createElement('th');
            th.innerText = lettre;
            alphabetRow.appendChild(th);
        });

        tbody.appendChild(alphabetRow);

        for (const initialState in transitions){
            const row = document.createElement('tr');

            const cellEtat = document.createElement('td');
            cellEtat.innerText = initialState;
            row.appendChild(cellEtat);

            alphabet.forEach(lettre => {
                const td = document.createElement('td');

                const cases = transitions[initialState][lettre];;
                if (cases) {
                    td.innerText = `(${cases.nextState}, ${cases.nextSymbol}, ${cases.direction})`;
                } else {
                    td.innerText = "/";
                }
                row.appendChild(td);
            });

            tbody.appendChild(row);
            
        }

        tableTransitions.appendChild(tbody);

        state.appendChild(cState);
        state.appendChild(nextButton);
        execution.appendChild(state);
        execution.appendChild(tableTransitions);

            if(mt.isDone()) {
                const recognized = document.createElement('div');
                recognized.id = "recognized";
                recognized.innerText = i18n(`recognized.${mt.isRecognized().toString()}`);
                execution.appendChild(recognized);
        }

    } else {
        const divError = document.createElement('div');
        divError.id = "error";

        divError.innerText = `${i18n("error")} : ${i18n(`errorCode.${mt.getErrorCode()}`)}`;
        execution.appendChild(divError);
    }
}

function split(tape, tapeIndex) {
    const table = document.createElement('div');
    table.id = "table";
    for (let i=0; i<tape.length; i++) {
        const tab = document.createElement('p');
        tab.id = "tape"+tapeIndex+"-tab"+i;

        tab.innerText = tape[i];
        table.appendChild(tab);
    }
    return table;
}

function getIdCursor(posCursor, tapeIndex) {
    return "tape"+tapeIndex+"-tab"+posCursor;
}

function removeAllCursors() {
    const previousCursors = document.querySelectorAll(".color");
    previousCursors.forEach(elem => elem.classList.remove("color"));
}

function colorCursor(element) {

    element.classList.add("color");
}

const title = document.createElement('h1');
title.innerText = i18n("title");

const div = document.createElement('div');

const inputFile = document.createElement('input');
inputFile.type = "file";
inputFile.id = "mtFileSelector";
inputFile.name = "file";
inputFile.accept = ".mt";

const execution = document.createElement('div');
execution.id = "execution";

div.appendChild(inputFile);
div.appendChild(execution);

document.body.appendChild(title);
document.body.appendChild(div);


main();





function addLangSelect(container){
    let langSelect = document.createElement("div");
    langSelect.id = "langSelect";

    // add options
    let languages;
    
    if (language == "en"){
        languages = ["en", "fr"];
    } else {
        languages = ["fr", "en"];
    }

    /* Selected language */

    let selectedLang = document.createElement("p");
    selectedLang.id = "selectedLang";
    selectedLang.innerHTML = language.toUpperCase();
    langSelect.appendChild(selectedLang);

    /* languages options */

    let langList = document.createElement("div");
    langList.id = "langList";
    langList.classList.add("hidden");
    langSelect.appendChild(langList)

    languages.forEach(lang => {
        let langChoice = document.createElement("button");
        langChoice.classList.add("langChoice");

        langChoice.value = lang;
        langChoice.innerHTML = lang.toUpperCase();

        langList.appendChild(langChoice);


        // Change language and update vue
        langChoice.onclick = (_ => {
        if (langChoice.value != language){
            changeLang(langChoice.value);
        }
    });
    });



    /* show options */

    langSelect.addEventListener("mouseover", _ => {
        langList.classList.remove("hidden");
        selectedLang.classList.add("open");
    })

    langSelect.addEventListener("mouseout", _ => {
        langList.classList.add("hidden");
        selectedLang.classList.remove("open");
    })

    container.appendChild(langSelect);
}


addLangSelect(document.body);

function changeLang(lang) {
    language = lang;

    
    document.querySelector("h1").innerHTML = i18n("title");

    document.querySelector("#selectedLang").innerHTML = language.toUpperCase();
    
    if (mt != undefined){
        if (!mt.isCorrect()){
            document.querySelector("#error").innerHTML = `${i18n("error")} : ${i18n(`errorCode.${mt.getErrorCode()}`)}`;
        } else {
            if (mt.isDone()){
                document.querySelector("#recognized").innerHTML = i18n(`recognized.${mt.isRecognized().toString()}`);
            }

            document.querySelector("#cState").innerHTML = `${i18n("currentState")} : ${mt.getCurrentState()}`;
            document.querySelector("#next").innerHTML = i18n("button.next");
        }
    }


}
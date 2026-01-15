import { readFile } from "./../mt/utils.js";
import { MachineTuring } from "./../mt/MachineTuring.js";


function main() {
    readFile(result => {
        let mt = new MachineTuring(result);

        name(mt)
    });
}



function name(params) {
    console.log("toto");
    
}




const title = document.createElement('h1');
title.innerText = 'Machine de Turing';

const div = document.createElement('div');

const inputFile = document.createElement('input');
inputFile.type = "file";
inputFile.id = "mtFileSelector";
inputFile.name = "file";
inputFile.accept = ".mt";

const execution = document.createElement('div');
execution.id = ("execution");


div.appendChild(inputFile);
div.appendChild(execution);

document.body.appendChild(title);
document.body.appendChild(div);


main();
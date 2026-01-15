import { readFile } from "./utils.js";
import { MachineTuring } from "./MachineTuring.js";

function main() {
    readFile(result => {
        let mt = new MachineTuring(result);
    });
}


main();
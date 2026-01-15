export function readFile(callBack) {
    let inputFile = document.querySelector("#mtFileSelector");

    inputFile.onchange = (_ => {
        let fileReader = new FileReader()
        
        fileReader.onload = _ => {
            callBack(fileReader.result);
        }

        fileReader.readAsText(inputFile.files[0]);
    })
}

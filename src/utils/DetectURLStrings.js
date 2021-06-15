
//Devuelve una lista de objetos URL que indican los URL encontrados en un texto
function DetectURLStrings(text) {
    class URL {
        constructor (str, isLink) {
            this.str = str;
            this.isLink = isLink;
        }

        get String() {
            return this.str;
        }

        get Islink() {
            return this.isLink;
        }
    }

    let linksFound = [];

    //Dividir por lineas en un arreglo de lineas
    let lines = text.split('\n');

    //Expresion regular para identificar URLs
    const regEx = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

    for(let i = 0; i < lines.length; i++) {
        //Dividir cada linea por palabras en un arreglo de palabras
        wordsArr = lines[i].split(' ');

        for(let j = 0; j < wordsArr.length; j++){
            if(regEx.test(wordsArr[j])){
                var url = new URL(wordsArr[j], true);
                linksFound.push(url);
            }
        }
    }
    
    return linksFound;
}
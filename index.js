const prompt = require('prompt-sync')();
const fs = require('fs').promises;

let choice = parseInt(prompt("What's your format?1 - ascii 2 - binary 3 - HEX code"));
let char = prompt("What's your character?");
let filepath = prompt("What's your filepath?");

switch (choice){
    case 1:
        readASCIICode(filepath, parseInt(char))
        break;
    case 2:
        readBinaryCode(filepath, char)
        break;
    case 3:
        readHEXCode(filepath, char)
        break;
    default:
        console.log("Error, wrong code, try again")
        break;
}

async function readHEXCode(filepath, character){ // Ці 3 функції можна зібрати в 1 і просто конвертувати char при старті функції          
                                                 // на те що потрібно, але це не по SOLIDу
    console.time('file_read')                    // воно в функціях для більш точного заміру часу, хоча якщо поставити різниця буде абсолютно несутевою
    let buff = await fs.readFile(filepath);      
    let data = buff.toString();
    
    let counter = 0;
    let ch;
    for (let index = 0; index < data.length; index++) {
        ch = data.charCodeAt(index).toString(16)
        
        if (ch === character){
            counter += 1;
        }
    }
    console.timeEnd('file_read')
    console.log(`The symbol ${character} was found in file ${filepath} - ${counter} times`);
}

async function readASCIICode(filepath, character){
    console.time('file_read')
    let buff = await fs.readFile(filepath);
    let data = buff.toString();
    
    let counter = 0;
    let ch;
    for (let index = 0; index < data.length; index++) {
        ch = data.charCodeAt(index)
        
        if (ch === character){
            counter += 1;
        }
    }
    console.timeEnd('file_read')
    console.log(`The symbol ${character} was found in file ${filepath} - ${counter} times`);
}

async function readBinaryCode(filepath, character){
    console.time('file_read')
    let buff = await fs.readFile(filepath);
    let data = buff.toString();
    
    let counter = 0;
    let ch;
    for (let index = 0; index < data.length; index++) {
        ch = data.charCodeAt(index).toString(2)
        
        if (ch === character){
            counter += 1;
        }
    }
    console.timeEnd('file_read')
    console.log(`The symbol ${character} was found in file ${filepath} - ${counter} times`);
}

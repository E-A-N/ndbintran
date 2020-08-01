let decimalToBinary = (num, binaryHeader= false) => {
    head = binaryHeader ? "0b0" : "0";
    return head + num.toString(2);
};

/**
 * @param {string} message - list of characters to turn into binary values
 * @return {array} - A list of binary values
 */
let stringToBinary = (message) => {
    let binList = [];
    for (let i = 0; i < message.length; i++){
        let asciiValue = message.charCodeAt(i);
        let binaries = decimalToBinary(asciiValue)
        binList.push(binaries)
    }

    return binList;
}

let parseBinary = (binaries) => {
    let decimals = binaries.map((num) => {
        let hasHeader = num.slice(0, 2) === "0b";
        num = hasHeader ? num : "0b" + num;
        return Number(num);
    });

    return decimals;
};

let toMessage = (numberList) => {
    let message;
    if (Array.isArray(numberList)){
        message = numberList.map((num)=> {
            return String.fromCharCode(num)
        });
    }

    return message.join("");
}

let toSecret = (code, message) => {
    let binaryArray = stringToBinary(message);
    let secretArray = binaryArray.map((message) => {
        let secret = "";
        for (let i = 0; i < message.length; i++){
            secret = secret + code[message[i]];
        }
        return secret;
    });

    return secretArray.join(" ");
}

/**
 * 
 * @param {Array} code : 2 length array of characters representing 0 and 1 binaristic values 
 * @param {String} secret : message consisting of special characters
 * @returns {Array} numbers that have an ascii value 
 */
let fromSecret = (code, secret) => {
    secret = secret.split(" ");
    let binaryZero = code[0];
    let binaryOne  = code[1]
    let indenticalCharacters = binaryZero === binaryOne;
    let sameSize   = binaryZero.length === binaryOne.length;
    
    //this data structure uses the exact difference in the binary codes to indentify any explicit bit of
    //a secret binary message
    let differenceSignature = {
        zeroChar: "",
        oneChar: "",
        index: 0,
    }

    
    if (!indenticalCharacters){
        let charIter = 0;
        let zeroChar = "";
        let oneChar  = "";
        while(charIter < binaryZero.length || charIter < binaryOne.length){
            differenceSignature.index = charIter  
            
            //assign in case that there's characters left, otherwise the difference is that a code is shorter
            if (charIter < binaryZero.length){
                zeroChar = binaryZero[charIter];
            }
            else {//no more characters left, assign blank character
                differenceSignature.zeroChar = "";
                differenceSignature.oneChar = binaryOne[charIter];
                alert("Too short Zero Char is the case!!")
                break;     
            }
            if(charIter < binaryOne.length){
                oneChar = binaryOne[charIter];
            }
            else{
                differenceSignature.zeroChar = binaryZero[charIter];
                differenceSignature.oneChar = "";
                alert("Too short One Char is the case!!")
                break;
            }
            
            //assign in case that characters are observerd as different
            if (zeroChar !== oneChar){
                alert("True difference is the case!!")
                differenceSignature.zeroChar = zeroChar;
                differenceSignature.oneChar  = oneChar;
                break;
            }

            charIter++;
        }
    }
    
    console.log(`Difference Signature is:`, differenceSignature)

    let asciiArray = secret.map((word) => {
        let revealed = "0b";
        while (word.length > 0){
            if (indenticalCharacters){
                revealed = revealed + binaryZero;
                word = word.slice(binaryZero.length);
                continue;
            }

            if (differenceSignature.zeroChar === word[differenceSignature.index]) {
                revealed = revealed + "0";
                word = word.slice(binaryZero.length);
                
            }
            else {
                revealed = revealed + "1";
                word = word.slice(binaryOne.length);
            }
        }

        return Number(revealed);
    });

    return asciiArray;
}

let keyCode = ["xx1", "xxx"]

let mainString = "herro robo!";
let binaryArray = stringToBinary(mainString);
let decimals = parseBinary(binaryArray);
let message = toMessage(decimals);
let secret = toSecret(keyCode, message);
let revealed = fromSecret(keyCode, secret)
let remessage = toMessage(revealed);

console.log(`mainstring: ${mainString}`);
console.log(`narray: ${binaryArray}`);
console.log(`ascii: ${decimals}`);
console.log(`message: ${message}`);
console.log(`secret: ${secret} ${typeof secret}`);
console.log(`revealed secret: ${revealed}`)
console.log(`constructed message: ${remessage}`)

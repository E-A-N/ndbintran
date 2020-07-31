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

let fromSecret = (code, secret) => {
    secret = secret.split(" ");
    let asciiArray = secret.map((word) => {
        while (word.length > 0){
            
        }
    });
}

let mainString = "herro robo!";
let binaryArray = stringToBinary(mainString);
let decimals = parseBinary(binaryArray);
let message = toMessage(decimals);
let secret = toSecret("zx", message);

console.log(`mainstring: ${mainString}`)
console.log(`narray: ${binaryArray}`)
console.log(`ascii: ${decimals}`)
console.log(`message: ${message}`);
console.log(`secret: ${secret}`)

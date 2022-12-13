var fs = require("fs");
var text = fs.readFileSync("./d6/d6-inputs.txt", "utf-8");

let received = []
let nope = []
for (let i = 0; i < text.length; i++) {
// for (let i = 0; i < 50; i++) {
    let char = text[i]
    received.push(char)

    // if(received.length < 4) {
    if(received.length < 14) {
        continue
    }

    // if(received.length >= 4) {
    if(received.length >= 14) {
        // if (hasDupe(received)) {
        if (hasDupe14(received)) {
            let remove = received.shift()
            nope.push(remove)
        } else {
            console.log(received)
            break
        }
    }
}

console.log(nope.length + received.length)

// p1
function hasDupe(charas) {
    if (charas[0] == charas[1] ||
        charas[0] == charas[2] ||
        charas[0] == charas[3] ||
        charas[1] == charas[2] ||
        charas[1] == charas[3] ||
        charas[2] == charas[3]) {
            return true
    }
    return false
}

// p2
function hasDupe14(charas) {
    let seenIt = {}
    for (let char of charas) {
        if(seenIt[char]) {
            return true
        } else {
            seenIt[char] = 1
        }
    }
    return false
}
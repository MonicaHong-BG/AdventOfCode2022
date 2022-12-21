var fs = require("fs");
var text = fs.readFileSync("./d12/d12-inputs2.txt", "utf-8");
var lines = text.split("\r\n");

// Hill Climbing Algorithm
/*
height map
'S' (height < a) is starting point - 'E' (height > z) is where we want to go
can only move 1 square up, down, left or right
next square can only be 1 step taller
few steps as possible to 'E'
*/

//how to organize?
// [X] no need to parse instructions
// [X] FIND S position
// [x] establish dominance
// [] 

const abc = "SabcdefghijklmnopqrstuvwxyzE"
const hierarchy = {}
for (let i = 0; i < abc.length; i++) {
    hierarchy[abc[i]] = i
}
console.log(hierarchy)

let S = findS()
console.log(S)



function findS() {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("S")) {
            // console.log(`line [${i}][${lines[i].indexOf("S")}]`)
            return [i, lines[i].indexOf("S")]
        }
    }
}

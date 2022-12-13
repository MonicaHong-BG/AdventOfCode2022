var fs = require("fs");
var text = fs.readFileSync("./d10/d10-inputs.txt", "utf-8");
var series = text.split("\r\n")

console.log(series)

// single register X starting at 1
// addx V 2 cycles --> aftere 2nd cycle, X register is += V
// noop 1 cycle

// consider signal strength ==> cycle # * V during 20th cycle and every 40 cycles after that
// find sum of these signal strength

let cycle = 1
let X = 1
let sum = 0
for (let i = 0; i < series.length; i++) {
// for (let i = 0; i < 40; i++) {
    cycle++
    if (isInteresting(cycle)) {
        sum += cycle * X
        console.log("sum is now: " + sum)
    }
    if (series[i] == "noop") {
        continue
    }
    let value = parseInt(series[i].match(/addx (\-*\d*)/)[1])
    console.log(value)
    if (value) {
        cycle++
        X += value
        console.log("X is now: " + X)
        if (isInteresting(cycle)) {
            sum += cycle * X
            console.log("sum is now: " + sum)
        }
    }
    console.log(X)
}

console.log("sum is " + sum)

function isInteresting(cycle) {
    if (cycle == 20 ||
        cycle == 60 ||
        cycle == 100 ||
        cycle == 140 ||
        cycle == 180 ||
        cycle == 220) {
        
        console.log("very interesting..." + cycle)
        return true
    }
    return false
}
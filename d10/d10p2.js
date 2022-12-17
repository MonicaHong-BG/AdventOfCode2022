var fs = require("fs");
var text = fs.readFileSync("./d10/d10-inputs.txt", "utf-8");
var inputs = text.split("\r\n")

// single register X starting at 1
// addx V 2 cycles --> aftere 2nd cycle, X register is += V
// noop 1 cycle

// p2
// sprite == 3 pixels wide
// X ==> middle pixel of sprite
// CRT draws 1 pixel/cycle
// Is sprite visible when CRT draws?
//  --> visible ==> pos == X + or - 1

let cycle = 1
let X = 1
let pos = 0
let screen = []
let draw = ""
for (let input of inputs) {
// for (let i = 0; i < 40; i++) {
    run()
    
    if (input != "noop") {
        run()

        let value = parseInt(input.match(/addx (\-*\d*)/)[1])
        if (value) {
            X += value
            // console.log(`adding to X: ${value} - X is now: ${X}\n`)
        }
    }
}
console.log(screen)

function drawPixel() {
    // console.log("this cycle: " + cycle)
    // console.log("this pos: " + pos)
    // console.log("compare with X: " + X)

    if (Math.abs(pos - X) <= 1) {
        draw += "#"
    } else {
        draw += " "
    }
    // console.log(draw)
}

function run() {
    drawPixel()

    if (cycle % 40 == 0) {
        screen.push(draw)
        pos = 0
        draw = ""
        // console.log("very interesting..." + cycle)
    } else {
        pos++
    }
    cycle++
}
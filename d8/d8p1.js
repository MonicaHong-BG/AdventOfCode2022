var fs = require("fs");
var text = fs.readFileSync("./d8/d8-inputs.txt", "utf-8");
var outputs = text.split("\r\n")

let visibleCount = 0
let forest = []
for (let output of outputs) {
    let [ ...trees ] = output
    forest.push(trees)
}
// console.log(forest)

// edges are all visible
visibleCount += forest.length * 2
console.log(visibleCount)
visibleCount += (forest[0].length - 2) * 2
console.log(visibleCount)

let verticalLen = forest.length - 1
let horizontalLen = forest[0].length - 1
// let verticalLen = horizontalLen = 10

// visible check 2nd row to 2nd to last row
for (let row = 1; row < verticalLen; row++) {
    // 2nd col to 2nd to last col
    for (let col = 1; col < horizontalLen; col++) {

        if (canSeeFromTop(row, col)) {
            visibleCount++
            console.log(`\n***ding ${visibleCount} from top\n`)
        }
        
        else if (canSeeFromLeft(row, col)) {
            visibleCount++
            console.log(`\n***ding ${visibleCount} from left\n`)
        }
        
        else if (canSeeFromBottom(row, col)) {
            visibleCount++
            console.log(`\n***ding ${visibleCount} from bottom\n`)
        }
        
        else if (canSeeFromRight(row, col)) {
            visibleCount++
            console.log(`\n***ding ${visibleCount} from right\n`)
        }
    }
}
console.log(visibleCount)

function canSeeFromTop(row, col) {
    let canSee = false
    let thisRow = row
    while (row > 0) {
        if (forest[thisRow][col] > forest[row-1][col]) {
            console.log(`top [${thisRow}][${col}] ${forest[thisRow][col]} > [${row-1}][${col}] ${forest[row-1][col]}`)
            canSee = true
            row--
        } else {
            console.log("top nope")
            return false
        }
    }
    return canSee
}

function canSeeFromLeft(row, col) {
    let canSee = false
    let thisCol = col
    while (col > 0) {
        if (forest[row][thisCol] > forest[row][col-1]) {
            console.log(`left [${row}][${thisCol}] ${forest[row][thisCol]} > [${row}][${col-1}] ${forest[row][col-1]}`)
            canSee = true
            col--
        } else {
            console.log("left nope")
            return false
        }
    }
    return canSee
}

function canSeeFromBottom(row, col) {
    let canSee = false
    let thisRow = row
    while (row < verticalLen) {
        if (forest[thisRow][col] > forest[row+1][col]) {
            console.log(`bottom [${thisRow}][${col}] ${forest[thisRow][col]} > [${row+1}][${col}] ${forest[row+1][col]}`)
            canSee = true
            row++
        } else {
            console.log("bottom nope")
            return false
        }
    }
    return canSee
}

function canSeeFromRight(row, col) {
    let canSee = false
    let thisCol = col
    while (col < horizontalLen) {
        if (forest[row][thisCol] > forest[row][col+1]) {
            console.log(`right [${row}][${thisCol}] ${forest[row][thisCol]} > [${row}][${col+1}] ${forest[row][col+1]}`)
            canSee = true
            col++
        } else {
            console.log("right nope")
            return false
        }
    }
    return canSee
}
/*
[
    [0, 1, 2, 3, 4, 5], // 0
    [0, 1, 2, 3, 4, 5], // 1
    [0, 1, 2, 3, 4, 5], // 2
    [0, 1, 2, 3, 4, 5]  // 3
]
*/
var fs = require("fs");
// var text = fs.readFileSync("./d8/d8-inputs.txt", "utf-8");
var text = fs.readFileSync("./d8/d8-inputs.txt", "utf-8");
var outputs = text.split("\r\n")

let highestScore = 0
let forest = []
for (let output of outputs) {
    let [ ...trees ] = output
    forest.push(trees)
}
// console.log(forest)

let verticalLen = forest.length
let horizontalLen = forest[0].length
// let verticalLen = horizontalLen = 10

// 2nd row to 2nd to last row
for (let row = 0; row < verticalLen; row++) {
    // 2nd col to 2nd to last col
    for (let col = 0; col < horizontalLen; col++) {

        let top = countTreesTop(row, col)    
        let left = countTreesLeft(row, col)    
        let right = countTreesRight(row, col)
        let bottom = countTreesBottom(row, col)   
        console.log(`top ${top} - left ${left} - right ${right} - bottom ${bottom}`)
        let score = top * left * right * bottom
        console.log(score)
        
        if (score > highestScore) {
            highestScore = score
        }
    }
}
console.log(highestScore)

function countTreesTop(row, col) {
    let treeCount = 0
    let thisRow = row
    if (row == 0) {
        return treeCount
    }
    while (row > 0) {
        if (forest[thisRow][col] > forest[row-1][col]) {
            console.log(`top [${thisRow}][${col}] ${forest[thisRow][col]} > [${row-1}][${col}] ${forest[row-1][col]}`)
            treeCount++
            row--
        } else {
            treeCount++
            console.log("top stop")
            return treeCount
        }
    }
    return treeCount
}

function countTreesLeft(row, col) {
    let treeCount = 0
    let thisCol = col
    if (col == 0) {
        return treeCount
    }
    while (col > 0) {
        if (forest[row][thisCol] > forest[row][col-1]) {
            console.log(`left [${row}][${thisCol}] ${forest[row][thisCol]} > [${row}][${col-1}] ${forest[row][col-1]}`)
            treeCount++
            col--
        } else {
            treeCount++
            console.log("left stop")
            return treeCount
        }
    }
    return treeCount
}

function countTreesBottom(row, col) {
    let treeCount = 0
    let thisRow = row
    if (row == verticalLen - 1) {
        return treeCount
    }
    while (row < verticalLen - 1) {
        if (forest[thisRow][col] > forest[row+1][col]) {
            console.log(`bottom [${thisRow}][${col}] ${forest[thisRow][col]} > [${row+1}][${col}] ${forest[row+1][col]}`)
            treeCount++
            row++
        } else {
            treeCount++
            console.log("bottom stop")
            return treeCount
        }
    }
    return treeCount
}

function countTreesRight(row, col) {
    let treeCount = 0
    let thisCol = col
    if (col == horizontalLen - 1) {
        return treeCount
    }
    while (col < horizontalLen - 1) {
        if (forest[row][thisCol] > forest[row][col+1]) {
            console.log(`right [${row}][${thisCol}] ${forest[row][thisCol]} > [${row}][${col+1}] ${forest[row][col+1]}`)
            treeCount++
            col++
        } else {
            treeCount++
            console.log("right stop")
            return treeCount
        }
    }
    return treeCount
}
/*
[
    [0, 1, 2, 3, 4, 5], // 0
    [0, 1, 2, 3, 4, 5], // 1
    [0, 1, 2, 3, 4, 5], // 2
    [0, 1, 2, 3, 4, 5]  // 3
]
*/
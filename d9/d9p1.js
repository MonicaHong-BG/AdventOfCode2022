var fs = require("fs");
var text = fs.readFileSync("./d9/d9-inputs.txt", "utf-8");
var series = text.split("\r\n")

// how big is this thing??
// guess we figure that out as we go??
let grid = [[]]
let visits = []
let h = [0, 0]
let t = [0, 0]

// probably get the instructions first...
// for (let i = 0; i < series.length; i++) {
for (let i = 0; i < 50; i++) {
    console.log(`\n********** ${i} *****\n`)
    let direction = series[i].match(/(\w) (\d)/)[1]
    let motions = (series[i].match(/(\w) (\d)/)[2]) / 1
    if (!grid[i]) {
        grid[i] = []
    }
    let diffUp = Math.abs(0 - h[0]) / 1
    let diffDown = Math.abs(grid.length - 1 - h[0]) / 1
    let diffLeft = Math.abs(0 - h[1]) / 1
    let diffRight = Math.abs(grid[i].length - 1 - h[1]) / 1
    
    console.log(`start h is ${h}`)
    console.log(`start t is ${t}`)
    
    if (direction == 'U') {
        console.log(`Going U ${motions}`)
        // shift rows down
        if (motions > diffUp) {
            console.log("bigger upper")
            let mdiff = (motions - diffUp) / 1
            grid.length += mdiff
            h[0] += mdiff
            t[0] += mdiff
            console.log(visits)
            // move visits down next row
            for (let i = 0; i < visits.length; i++) {
                visits[i][0] += mdiff
                console.log(visits[i][0])
            }
            console.log(`visits changed ` + visits)
        }
        // move h up and t follows in pattern
        for (let i = 0; i < motions; i++) {
            h[0]--
            if (h == t || Math.abs(h[0] - t[0]) < 2) {
                //stay
                console.log("stay")
            }
            else if (Math.abs(h[0] - t[0]) >= 2) {
                t[0]--
                if (h[1] - t[1] == 1) {
                    t[1]++
                }
            }
            console.log(`looping h[${h}]`)
            console.log(`looping t[${t}]`)
            addIfNewVisit(visits, t)
        }
    }
    
    else if (direction == 'D') {
        console.log(`Going D ${motions}`)
        // add rows
        if (motions > diffDown) {
            let mdiff = motions - diffDown
            grid.length += mdiff
            // h, t, and visits stay same
        }
        for (let i = 0; i < motions; i++) {
            h[0]++
            if (h == t || Math.abs(h[0] - t[0]) < 2) {
                //stay
                console.log('stay')
            }
            else if (Math.abs(h[0] - t[0]) >= 2) {
                t[0]++
                if (h[1] - t[1] == 1) {
                    t[1]++
                }
            }
            console.log(`looping h[${h}]`)
            console.log(`looping t[${t}]`)
            addIfNewVisit(visits, t)
        }
    }
    
    else if (direction == 'L') {
        console.log(`Going L ${motions}`)
        // shift cols right?
        if (motions > diffLeft) {
            let mdiff = motions - diffLeft
            h[1] += mdiff
            t[1] += mdiff
            for (let i = 0; i < grid.length; i++) {
                grid[i].length += mdiff
            }
            // assign visits changed col
            for (let i = 0; i < visits.length; i++) {
                visits[i][1] += mdiff
            }
        }
        for (let i = 0; i < motions; i++) {
            h[1]--
            if (h == t || Math.abs(h[1] - t[1]) < 2) {
                //stay
                console.log('stay')
            }
            else if (Math.abs(h[1] - t[1]) >= 2) {
                t[1]--
                if (Math.abs(h[0] - t[0]) >= 2) {
                    t[0]++
                }
            }
            console.log(`looping h[${h}]`)
            console.log(`looping t[${t}]`)
            addIfNewVisit(visits, t)
        }
    }
    
    else if (direction == 'R') {
        console.log(`Going R ${motions}`)
        // add cols?
        if (motions > diffRight) {
            for (let i = 0; i < grid.length; i++) {
                grid[i].length += (motions - diffRight) / 1
            }
        }
        for (let i = 0; i < motions; i++) {
            h[1]++
            if (h == t || Math.abs(h[1] - t[1]) < 2) {
                //stay
                console.log('stay')
            }
            else if (h[1] - t[1] >= 2) {
                t[1]++
                if (h[0] - t[0] == 1) {
                    t[0]++
                }
            }
            console.log(`looping h[${h}]`)
            console.log(`looping t[${t}]`)
            addIfNewVisit(visits, t)
        }
    }
}

console.log(`\n# of visits: ${visits.length}`)

function addIfNewVisit(visits, t) {
    if (visits.length == 0) {
        visits.push(t)
    }
    let add = false
    for (let visit of visits) {
        if (visit != t) {
            console.log(`adding...`)
            add = true
        } 
        else if (visit == t) {
            console.log(`included?... ${visits} and ${t}`)
            continue
        }
    }
    if (add) {
        visits.push(t)
    }
    console.log("***** " + visits)
}
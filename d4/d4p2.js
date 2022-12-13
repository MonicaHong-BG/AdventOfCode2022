var fs = require("fs");
var text = fs.readFileSync("./AdventOfCode2022/d4/d4-inputs.txt", "utf-8");
var pairsList = text.split("\r\n")

let countFulLContain = 0

// for(let i = 0; i < 10; i++)
for(let i = 0; i < pairsList.length; i++)
{
    let range1 = pairsList[i].split(",")[0]
    let range2 = pairsList[i].split(",")[1]
    
    let low1 = parseInt(range1.split("-")[0])
    let high1 = parseInt(range1.split("-")[1])
    
    let low2 = parseInt(range2.split("-")[0])
    let high2 = parseInt(range2.split("-")[1])
    
    console.log(`i is: ${i}`)
    console.log(`ranges are 1: ${low1} - ${high1}`)
    console.log(`ranges are 2: ${low2} - ${high2}`)
    
    if ((high1 > low2 &&
        high1 > high2 &&
        low1 > low2 &&
        low1 > high2) ||
        (high2 > low1 &&
        high2 > high1 &&
        low2 > low1 &&
        low2 > high1))
    {
        console.log(`continue`)
        continue
    }
    if ((low1 <= low2) &&
        (high1 >= low2))
        // (low1 >= high2))
        // (high1 >= high2))
    {
        countFulLContain++
        console.log(countFulLContain)
    }
    else if ((low1 >= low2) &&
            // (high1 >= low2) &&
            (low1 <= high2))
            // (high1 <= high2))
    {
        countFulLContain++
        console.log(countFulLContain)
    }
}

console.log(`full count is: ${countFulLContain}`)
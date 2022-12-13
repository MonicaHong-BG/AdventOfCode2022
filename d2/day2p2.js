var fs = require("fs");
var text = fs.readFileSync("./day2-inputs.txt", "utf-8");
var scores = text.split("\r\n")

console.log(scores)

/*
A = Rock
B = Paper
C = Scissors

X = 1 = Rock
Y = 2 = Paper
Z = 3 = Scissors

0 = Lose = X
3 = Draw = Y
6 = Win = Z
*/
let result = 0
for(let i = 0; i < scores.length; i++)
// for(let i = 0; i < 20; i++)
{
    let opponent = scores[i][0]
    let goal = scores[i][2]
    result+= roundStrategy(goal)
    result+= shapeToUse(opponent, goal)
}

console.log("The total is: " + result)

function roundStrategy(goal) {
    if (goal == "X")
    {
        return 0
    }
    else if (goal == "Y")
    {
        return 3
    }
    else if (goal == "Z")
    {
        return 6
    }
}

function shapeToUse(opponent, goal) {
    if((opponent == "A" && goal == "Y") ||
        (opponent == "B" && goal == "X") ||
        (opponent == "C" && goal == "Z"))
    {
        return 1
    }
    if((opponent == "A" && goal == "Z") ||
        (opponent == "B" && goal == "Y") ||
        (opponent == "C" && goal == "X"))
    {
        return 2
    }
    if((opponent == "A" && goal == "X") ||
        (opponent == "B" && goal == "Z") ||
        (opponent == "C" && goal == "Y"))
    {
        return 3
    }
}
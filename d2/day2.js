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
    let me = scores[i][2]
    result+= getMyShapePoints(me)
    result+= scoreTheRound(opponent, me)
}

console.log("The total is: " + result)

function getMyShapePoints(shape) {
    if (shape == "X")
    {
        return 1
    }
    else if (shape == "Y")
    {
        return 2
    }
    else if (shape == "Z")
    {
        return 3
    }
}

function scoreTheRound(opponent, me) {
    if((opponent == "A" && me == "X") ||
        (opponent == "B" && me == "Y") ||
        (opponent == "C" && me == "Z"))
    {
        return 3
    }
    if((opponent == "A" && me == "Y") ||
        (opponent == "B" && me == "Z") ||
        (opponent == "C" && me == "X"))
    {
        return 6
    }
    if((opponent == "A" && me == "Z") ||
        (opponent == "B" && me == "X") ||
        (opponent == "C" && me == "Y"))
    {
        return 0
    }
}

var fs = require("fs");
var text = fs.readFileSync("./day1-inputs.txt", "utf-8");
var textByLine = text.split("\n")

let sum = 0
let mostCal1 = 0
let mostCal2 = 0
let mostCal3 = 0

for (let i = 0; i < textByLine.length; i++)
// for (let i = 0; i < 50; i++)
{
    let text = textByLine[i].replace("\r", "")
    let num = parseInt(text)

    if(num == null || num == 0 || text == null || text == "" || (i == textByLine.length - 1))
    {
        console.log("that's it.. total is " + sum)
        if (sum > mostCal1)
        {
            mostCal3 = mostCal2
            console.log("most3 is now " + mostCal3)
            mostCal2 = mostCal1
            console.log("most2 is now " + mostCal2)
            mostCal1 = sum
            console.log("most1 is now " + mostCal1)
            console.log("Grand total is " + (mostCal1 + mostCal2 + mostCal3))
        }
        else if (sum > mostCal2 && sum <= mostCal1)
        {
            mostCal3 = mostCal2
            console.log("most3 is now " + mostCal3)
            mostCal2 = sum
            console.log("most2 is now " + mostCal2)
            console.log("Grand total is " + (mostCal1 + mostCal2 + mostCal3))
        }
        else if (sum > mostCal3 && sum <= mostCal2)
        {
            mostCal3 = sum
            console.log("most3 is now " + mostCal3)
            console.log("Grand total is " + (mostCal1 + mostCal2 + mostCal3))
        }
        else {
            console.log("most1 is still " + mostCal1)
            console.log("most2 is still " + mostCal2)
            console.log("most3 is still " + mostCal3)
            console.log("Grand total is " + (mostCal1 + mostCal2 + mostCal3))
        }
        if (i != textByLine.length - 1)
        {
            sum = 0
            console.log("********** >>>")
        }
    }
    else
    {
        sum += num
    }
}
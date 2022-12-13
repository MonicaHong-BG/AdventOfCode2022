var fs = require("fs");
var text = fs.readFileSync("./day3/day3-inputs.txt", "utf-8");
var rucksacks = text.split("\r\n")

const priorityTypes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
let priorities = {}

for(let i = 0; i < priorityTypes.length; i++)
{
    priorities[priorityTypes[i]] = i + 1
}

let prioritiesSum = 0
for(let i = 0; i < rucksacks.length; i+=3)
// for(let i = 0; i < 20; i+=3)
{
    let commonItem = findCommonItem(rucksacks[i], rucksacks[i+1], rucksacks[i+2])
    console.log("commonItem is: " + commonItem)
    prioritiesSum += priorities[commonItem]
    console.log(prioritiesSum)
}

console.log("sum of priorities = " + prioritiesSum)

function findCommonItem(one, two, three) {
    let oneTwo = one + two
    let oneTwoThree = one + two + three
    // loop forward to 2
    for(let i = 0; i < one.length; i++)
    {
        // nest loop forward to 3
        for(let j = one.length - 1; j < oneTwo.length; j++)
        {
            // really?
            for(let k =  oneTwoThree.length - 1; k >= oneTwo.length; k--)
            {
                if((oneTwoThree[i] == oneTwoThree[j]) &&
                    (oneTwoThree[j] == oneTwoThree[k]))
                {
                    return oneTwoThree[j]
                }
            }
        }
    }
}
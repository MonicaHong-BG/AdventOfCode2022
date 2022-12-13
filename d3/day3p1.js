var fs = require("fs");
var text = fs.readFileSync("./day3-inputs.txt", "utf-8");
var rucksacks = text.split("\r\n")

const priorityTypes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
let priorities = {}

for(let i = 0; i < priorityTypes.length; i++)
{
    priorities[priorityTypes[i]] = i + 1
}

let prioritiesSum = 0
for(let i = 0; i < rucksacks.length; i++)
// for(let i = 0; i < 20; i++)
{
    let commonItem = findCommonItem(rucksacks[i])
    prioritiesSum += priorities[commonItem]
}

console.log("sum of priorities = " + prioritiesSum)

function findCommonItem(rucksack) {
    let lastIdx = rucksack.length - 1
    let mid = rucksack.length / 2
    // loop forward to half
    for(let i = 0; i < mid; i++)
    {
        // nested loop backward to half
        for(let j = lastIdx; j >= mid; j--)
        {
            if(rucksack[i] == rucksack[j])
            {
                return rucksack[i]
            }
        }
    }
}
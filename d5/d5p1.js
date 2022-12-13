var fs = require("fs");
var text = fs.readFileSync("./AdventOfCode2022/d5/d5-inputs.txt", "utf-8");
var commands = text.split("\r\n")

let crates = {
    1 : ["G", "W", "L", "J", "B", "R", "T", "D"],
    2 : ["C", "W", "S"],
    3 : ["M", "T", "Z", "R"],
    4 : ["V", "P", "S", "H", "C", "T", "D"],
    5 : ["Z", "D", "L", "T", "P", "G"],
    6 : ["D", "C", "Q", "J", "Z", "R", "B", "F"],
    7 : ["R", "T", "F", "M", "J", "D", "B", "S"],
    8 : ["M", "V", "T", "B", "R", "H", "L"],
    9 : ["V", "S", "D", "P", "Q"]
}

let i = 0
while(!commands[i].includes("move"))
{
    i++
}

for (i; i < commands.length; i++)
// for (i; i < 15; i++)
{
    let cratesToMove = parseInt(commands[i].match(/(?<=move\s)(\d)*/))
    let moveFrom = parseInt(commands[i].match(/(?<=from\s)(\d)*/))
    let moveTo = parseInt(commands[i].match(/(?<=to\s)(\d)*/))
    
    console.log(`command: ${commands[i]}`)
    console.log(`before move: crates ${moveFrom} - ${crates[moveFrom]} : crate ${moveTo} - ${crates[moveTo]}`)

    // part 2
    let combine = []
    if (cratesToMove > 1)
    {
        for (let j = 0; j < cratesToMove; j++)
        {
            let shiftCrate = crates[moveFrom].shift()
            combine.push(shiftCrate)
        }

        crates[moveTo] = combine.concat(crates[moveTo])
    }
    else
    {
        let shiftCrate = crates[moveFrom].shift()
        crates[moveTo].unshift(shiftCrate)
    }
    console.log(`after move: crates ${moveFrom} - ${crates[moveFrom]} : crate ${moveTo} - ${crates[moveTo]}\n`)
}

let concat = ""
for (let crate in crates)
{
    concat+= crates[crate][0]
}
console.log(concat)
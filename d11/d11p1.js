var fs = require("fs");
var text = fs.readFileSync("./d11/d11-inputs2.txt", "utf-8");
var series = text.toLowerCase().split("\r\n")

// 2 most active monkeys after 20 rounds
// multiply their total # inspections together

class Monkey {
    constructor() {
        this.id = null
        this.startItems = []
        this.operation = null
        this.test = null
        this.inspect = 0
    }
}

let monkeys = []
let id = 0
let monkey = new Monkey()

for (let line of series) {
    if (line.startsWith("monkey")) {
        monkey.id = id
        console.log("monkey " + monkey.id)
    }
    else if (line.trim().startsWith("starting items")) {
        monkey.startItems = line.split("starting items: ")[1].split(",")
        console.log(monkey.startItems)
    }
    else if (line.trim().startsWith("operation")) {
        monkey.operation = line.split("operation: ")[1].replace("new = ", "return ")
        console.log(monkey.operation)
    }

}
var fs = require("fs");
var text = fs.readFileSync("./d11/d11-inputs2.txt", "utf-8");
var series = text.toLowerCase().split("\r\n");

// 2 most active monkeys after 20 rounds
// multiply their total # inspections together

class Monkey {
  constructor() {
    this.id = null;
    this.startItems = [];
    this.operation = null;
    this.test = null;
    this.true = null;
    this.false = null;
    this.inspect = 0;
    this.done = false;
  }
}

let monkeys = [];
let monkey;
let id = 0;

for (let line of series) {
  if (line.startsWith("monkey")) {
    monkey = new Monkey();
    monkey.id = line.match(/monkey (\d):$/)[1];
    console.log("monkey " + monkey.id);
    monkeys.push(monkey);
  } else {
    monkey = monkeys[id];
    if (line.trim().startsWith("starting items")) {
      // splits as str, need to change to int during op
      let temp = line.split("starting items: ")[1].split(",");
      for (let num of temp) {
        monkey.startItems.push(parseInt(num.trim()));
      }
      console.log(monkey.startItems);
    }
    if (line.trim().startsWith("operation")) {
      // run needs to eval with var 'old'
      monkey.operation = line
        .split("operation: ")[1]
        .replace("new = ", "return ");
      console.log(monkey.operation);
    }
    if (line.trim().startsWith("test")) {
      monkey.test = line.split("test: ")[1].replace("divisible by", "/");
      console.log(monkey.test);
    }
    if (line.trim().startsWith("if true")) {
      monkey.true = line.match(/(\d)$/)[1];
      console.log(monkey.true);
    }
    if (line.trim().startsWith("if false")) {
      monkey.false = line.match(/(\d)$/)[1];
      console.log(monkey.false);
      monkey.done = true;
    }
    if (monkey.done) {
      monkeys[id] = monkey;
      console.log(monkeys);
      id++;
    }
  }
}

//eval operation "old" + _

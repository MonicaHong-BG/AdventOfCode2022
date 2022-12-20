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

let monkeys = buildInstructions()
simulateRound(monkeys);

function buildInstructions() {
  let monkeys = [];

  for (let i = 0; i < series.length; i += 7) {
    if (series[i].startsWith("monkey")) {
      let monkey = new Monkey();
      monkey.id = parseInt(series[i].match(/monkey (\d):$/)[1]);
      if (series[i + 1].trim().startsWith("starting items")) {
        // splits as str, need to change to int during op
        let temp = series[i + 1].split("starting items: ")[1].split(",");
        for (let num of temp) {
          monkey.startItems.push(parseInt(num.trim()));
        }
      }
      if (series[i + 2].trim().startsWith("operation")) {
        // run needs to eval with var 'old'
        monkey.operation = series[i + 2]
          .split("operation: ")[1]
          .replace("new = ", " ");
      }
      if (series[i + 3].trim().startsWith("test")) {
        monkey.test = series[i + 3]
          .split("test: ")[1]
          .replace("divisible by", "/");
      }
      if (series[i + 4].trim().startsWith("if true")) {
        monkey.true = parseInt(series[i + 4].match(/(\d)$/)[1]);
      }
      if (series[i + 5].trim().startsWith("if false")) {
        monkey.false = parseInt(series[i + 5].match(/(\d)$/)[1]);
        monkey.done = true;
      }
      if (monkey.done) {
        monkeys.push(monkey);
      }
    }
  }
  return monkeys
}

function simulateRound(monkeys) {
  for (let monkey of monkeys) {
    // add inspect
    monkey.inspect += monkey.startItems.length
    // calculate new worrylevel
    // for (let old of monkey.startItems) {
    while (monkey.startItems.length > 0) {
      let old = monkey.startItems.shift()
      let newWorry = eval(monkey.operation)
      console.log(newWorry)

      // throw
      
    }
  }
}

//eval operation "old" + _

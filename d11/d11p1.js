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

for (let i = 0; i < 20; i++) {
  let results = simulateRound(monkeys)
  for (let monkey of results) {
    console.log(monkey)
  }
  console.log(`***** end round ${i+1} *****\n`)
}

console.log(topTwo(monkeys))

function buildInstructions() {
  let monkeys = [];

  for (let i = 0; i < series.length; i += 7) {
    if (series[i].startsWith("monkey")) {
      let monkey = new Monkey();
      monkey.id = Number(series[i].match(/monkey (\d):$/)[1]);
      if (series[i + 1].trim().startsWith("starting items")) {
        // splits as str, need to change to int during op
        let temp = series[i + 1].split("starting items: ")[1].split(",");
        for (let num of temp) {
          monkey.startItems.push(Number(num.trim()));
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
          .replace("divisible by", "newWorry %");
      }
      if (series[i + 4].trim().startsWith("if true")) {
        monkey.true = Number(series[i + 4].match(/(\d)$/)[1]);
      }
      if (series[i + 5].trim().startsWith("if false")) {
        monkey.false = Number(series[i + 5].match(/(\d)$/)[1]);
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
    while (monkey.startItems.length > 0) {
      let old = monkey.startItems.shift()
      let newWorry = Number(eval(monkey.operation))
      // throw
      if (eval(monkey.test) == 0) {
        monkeys[monkey.true].startItems.push(newWorry)
      } else {
        monkeys[monkey.false].startItems.push(newWorry)
      }
    }
  }
  return monkeys
}

function topTwo(monkeys) {
  let most = 0
  let next = 0
  for (let monkey of monkeys) {
    console.log(monkey.inspect)
    if ( most < monkey.inspect) {
      next = most
      most = monkey.inspect
    }
    else if (next < monkey.inspect) {
      next = monkey.inspect
    }
  }
  return most * next
}
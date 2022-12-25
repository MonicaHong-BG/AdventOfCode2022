var fs = require("fs");
var text = fs.readFileSync("./d20/d20-inputs2.txt", "utf-8");
const numbers = text.split("\r\n").map(Number);

// Grove Positioning System
/*
In a circular list, move each number equal to its value
Move in the order they originally appear
"Mix" the file 1 time
Find the sum of the numbers in 1000th, 2000th, and 3000th place after 0
*/

// HOW??
// [] loop from numbers
// []
// [] removeAt
// [] insertAt

let working = numbers;
for (let i = 0; i < numbers.length; i++) {
  console.log(findIndex(numbers[i]));
}

function movePositive(num) {}

function moveNegative(num) {}

function findIndex(num) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] == num) {
      return i;
    }
  }
}
var fs = require("fs");
var text = fs.readFileSync("./d20/d20-inputs2.txt", "utf-8");
// const numbers = text.split("\r\n").map(Number);

// Grove Positioning System
/*
In a circular list, move each number equal to its value
Move in the order they originally appear
"Mix" the file 1 time
Find the sum of the numbers in 1000th, 2000th, and 3000th place after 0
*/

// HOW??
// [] loop from numbers
// [] splice
// [] removeAt
// [] insertAt

// let working = numbers;
let numbers = [13, -10, 4, 3, -6, 10, 7, -4, -3]; // 9 length
for (let i = 0; i < numbers.length; i++) {
  // for (let i = 0; i < 5; i++) {
  if (numbers[i] < 0) {
    moveNegative(i);
  } else if (numbers[i] > 0) {
    movePositive(i);
  }
}

function movePositive(i) {
  let pos = i;
  // will it need to wrap around?
  if (i + numbers[i] > numbers.length - 1) {
    console.log("boop")
    pos = (i + numbers[i]) % numbers.length;
  } else {
    pos += numbers[i];
  }
  console.log(pos);
}

function moveNegative(i) {
  let pos = i;
  if (i - Math.abs(numbers[i]) < 0) {
    console.log("beep");
    pos = (i + numbers[i] + numbers.length) % numbers.length;
  } else {
    pos += numbers[i];
  }
  console.log(pos);
}

function findElement(num, i) {
  if (numbers[i] == working[i]) {
    // stuff
  }
}

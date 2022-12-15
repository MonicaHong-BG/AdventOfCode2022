var fs = require("fs");
var text = fs.readFileSync("./d11/d11-inputs2.txt", "utf-8");
var series = text.split("\r\n")
console.log(series)
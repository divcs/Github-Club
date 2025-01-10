const os = require('os')

var totalMemory = os.totalmem()
var freeMemory = os.freemem()
var upTime = os.uptime()

console.log(totalMemory)
console.log(freeMemory)
console.log(upTime)
// console.log(`Up Time is ${upTime}`);

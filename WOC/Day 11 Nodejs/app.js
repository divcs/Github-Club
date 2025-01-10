var url = 'http://mylearning/log' //Created a var url
var name = 'Rohit' //Created a var name

console.log(name);

//Creating Function.
function log(msg) {
  console.log(msg)
  console.log('You sorry is denied')
}
//Calling the Function.
log('sorry')

//Exports
module.exports.log = log
module.exports.url = url
module.exports.name = name

//printing name
console.log('My name is sumit')

// console.log(module);

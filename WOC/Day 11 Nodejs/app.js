var url = 'Divya'
function log(msg) {
  console.log(msg)
}
log('sorry')
module.exports.log = log
module.exports.url = url
console.log(module)

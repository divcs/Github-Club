const fs = require('fs')

// var files  = fs.readdir('hii',function(error,files){
//     if(files){
//         console.log('Result',files);
//     }else{
//         console.log('err', error);
//     };

// });

var files = fs.readdirSync('./')
console.log(files)

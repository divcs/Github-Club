npm init -y

npm i postcss postcss-cli autoprefixer

postcss.config.js make this file

write this:

module.exports={
plugins:{
autoprefixer:{},}}

change in package.json, add this line of css

npm run css

for watching: use -w in package.json css line

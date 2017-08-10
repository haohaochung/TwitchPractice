// // 使用require把 http這個 module引入進來

// var http = require('http');

// var server = http.createServer(function(req, res) {

//     res.end("hello");
// });

// // listen 2222 port
// server.listen(2222);

var obj = require('./module.js');
// 利用npm install moment 將此套件下載到本機
var moment = require('moment');

console.log(obj.add(10, 20), obj.square(3));
console.log(moment().format());

// npm init -> 建立package.json
// 下 npm install module_name --save，可以將 此 module dependency 寫入 package.json
// 別人只要下 npm install 就可以將package.json 的 dependencies 下載下來，以建立一樣的環境

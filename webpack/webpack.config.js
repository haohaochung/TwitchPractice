// webpack config 檔
// entry : 程式中最主要的javascript
// output :為打包完的檔名及在哪個資料夾下

// 在 package.json 檔 的 scripts 增加 build webpack 指令
// 終端機 下 npm run script_name 就可以執行，不用打 ./node_modules/.bin/webpack，npm會自己去找此路徑

const path = require('path');

module.exports = {
  entry: './script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
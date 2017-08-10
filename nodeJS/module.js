var add = function(a, b) {
    return a+b;
};

var square = function(a) {
    return a * a;
};

// 把 function export 成 module
module.exports = {
    add : add,
    square : square
};
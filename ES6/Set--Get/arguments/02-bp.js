function sum () {
    var arr = [];
    for (var i = 0; i <= 3; i++){
       arr.push(function () {
           return i * i;
       })
    }
    return arr;
}
var result = sum();
var f0 = result[0];
var f1 = result[1];
var f2 = result[2];
console.log(f0(),f1(),f2());
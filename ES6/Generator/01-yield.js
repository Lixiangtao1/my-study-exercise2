/* function* testYield () {
    yield 'hello';
    // yield表达式就是暂停的标志
    yield 'world';
    return 'ending';
}
let result = testYield();
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next()); */

function* generator(){
    console.log('开始执行');
}
let gen = generator();
setTimeout(function (){
 gen.next();   
},2000);

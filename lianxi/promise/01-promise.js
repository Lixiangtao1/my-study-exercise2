/* function timeout(ms){
  return new Promise((resolved,rejected)=>{
    setTimeout(resolved,2000,ms);
  })
}
timeout('hello world').then(value =>{
  console.log(value);
}) */

/* let promise = new Promise((reslove,reject) => {
  console.log('Promise');
  reslove();
});
promise.then(function (){
  console.log('resolved.');
});
console.log('hello'); */

/* 打印结果的顺序
Promise
hello
resolved.
*/
/* let promise = new Promise((resolve,reject) => {
  console.log('Promise');
  resolve();
});
promise.then(function (){
  console.log('resolved')
});
console.log('hello');
 */
/* function getImage(url){
  return new Promise((resolve,reject)=>{
    let image = new Image();
    if ( resolve ) {
      image.onload = image;
    } else {
      reject('')
    }
  })
} */

/* const promise = new Promise((resolve,reject) => {
  resolve('ok');
  setTimeout(function () {throw new Error('test')},0);
});
promise.then( function (value) {console.log(value)}); */

/* console.log('1122');
const testPromise = function () {
  return new Promise((resolve,reject) => {
    // resolve(x + 2);
    // let x = 2;
    // reslove (4);
    console.log('Promise');
  });
};
testPromise().then(() => {
  cosnoel.log('everything ----- is great');
});
console.log('这是外部打印的');
setTimeout(() => {
  console.log('this is 123');
},2000); */

/* const promise = new Promise(function (resolve,reject){
  throw new Error('test');
});
promise.catch(function (error) {
  console.log(error);
}); */

/* const promise =new Promise(function (){
  resolve("ok");
  throw new Error('test');
});
promise.catch(function (error){
  console.log(error);
})
*/
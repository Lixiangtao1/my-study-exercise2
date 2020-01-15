/* async function getAsync(name) {
    let s1 = await getName(name);
    let s2 = await getAge(age);
    return s1;
}
getAsync('张三').then((res) => {
    console.log(res);
}) */

/* function time(ms){
    return new Promise((resolve) => {
        setTimeout(resolve,ms);
    })
}

async function asyncGettime(value,ms){
    await time(ms);
    console.log(value);
}
asyncGettime('hello world', 2000); */


/* async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
  
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
  
asyncPrint('hello world', 1000); */

/* async function timeOut(ms){
    await new Promise(resolve => {
        setTimeout(resolve,ms);
    })
}
async function asyncPrint(value,ms){
    await timeOut(ms);
    console.log(value);
}
asyncPrint('hello world!', 1000); */

/* async function ff(){
    return 'hello world!';
}
ff().then(v => {
    console.log(v);
}); */


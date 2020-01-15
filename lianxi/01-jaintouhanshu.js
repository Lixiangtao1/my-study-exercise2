/* 箭头函数 */
function Timer(){
  this.s1 = 0;
  this.s2 = 0;
  setTimeout(()=> this.s1++,1000)
  setTimeout(function (){
    this.s2++;
  },1000)
}
var timer =new Timer();
setTimeout(()=>console.log('s1:', timer.s1),3100);
setTimeout(()=>console.log('s2:', timer.s2),3100);
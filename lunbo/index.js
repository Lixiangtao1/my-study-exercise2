
var wrap = document.getElementsByClassName('wrap')[0];
var container = document.getElementsByClassName('container')[0];
var left = document.getElementsByClassName('jt_left')[0];
var right = document.getElementsByClassName('jt_right')[0];
var dot = document.getElementsByTagName('span');

/* 封装往左右轮播一次的函数 */
var newLeft = -600;
function next() {
    if (newLeft == -1800) {
        newLeft = 0;
        wrap.style.left = newLeft + 'px';
    }
    newLeft -= 600;
    startMove(wrap, {
        "left": newLeft
    });
    index++;
    if(index === 3){
        index = 0;
    }
    setCurrentDot();
}

function prev() {
    if (newLeft == 0) {
        newLeft = -3000;
        wrap.style.left = newLeft + 'px';
    }
    newLeft += 600;
    startMove(wrap, {
        "left": newLeft
    });
    index--;
    if(index === -1){
        index = 4;
    }
    setCurrentDot();
}
/* 自动播放 */
var timer = null;
function autoPlay() {
    timer = setInterval(function () {
        next();
    }, 2000)
} 
/* 绑定事件 */
container.addEventListener('mouseenter', function () {
    // 鼠标进入清除自动播放
    clearInterval(timer);
}, false)

container.addEventListener('mouseleave', function () {
    // 鼠标离开自动播放
    autoPlay();
}, false)

left.addEventListener('click', function () {
    prev();
})

right.addEventListener('click', function () {
    next();
})

//给当前按钮添加“on”类 span(dot)
var index = 0;
var len = dot.length;
function setCurrentDot(){
    for (var m = 0; m < len; m++){
        dot[m].className = ''; 
    }
    dot[index].className = 'on';
}
// 点到哪个按钮时，该按钮有类为'on'的效果
for (var s = 0; s < len; s++){
    (function(s){
        dot[s].addEventListener('click',function(){
            newLeft = -600 * (s + 1);
            startMove(wrap, {"left":newLeft});
            index = s;
            setCurrentDot();
        },false)   
    }(s))
}
setCurrentDot();
autoPlay(); 


function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}
//使图片运动 startMove函数    
function startMove(obj,json,fn){       
    clearInterval(obj.timer);      
    //开启定时器        
    obj.timer = setInterval(function(){  
        var flag = true;                 
        //遍历json    
        for (var attr in json) {                                
            //取当前值 iCur   
            var iCur = 0;                
            if (attr == 'opacity') {                       
                iCur = Math.round(parseFloat(getStyle(obj, attr))*100);                  
            }else{                     
                iCur = parseInt(getStyle(obj, attr));                
            }                  
            //算速度：iSpeed
            //目标值：json[attr]                   
            var iSpeed = (json[attr]-iCur)/8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);                       
            //检测停止                 
            if (iCur != json[attr]) {                      
                flag = false                 
            }                  
            if (attr == 'opacity') {                       
                obj.style.filter = 'alpha(opacity:'+iCur+iSpeed+')';                      
                obj.style.opacity = (iCur+iSpeed)/100;                
            }else{                     
                obj.style[attr] = iCur + iSpeed + 'px';                   
            }   
        }        
        /* if (flag) {                  
            clearInterval(obj.timer);                  
            if (fn) {fn();}               
        }  */       
        if (flag) {
            clearInterval(obj.timer);
            if(fn) {fn()}
        }    
    },30)      
} 
var __extends = this.__extends || function (d,b) {
    // 遍历所有的b对象  
    for (let p in b) {
        // 查找所有的b中的属性,但是不会查b原型链上的方法和属性
        if (b.hasOwnProperty(p)) {
            d.p = b.p; //将b中所有的属性值给到d.p的属性上
        }
    } 
    function FF () {
        this.constructor = d;
        // 此处的this指向 (d.prototype) d的原型对象
    }
    FF.prototype = b.prototype;
    d.prototype = new FF();
}


var extend;
// 匿名函数
(function (extend) {
    // 日期的格式化输出 在Date上添加方法
    Date.prototype.format = function (formatStr) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            // 季度
            "d+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(formatStr)) { //检测字符串是否满足匹配模式 (y+ 匹配到一个或多个y)
            formatStr = formatStr.replace(RegExp.$1,(this.getFullYear() + ""));
        }
        if (new RegExp("("+ k +")").test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
        return formatStr;
    }

    // 替换字符串

})(extend || (extend = {}))

var easyweb;
(function (easyweb)  {
    

})(easyweb || (extend = {}))

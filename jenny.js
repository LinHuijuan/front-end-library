// JavaScript Document

function $(v) {
    if (typeof v === 'function') {
        window.onload = v;
    } else if (typeof v === 'string') {
        return document.getElementById(v);
    } else if (typeof v === 'object') {
        return v;
    }
}

//获取样式
function getStyle(obj, attr) {
    //currentStyle(只兼容IE，只能获取不能设置）
    //getComputedStyle(只兼容火狐谷歌，只能获取不能设置)
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//多值运动
//dir是频率
function doMove(obj, attr, dir, target, endFn) {

    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        var speed = parseInt(getStyle(obj, attr)) + dir; // 步长

        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }

        obj.style[attr] = speed + 'px';

        if (speed == target) {
            clearInterval(obj.timer);

            /*
            if ( endFn ) {
            	endFn();
            }
            */
            endFn && endFn();

        }

    }, 30);
}

//系统时间
function fnTime() {
    var oBody = document.body;
    var myTime = new Date();
    // number
    var iYear = myTime.getFullYear();
    var iMonth = myTime.getMonth() + 1;
    var iDate = myTime.getDate();
    var iWeek = myTime.getDay();
    var iHours = myTime.getHours();
    var iMin = myTime.getMinutes();
    var iSec = myTime.getSeconds();
    var str = '';
    var arr = ['日', '一', '二', '三', '四', '五', '六'];
    iWeek = '星期' + arr[iWeek];
    str = iYear + '年' + iMonth + '月' + iDate + '日 ' + iWeek + ' ' + toTwo(iHours) + ' : ' + toTwo(iMin) + ' : ' + toTwo(iSec);

    oBody.innerHTML = str;

}


//抖动函数
//var pos = parseInt(getStyle(obj, attr));
function shake(obj, attr, pos, endFn) {

    var arr = []; // 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;

    for (var i = 20; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);

    clearInterval(obj.shake);
    obj.shake = setInterval(function() {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if (num === arr.length) {
            clearInterval(obj.shake);
            endFn && endFn();
        }
    }, 50);
}
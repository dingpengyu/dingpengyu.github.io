(function() {
'use strict';
    var token = window.location.href.substring(19).split('=');
$('a.focus, a.next, a.prev').addClass('accesskey-x');
$('h2 a').addClass('accesskey-x');
$('li.menu-item a').addClass('accesskey-z');

if (token[0] == 'p') {
$('article div.entry-content').addClass('accesskey-x').attr({'tabindex':'-1'}).focus();
}
$('input.search-field').attr({'accesskey':'s'});
$('#content').attr({'tabindex':'-1'});
if (window.ActiveXObject || "ActiveXObject" in window){
$('.accesskey-x').attr({'accesskey':'x'});
$('.accesskey-z').attr({'accesskey':'z'});
$('header[role="banner"], nav [role="navigation"]').removeAttr('role');
$('svg').attr({'focusable':'false'}).removeAttr('aria-hidden role');
}

if(navigator.userAgent.indexOf("Chrome")> -1 || navigator.userAgent.indexOf('Firefox')>= 0) {
let allElement = [];
//存储焦点元素的数组下标
let focusElementIndex;

function shortcutKey(k) {
if (!k.altKey) {
return false;
} else {
//获取页面所有元素，转成数组
let all = document.all;
if (all.length !== allElement.length) {
allElement = Array.prototype.slice.call(all);
}
//获取焦点元素的数组下标
focusElementIndex = allElement.indexOf(document.activeElement);

accesskey(k);
}
}
document.addEventListener('keydown', function (k) {
shortcutKey(k);
}, null);

function previousTarget(target, subscriptArray) {
for (var i = 0, l = target.length || subscriptArray.length; i < l; i++) {
if (focusElementIndex > subscriptArray[l - 1] || focusElementIndex <= subscriptArray[0]) {
target[l - 1].focus();
break;
}
else if (focusElementIndex <= subscriptArray[i]) {
var xv = target.indexOf(target[i]);
target[xv - 1].focus();
break;
}
}
return false;
}

function nextTarget(target, subscriptArray) {
for (let i = 0, l = target.length || subscriptArray.length; i < l; i++) {
if (focusElementIndex < subscriptArray[i]) {
var xv = target.indexOf(target[i]);
target[xv].focus();
break;
} else if (focusElementIndex < subscriptArray[0] || focusElementIndex >= subscriptArray[l - 1]) {
target[0].focus();
break;
}
}
return false;
}

function accesskey(k) {
    let Xscript = [];
    var xAcc = handleKey('accesskey-x', Xscript);
    let Zscript = [];
    var zAcc = handleKey('accesskey-z', Zscript);

    if (k.shiftKey && k.altKey && k.keyCode == 88) {
        previousTarget(xAcc, Xscript);
    }

    if (k.shiftKey && k.altKey && k.keyCode == 90) {
        previousTarget(zAcc, Zscript);
    }

    if (k.shiftKey) return false;
    if (k.altKey && k.keyCode == 88) {
        nextTarget(xAcc, Xscript)
    }

    if (k.altKey && k.keyCode == 90) {
        nextTarget(zAcc, Zscript)
    }

}

function handleKey(a,c) {
    var d = allElement.filter(function (t) {
        if (t.classList.contains(a)) {
                c.push(allElement.indexOf(t));
                return t;
        }
    });
return d;
}
//end
}
})();

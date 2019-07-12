```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>demo</title>
    <style>
        #box{
            width: 100px;
            padding: 10px;
            margin: 5px;
            background-color: #ffffaa;
        }
        #borderBox{
            width: 100px;
            padding: 10px;
            margin: 5px;
            background-color: #ffffaa;
            box-sizing: border-box;
        }
        #spanBox{
            display: inline;
            background-color: #e4b9b9;
            width: 80px;
            margin: 25px;
        }
    </style>
</head>
<body>
<div>
    <div id="box" style="width:20px;border: 3px solid">
        box
    </div>
    <div id="borderBox" style="width:50px;border: 3px solid">
        box
    </div>
    <span id="spanBox">
        span
    </span>
</div>
<div id="h5courseCom">js获取元素的当前宽度(也就是内容的宽度)</div>
<script type="text/javascript">
// 设置dom元素的宽高样式 一般有三种方法： 1. 内联样式 2. style标签 3. 通过link标签引入

    let box = document.getElementById('box');
    let borderBox = document.getElementById('borderBox');
    let spanBox = document.getElementById('spanBox');

    console.log('box.style.width：',box.style.width); //20px 只适用于1(内联样式)的获取  值是width,而且有px单位
    console.log('box.currentStyle.width：',box.currentStyle.width); //IE11下：20px.此方法只有ie支持
    console.log('box.offsetWidth:',box.offsetWidth); // 46  值是content+padding+border，不包含margin
    console.log('window.getComputedStyle(box).width:',window.getComputedStyle(box).width); //20px  兼容性更好.可以得到 1 2 3 渲染最终的样式   值只是content,而且有px单位
    console.log('box.getBoundingClientRect().width:',box.getBoundingClientRect().width); //46  可以得到 1 2 3 渲染最终的样式。 值是全部   还可以计算元素的绝对位置(距离视口viewport左顶点的距离)

    console.log('borderBox.style.width：',borderBox.style.width); //50px 只适用于1(内联样式)的获取，如果没有设置就什么也娶不到    值只是content,而且有px单位
    console.log('borderBox.currentStyle.width：',borderBox.currentStyle.width); //IE下：50px
    console.log('borderBox.offsetWidth:',borderBox.offsetWidth); // 50
    console.log('window.getComputedStyle(borderBox).width:',window.getComputedStyle(borderBox).width); //IE11下：24px，chrome下：50px(值是content,因为ie认为的width=50px,即content=50-borderx2-paddingx2，而chrome认为content=width=50px)。
    console.log('borderBox.getBoundingClientRect().width:',borderBox.getBoundingClientRect().width); //50  值是width（即content+padding+border）

    /*console.log('spanBox.offsetWidth:',spanBox.offsetWidth);
console.log(navigator.userAgent);*/


//函数兼容
function getStyle(element, property){
    return !document.defaultView ? element.currentStyle[property] : document.defaultView.getComputedStyle(element)[property];
}
/*
我电脑的测试环境测不到ie，因为我是ie11，好像和火狐内核一样。也就是我的两个浏览器都执行的是getComputedStyle
Document.defaultView在浏览器中，该属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null。IE9以下不支持Document.defaultView

判断是否是IE内核的浏览器
https://blog.csdn.net/hemeinvyiqiluoben/article/details/79334067
    （ie11不能通过navigator.userAgent进行判断）*/

console.log(getStyle(box, 'width'));
console.log(getStyle(borderBox, 'width'));
</script>
</body>
</html>
<!--
dom.offsetWidth 除margin以外剩余的宽高
dom.style.width/height(只适用获取内联元素的宽和高)
dom.currentStyle.width/height(获取渲染后的宽高，但是仅IE支持)
window.getComputedStyle(dom).width/height(与currentStyle原理相似，但是兼容性，通用性会更好一些)
dom.getBoundingClientRect().widht/height(计算元素绝对位置，获取到四个元素left,top,width,height)
-->



```
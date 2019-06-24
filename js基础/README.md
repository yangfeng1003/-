https://www.cnblogs.com/formercoding/p/5881304.html
### 执行环境
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **执行环境定义了变量或函数有权访问的其他数据（包含了外部数据）**，决定了他们各自的行为。   所有 JavaScript 代码都是在一个执行环境中被执行的。执行环境是一个概念，一种机制，用来完成JavaScript运行时在作用域、生存期等方面的处理。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 执行环境有全局执行环境（也称全局环境）和函数执行环境之分。执行环境如其名是在运行和执行代码的时候才存在的，所以我们运行浏览器的时候会创建全局的执行环境，在调用函数时，会创建函数执行环境。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 全局执行环境： 全局环境是最外围的一个执行环境，根据ECMAScript实现所在的宿主环境不同，表示执行环境的对象也不一样，在web中，全局执行环境被认为是window对象。    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 函数执行环境：每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就被推入一个环境栈中，当函数执行完毕后，栈将其环境弹出，把控制权返回给之前的执行环境。

### 变量对象
变量对象： **每个执行环境都有一个变量对象与之关联，执行环境中定义的所有变量及函数（只包含在当前函数内定义的局部变量和函数）都保存在这个对象中**。我们无法通过代码来访问变量对象，但是解析器在处理数据时会在后台使用到它。

### 作用域
作用域： 变量或方法有访问权限的代码空间，即变量或函数起作用的区域。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。全局作用域可以在代码中的任何地方都能被访问，局部作用域一般只在固定的代码片段内可以访问得到。

### 作用域链
作用域链： 作用域链是函数被创建的作用域中对象的集合（由当前环境栈中对应的变量对象组成）。   
作用域的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域前端，始终是当前执行的代码所在的环境对应的变量对象（如果该环境是函数，则将其活动对象作为变量对象），下一变量对象来自包含环境（包含当前还行环境的环境），而再下一变量对象则来自下一包含环境，一直延续到全局执行环境。

作用域与变量对象，执行环境的关系：变量或函数具有作用域的原因，就是在环境中定义的变量仅保存在了该执行环境对应的对象变量中，执行环境在环境栈中弹出之后，作用域链中找不到该对变量对象。

```js
var color = "blue";
function changeColor(){
    var anotherColor = "red";
    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }
    swapColors();
}
changeColor();
alert("Color is now "+color); //red
```
<img src="https://img-blog.csdnimg.cn/20190624084858296.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyMjIwOA==,size_16,color_FFFFFF,t_70" width="30%" height="30%"> 
图中矩形表示特定的执行环境（window的执行环境，changeColor()的执行环境，swapColors()的执行环境，分别对应window、changeColor()、swapColors()的变量对象，windows的变量对象包括color变量和changeColor()函数。），内部执行环境可以通过作用域链访问所有的外部环境，因此在swapColors()内部可以访问到其他两个环境中的所有变量，而changeColor()的作用域链只包含它自己的变量对象和全局变量对象。


补充：执行环境只与函数的声明及定义位置有关
当一个函数定义后其执行环境与作用域链就已经确定了，不会因为执行位置改变而改变，具体例子：
```js
var name = "global";
function getName(){
    console.log(name);
}

function test (){
    var name = "inner";
    getName();
}

// 执行test
test(); // -- global
```
## this指向
 ① this并不指向函数，而是指向调用它的主体对象。
 ③ this指向的对象，我们称之为函数的上下文context，也叫函数的调用者

- 普通函数调用：通过函数名()直接调用：this指向全局对象window（注意let定义的变量不是window属性，只有window.xxx定义的才是。即let a =’aaa’; this.a是undefined）
- 构造函数调用：函数作为构造函数，用new关键字调用时：this指向新new出的对象
- 对象函数调用：通过对象.函数名()调用的：this指向这个对象
- 箭头函数调用：箭头函数里面没有 this ，所以永远是上层作用域this（上下文）
- apply和call调用：call/apply方法第一个参数是函数体内 this 的指向
- 函数作为数组的一个元素，通过数组下标调用的：this指向这个数组
- 函数作为window内置函数的回调函数调用：this指向window（如setInterval setTimeout 等）
严格模式下， this为undefined 

通过函数名()直接调用：this指向window
```js
let x = 2;
function test() {
    console.log(this);
    console.log(x);  //undefined  注意全局环境下定义的变量不是全局属性。如果没有定义window.namef，会输出undefined
}
test();//Object [global]
```

通过对象.函数名()调用的：this指向这个对象
```js
let obj = {
    x : 3,
    objTestest: test,
};
obj.objTestest(); //{ x: 3, objTestest: [Function: test] }
```

函数作为构造函数，用new关键字调用时：this指向新new出的对象
```js
let newobj = new test(); //test {}
```


函数作为数组的一个元素，通过数组下标调用的：this指向这个数组
```js
let arr = [1,2,test,4]; //test表示的是函数对象，即整个这个function，而test（）表示调用函数，有return就对应一个返回值
arr[2]();               //[ 1, 2, [Function: test], 4 ]
```

函数作为window内置函数的回调函数调用：this指向window（如setInterval setTimeout等）
```js
setTimeout(test,0); //Timeout {}
```


普通函数与箭头函数
```js
let obj={
    a:222,
    fn:function(){
        setTimeout(function(){console.log(this.a)});  //undefined  this指向是 window setTimeout，window 下面没有a ，所以这里输出 undefined。
        setTimeout(()=>{console.log(this.a)});      //222  箭头函数里面没有 this,所以要向上层作用域查找，fn 里面的 this 指向 obj
    }
};
obj.fn();
```
参考：https://blog.csdn.net/weixin_37722222/article/details/81625826 这个讲的很好


## call/apply/bind
相同：  
三者都是用来改变函数的this对象的指向的；  
三者第一个参数都是this要指向的对象，也就是想指定的上下文；  
三者都可以利用后续参数传参；  
不同：    
apply和call传入的参数列表形式不同。appl接收arguments，call接收一串参数列表  
bind 主要就是将函数绑定到某个对象，bind()会创建一个函数，返回对应函数便于稍后调用；而apply、call则是立即调用。  

```js
let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj2.fn.call(obj1); //222
//call 和 apply 两个主要用途就是
// 1.改变this的指向   （把 this 从 obj2 指向到 obj1 ）
// 2.方法借用   （obj1 没有 fn ，只是借用 obj2 方法）
```

```js
global.x = 9;  //window.name这种定义要在浏览器里运行.在node里跑要用global.x = 9;
var obj = {
    x: 81,
};
var foo = {
    getX: function() {
        return this.x;
    }
};
var getX = foo.getX;

console.log(getX()); // 9  因为"this"指向全局对象
console.log(foo.getX.bind(obj)());  //81（方法名后多了括号）
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```

## arguments
**arguments与数组**
相同点：  
都可用下标访问每个元素  
都有length属性  
不同点：  
数组对象的类型是Array，类数组对象的类型是Object；  
类数组对象不能直接调用数组API；  
数组遍历可以用for in和for循环，类数组只能用for循环遍历；  


#### arguments 用法

实现重载(overload)：当函数的参数个数不明确时，函数体根据参数的不同进行相应处理arguments.length  
实现递归：在函数内部反复的调用函数本身arguments.callee（在严格模式下不允许arguments.callee）
```js
function factorial(num) {
    if(num<=1) {
        return 1;
    }else {
        return num * arguments.callee(num-1);
    }
}
```
#### arguments 转数组
```js
Array.prototype.slice.call(arguments);
或者  [ ].slice.call(arguments);
或者  Array.from() 是个非常推荐的方法，其可以将所有类数组对象转换成数组。
```

arguments  参考： https://blog.csdn.net/xiaotao_css/article/details/72794650
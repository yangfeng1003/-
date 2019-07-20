 https://segmentfault.com/a/1190000011294519?utm_source=tag-newest

 Object的defineProperty和defineProperties这两个方法在js中的重要性十分重要，主要功能就是**用来定义或修改这些内部属性**,与之相对应的getOwnPropertyDescriptor和getOwnPropertyDescriptors就是获取这行内部属性的描述。



#### 数据(数据描述符)属性
数据属性有4个描述内部属性的特性  
###### Configurable  
表示能否通过delete删除此属性，能否修改属性的特性，或能否修改把属性修改为访问器属性，如果直接使用字面量定义对象，默认值为true
###### Enumerable  
表示该属性是否可枚举，即是否通过for-in循环或Object.keys()返回属性，如果直接使用字面量定义对象，默认值为true
###### Writable  
能否修改属性的值，如果直接使用字面量定义对象，默认值为true
###### Value  
该属性对应的值，默认为undefined（当writable为false,并且configurable为true,value可以通过defineeProperty修改, 但不能直接赋值修改）
#### 访问器(存取描述符)属性  
访问器属性也有4个描述内部属性的特性  
###### Configurable  
和数据属性的[[Configurable]]一样
###### Enumerable  
和数据属性的[[Enumerable]]]一样
###### Get  
一个给属性提供 getter 的方法(访问对象属性时调用的函数,返回值就是当前属性的值)，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined
###### Set  
一个给属性提供 setter 的方法(给对象属性设置值时调用的函数)，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined


#### Object.defineProperty()
功能:
方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined

> 语法: Object.defineProperty(obj, prop, descriptor)  
> obj: 需要被操作的目标对象  
> prop: 目标对象需要定义或修改的属性的名称  
> descriptor: 将被定义或修改的属性的描述符  
```js
var obj = new Object();

Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})

console.log(obj.name)  //张三
```

##### Object.defineProperties()
功能:
方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。

> 语法: Object.defineProperties(obj, props)   
> obj: 将要被添加属性或修改属性的对象  
> props: 该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置    
```js
var obj = new Object();
Object.defineProperties(obj, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})

console.log(obj.name, obj.age) // 张三, 18
```
##### Object.getOwnPropertyDescriptor()
功能:
该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

> 语法: Object.getOwnPropertyDescriptor(obj, prop)  
> obj: 需要查找的目标对象  
> prop: 目标对象内属性名称  
```js
var person = {
    name: '张三',
    age: 18
}

var desc = Object.getOwnPropertyDescriptor(person, 'name'); 
console.log(desc)  结果如下
// {
//     configurable: true,
//     enumerable: true,
//     writable: true,
//     value: "张三"
// }
```
注意:
1. 数据描述符与存取描述符不可混用,会抛出错误
```js
var obj = {};
Object.defineProperty(obj, 'a', {
    value: 'a1',
    get: function() {
       return 'a2'
    }    
});
//TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
```
2. 在严格模式下,getter和setter必须同时使用,只有其中一个会抛出错误
3. 全局模式下显式/隐式声明的变量
```js
var a = 1; // a属于window, 相当于window.a

var d = Object.getOwnPropertyDescriptor(window, 'a');
console.log(d)
// {
//     configurable: false,
//     value: 1,
//     writable: true,
//     enumerable: true
// }
```
在来看一下另一种不适用var声明的方式初始化a变量
```js
a = 1; //a相当于window的一个属性, window.a

var d = Object.getOwnPropertyDescriptor(window, 'a');
console.log(d)
// {
//     configurable: true,   // 此时configurable属性值为true
//     value: 1,
//     writable: true,
//     enumerable: true
// }
```

##### Writable
当writable为false(并且configurable为true),[[value]]可以通过defineeProperty修改, 但不能直接赋值修改
```js
var obj = {};

Object.defineProperty(obj, 'a', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: 1
});

Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    writable: false ,
    value: 2
});
var d = Object.getOwnPropertyDescriptor(obj, 'a')

console.log(d); // 结果如下
// {
//     value: 2, 
//     writable: false, 
//     enumerable: true, 
//     configurable: false
// }


但是如果直接复制修改
var obj = {}

Object.defineProperty(obj, 'a', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: 1
});
obj.a=2;
var d = Object.getOwnPropertyDescriptor(obj, 'a')

console.log(d); // 结果如下

// {
//     value: 1,  // 没有做出修改
//     writable: false, 
//     enumerable: true, 
//     configurable: false
// }
```

##### Enumerable
```js
var obj = {};
Object.defineProperties(obj, {
    a: {
        value: 1,
        enumerable: false
    }, 
    b: {
        value: 2,
        enumerable: true
    },
    c: {
        value: 3,
        enumerable: false
    }
})

obj.d = 4;

//等同于

//Object.defineProperty(obj, 'd', {
//    configurable: true,
//    enumerable: true,
//    writable: true,
//    value: 4
//})

for(var key in obj) {
    console.log(key);  
    // 打印一次b, 一次d, a和c属性enumerable为false，不可被枚举
} 

var arr = Object.keys(obj);
console.log(arr);  // ['b', 'd']
```

##### get和set
简易的数据双向绑定
```js
<!DOCTYPE html>
<html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>
    input1=><input type="text" id="input1">
</p>
<p>
    input2=>
    <input type="text" id="input2">
</p>
<div>
    我每次比input1的值加1=>
    <span id="span"></span>
</div>
<script>
    var oInput1 = document.getElementById('input1');
    var oInput2 = document.getElementById('input2');
    var oSpan = document.getElementById('span');
    var obj = {};
    Object.defineProperties(obj, {
        val1: {
            configurable: true,
            get: function() {
                oInput1.value = 0;
                oInput2.value = 0;
                oSpan.innerHTML = 0;
                return 0
            },
            set: function(newValue) {
                oInput2.value = newValue;
                oSpan.innerHTML = Number(newValue) ? Number(newValue) : 0
            }
        },
        val2: {
            configurable: true,
            get: function() {
                oInput1.value = 0;
                oInput2.value = 0;
                oSpan.innerHTML = 0;
                return 0
            },
            set: function(newValue) {
                oInput1.value = newValue;
                oSpan.innerHTML = Number(newValue)+1;
            }
        }
    });
    oInput1.value = obj.val1;
    oInput1.addEventListener('keyup', function() {
        obj.val1 = oInput1.value;
    }, false);
    oInput2.addEventListener('keyup', function() {
        obj.val2 = oInput2.value;
    }, false);
</script>
</body>
```
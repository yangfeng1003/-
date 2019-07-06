http://es6.ruanyifeng.com/   ECMAScript 6 入门 作者：阮一峰

# ES6新特性列表
- Let + const
- 箭头函数
- Class，类
- 解构赋值
- 字符串的扩展（模板字符串 Unicode表示 api）
- 对象的扩展（简洁表示  属性表达式  Object新增api）
- 数组的扩展 
- 数值的扩展 (二进制八进制字面量 Number Math)
- 正则的扩展 （y u修饰符 flags属性 sticky属性）
- 函数的扩展（箭头函数  函数参数默认值  rest参数  扩展运算符  name属性  尾调用优化）
- Map + Set + Weakmap + Weakset：新的数据结构
- Symbol：新的基本类型，独一无二的值
- Iterators + for..of：遍历
- Proxy：代理器
- Reflect
- Promise
- Generator：生成器
- Decorator：修饰器是一个函数，用来修改类的行为。修饰器只能用于类和类的方法


## Let 和 Const
只在声明所在的块级作用域内有效。
只能在声明后使用，不可重复定义。
没有变量提升，都存在暂时性死区（temporal dead zone，简称 TDZ）.  
const用于指定固定值，因此必须初始化`（如果是引用类型，其属性内容是可变的，因为没有改变引用地址）`


## [数组的扩展](https://github.com/yangfeng1003/Knowledge/blob/master/js%E5%9F%BA%E7%A1%80/Array_api.md)
- 转化为数组：`from() of()`
- 查找数组：  `find() findIndex() includes()`  (其他：filter every some)
- 遍历:      `keys() values() entries()`
- 填充数组：  `fill() copyWithin()`   
>这里是arr.keys() 如果是对象,要写成Object.keys(obj)




## Map + Set + Weakmap + Weakset：新的数据结构

**Set** 对象允许存储任何类型的唯一值。
```js
//add() delete() has() clear() size属性
var s = new Set();
s.add("hello").add("goodbye").add("hello");
console.log(s); // Set { 'hello', 'goodbye' }
console.log(s.size); // 2;
console.log(s.has("hello")); // true;
```
**WeakSet** 结构与 Set 类似，也是不重复的值的集合,但是WeakSet的成员只能存放对象引用，不能存放值。   
此外WeakSet中的对象值都是弱引用，如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 所以WeakSet对象是无法被枚举的, 没有办法拿到它包含的所有元素。 没有clear()  size
```js
var ws = new WeakSet();
let aa = {};
ws.add({ data: 42 });
ws.add(aa);
console.log('ws',ws);              //ws WeakSet { [items unknown] }
console.log(ws.has('data'));       //false
console.log(ws.has({ data: 42 })); //false
console.log(ws.has(aa));           //true  上面两种写法错误，这里存的是对象的引用
```
**Map** 对象也是键值对的集合，但是Map对象的“键”范围不限于字符串，各种类型的值（包括对象）都可以当作键。
```js
//set()  get()  has()   delete()  clear() size属性
var m = new Map([['hello', 42],[s, 34]]); // 注意初始化赋值是一个数组形式，而且元素也是[]形式
m.set([1,2,3],11);
console.log(m); // Map {'hello' => 42, Set { 'hello', 'goodbye' } => 34, [ 1, 2, 3 ] => 11  }
console.log(m.get(s)); // 34
console.log(m.size); // 3
```
**WeakMap** 结构与Map结构类似，其中的键是弱引用的。其键必须是对象，而值可以是任意的。   
此外WeakMap的键是弱引用。因此WeakMap 的 key 是不可枚举的。 没有clear()  size
```js
var wm = new WeakMap();
wm.set(s, { extra: 42 });
console.log(wm); // WeakMap { [items unknown] }
console.log(wm.get(s)); // { extra: 42 }
```
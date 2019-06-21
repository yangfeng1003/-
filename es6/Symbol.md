## Symbols：新的基本类型，独一无二的值

每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。  
`Symbol.for(key)` 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
```js
var abc = Symbol("key");     //不支持语法："new Symbol()"
console.log(typeof (abc));   // symbol
let abc2 = Symbol("key");
console.log(abc  === abc2);  // false
let abc3 = Symbol.for('key');
console.log(abc2 === abc3);  //false
let abc4 = Symbol.for('key');
console.log(abc3 === abc4);  //true
```
应用场景：作为对象属性的标识符
```js
let obj = {
    [abc]:'abc',
    abc: 123,      // 两个abc属性并不冲突
    "hello": "world"
};   
console.log(obj);  // { abc: 123, hello: 'world', [Symbol(key)]: 'abc' }
```
Symbol类型的key是**不能通过Object.keys()或者for...in来枚举**的,当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外。
```js
console.log(Object.keys(obj));                   // [ 'abc', 'hello' ]
```
1.使用**getOwnPropertySymbols**得到symbol属性
```js
console.log(Object.getOwnPropertySymbols(obj));  // [ Symbol(key) ]
```
2.使用**Reflect**可以得到所有属性
```js
console.log(Reflect.ownKeys(obj));               // [ 'abc', 'hello', Symbol(key) ]
```


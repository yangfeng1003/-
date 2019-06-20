//https://www.jianshu.com/p/f40a77bbd74e

//每个Symbol实例都是唯一的,即提供一个独一无二的值。因此，当比较两个Symbol实例的时候，将总会返回false
//Symbol.for(key) 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
var abc = Symbol("key"); //不支持语法："new Symbol()"
console.log(typeof (abc));  // symbol
let abc2 = Symbol("key");
console.log(abc  === abc2); // false
let abc3 = Symbol.for('key');
console.log(abc2 === abc3); //false
let abc4 = Symbol.for('key');
console.log(abc3 === abc4); //true


//每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
//应用场景：
let obj = {
    [abc]:'abc',
    abc: 123,    //{ abc: 123, hello: 'world', [Symbol(key)]: 'abc' } 两个abc属性并不冲突
    "hello": "world"
};
console.log(obj);  // { abc: 123, hello: 'world', [Symbol(key)]: 'abc' }

//Symbol类型的key是不能通过Object.keys()或者for...in来枚举的,当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外
console.log(Object.keys(obj));                   // [ 'abc', 'hello' ]
//1.使用getOwnPropertySymbols得到symbol属性
console.log(Object.getOwnPropertySymbols(obj));  // [ Symbol(key) ]
//2.使用Reflect可以得到所有属性
console.log(Reflect.ownKeys(obj));               // [ 'abc', 'hello', Symbol(key) ]

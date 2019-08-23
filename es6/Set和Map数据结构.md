## Set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成 Set 数据结构。

去除数组重复成员的方法
```js
[...new Set(array)]
```
向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}    在 Set 内部，两个NaN是相等。
//另外，两个对象总是不相等的。
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```
##### 方法：
add() delete() has() clear() size属性  
遍历： keys()返回键名的遍历器，values()返回键值的遍历器，entries()返回所有成员的遍历器（参见Iterator）forEach()遍历Set 的所有成员。  
需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
```js
var s = new Set();
s.add("hello").add("goodbye").add("hello");
console.log(s); // Set { 'hello', 'goodbye' }
console.log(s.size); // 2;
console.log(s.has("hello")); // true;
```



### WeakSet
 结构与 Set 类似，也是不重复的值的集合。但是  
1. WeakSet 的成员只能是对象，而不能是其他类型的值。    
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。  
所以WeakSet对象是无法被枚举的, 没有办法拿到它包含的所有元素。 没有clear()  size  forEach(),无法遍历
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
## Map
 对象也是键值对的集合，但是Map对象的“键”范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
方法： set()  get()  has()   delete()  clear() size属性
遍历：keys()，values()，entries() forEach() 需要特别注意的是，Map 的遍历顺序就是插入顺序。
```js
var m = new Map([['hello', 42],[s, 34]]); // 注意初始化赋值是一个数组形式，而且元素也是[]形式
m.set([1,2,3],11);
console.log(m); // Map {'hello' => 42, Set { 'hello', 'goodbye' } => 34, [ 1, 2, 3 ] => 11  }
console.log(m.get(s)); // 34
console.log(m.size); // 3
```
## WeakMap
WeakMap结构与Map结构类似，也是用于生成键值对的集合。 
WeakMap与Map的区别有两点：
1. 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。  
2. 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。  
WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放其占用的内存。WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。  
WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。WeakMap 应用的典型场合就是 DOM 节点作为键名。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
WeakMap 的 key 是不可枚举的。 没有clear()  size
```js
var wm = new WeakMap();
wm.set(s, { extra: 42 });
console.log(wm); // WeakMap { [items unknown] }
console.log(wm.get(s)); // { extra: 42 }
```

## [与其他数据结构的互相转换](http://es6.ruanyifeng.com/#docs/set-map)
（1）Map 转为数组   
前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。    
（2）数组 转为 Map    
将数组传入 Map 构造函数，就可以转为 Map。    
（3）Map 转为对象    
如果所有 Map 的键都是字符串，它可以无损地转为对象。    
```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```
（4）对象转为 Map  
（5）Map 转为 JSON  
Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```
另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```
（6）JSON 转为 Map  

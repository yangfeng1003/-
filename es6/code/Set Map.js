
// Set对象允许存储任何类型的唯一值。
//add() delete() has() clear() size属性
var s = new Set();
s.add("hello").add("goodbye").add("hello");
console.log(s); // Set { 'hello', 'goodbye' }
console.log(s.size); // 2;
console.log(s.has("hello")); // true;

// WeakSet 结构与 Set 类似，也是不重复的值的集合,但是WeakSet的成员只能存放对象引用，不能存放值。
// 此外WeakSet中的对象值都是弱引用，如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 所以WeakSet对象是无法被枚举的, 没有办法拿到它包含的所有元素.没有clear()  size
var ws = new WeakSet();
let aa = {};
ws.add({ data: 42 });
ws.add(aa);
console.log('ws',ws);                    //ws WeakSet { [items unknown] }
console.log(ws.has('data'));       //false
console.log(ws.has({ data: 42 })); //false
console.log(ws.has(aa));                 //true  上面两种写法错误，这里存的是对象的引用

// Map 类似于对象，也是键值对的集合，但是Map对象的“键”范围不限于字符串，各种类型的值（包括对象）都可以当作键。
//set()  get()  has()   delete()  clear() size属性
var m = new Map([['hello', 42],[s, 34]]); // 注意初始化赋值是一个数组形式，而且元素也是[]形式
m.set([1,2,3],11);
console.log(m); // Map {'hello' => 42, Set { 'hello', 'goodbye' } => 34, [ 1, 2, 3 ] => 11  }
console.log(m.get(s)); // 34
console.log(m.size); // 3

// WeakMap结构与Map结构类似，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
// 此外WeakMap的键是弱引用。因此WeakMap 的 key 是不可枚举的 (没有方法能给出所有的 key)。没有clear()  size
var wm = new WeakMap();
wm.set(s, { extra: 42 });
console.log(wm); // WeakMap { [items unknown] }
console.log(wm.get(s)); // { extra: 42 }

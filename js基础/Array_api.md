# Array的API

## 转数组 from  of

### from()
> Array.from(arrayLike[, mapFn[, thisArg]])  
从一个类似数组或可迭代对象中创建一个新的数组实例
参数：
- arrayLike
1. 拥有一个 length 属性和若干索引属性的对象
2. 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
- mapFn (可选参数)：
- 如果指定了该参数，新数组中的每个元素会执行该回调函数。
thisArg (可选参数):
可选参数，执行回调函数 mapFn 时 this 对象。
```js
Array.from([1, 2, 3], x => x + x);  //[2, 4, 6]
Array.from({length: 5}, (v, i) => i); // [0, 1, 2, 3, 4]
数组去重合并
function combine(){
    let arr = [].concat.apply([], arguments);
    return Array.from(new Set(arr));
}
var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));     // [1, 2, 3]
```

### of()
> Array.of(ele0[, ele1[,...eleN]])   
任意个参数，将按顺序成为返回数组中的元素。
 

## 填充 fill  copyWithin
### fill()
> arr.fill(value[, start[, end]]);   填充数组
- value 用来填充数组元素的值。
- start 可选 起始索引，默认值为0。两个索引可以为负值
- end 可选 终止索引，默认值为 this.length。注意填充范围是[start,end),不包括end的
- 返回值:修改后的数组。该方法是通用方法，不要求 this 必须是数组对象。fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。
```js
[1, 2, 3].fill(4);  // [4, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
```
### copyWithin()
> arr.copyWithin(target[, start[, end]]) 返回改变后的数组
- target 复制序列到该位置。如果是负数，将从末尾开始计算。
- start 可选 开始复制元素的起始位置
- end 可选 开始复制元素的结束位置,但不包括end。索引均可以为负值
方法是通用方法，不要求其 this 值必须是一个数组对象。
```js
[1, 2, 3, 4, 5].copyWithin(-2); // [1, 2, 3, 1, 2]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);// [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);// [1, 2, 3, 3, 4]
```

## 查找  find   findIndex   includes
```js
const list = [{'name':'1',index:1},{'name':'2'},{'name':'1'}]; 
let list2 = list.find(i=>i.name==='1');      // { name:'1', index:1 } 返回元素
let list3 = list.findIndex(i=>i.name==='1'); // 0    返回索引
let list4 = list.filter(i=>i.name==='1');    // [ { name: '1', index: 1 }, { name: '1' } ] //返回所有符合的元素组成的数组
```
includes() 是否含有匹配值，返回true/false （可以检测NaN，不能检测对象）
[1,2,NaN].includes(NaN); //true
every()/some() 是否全部符合/部分符合 ，返回true/false


## 遍历: keys values entries
keys() 返回一个新的 Array Iterator 对象,包含数组中每个索引键。
values() 返回一个新的 Array Iterator 对象，包含数组每个索引的值。
entries() 返回一个新的Array Iterator对象 ，包含数组中每个索引的键

Iteratori对象有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。
```js
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next()); //{ value:(2) [0, "a"],done:false,...}
// iterator.next()返回一个对象，对于有元素的数组，是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，直到迭代器结束done才是true。
// next.value是一个["key","value"]的数组，是返回的迭代器中的元素值。
```
## Iterators + For..Of
遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。调用这个接口，就会返回一个遍历器对象。
作用：
- 为各种数据结构，提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- ES6创造了一种新的遍历命令for...of循环，`for...of实质就是使用Iterator接口`

Iterator的遍历过程：（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。（2）第一次调用指针对象的`next方法`，可以将指针指向数据结构的第一个成员。不断调用指针对象的next方法，直到它指向数据结构的结束位置。每一次调用next方法，都会返回数据结构的当前成员的信息（`一个包含value和done两个属性的对象`，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束）。
```js
//对象自定义iterator接口 要求：实现遍历从start到end的属性的元素
let obj = {
    start:[1,2,3],
    end:[4,5],
    [Symbol.iterator](){
        let index = 0;
        let arr = this.start.concat(this.end);
        return {
            next () {    //必须返回一个next()方法
                return {
                    value:arr[index++],
                    done:index > arr.length
                }
            }
        }
    }
};
//检验
for(let key of obj){
    console.log(key); // 1 2 3 4 5
}
```



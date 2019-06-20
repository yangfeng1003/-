
let o = 1,k = 2;
let es5 = {
    o:o,
    k:k,
    methodes5:function(){ }
};
let es6 = {
    o,   //对象属性的区别
    k,
    methodes6(){}   //对象方法的区别
};

let arr = ['hello','world'];
let iter = arr[Symbol.iterator](); //参考：es6对象新增属性表达式
console.log(iter.next());  // { value: 'hello', done: false }
console.log(iter.next());  // { value: 'world', done: false }
console.log(iter.next());  // { value: undefined, done: true }

//对象自定义iterator接口 要求：实现遍历从start到end的属性的元素
let obj = {
    start:[1,2,3],
    end:[4,5],
    [Symbol.iterator](){
        let index = 0;
        let arr = this.start.concat(this.end);
        return {
            next () {
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
    //console.log(key); // 1 2 3 4 5
}


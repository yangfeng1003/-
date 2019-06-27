生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议。  
可以从两个角度理解Generators，它既是状态机也是一个遍历器对象生成函数。执行该函数可以理解为启动了遍历器，之后每次执行next()函数则每次执行到yield处。  `Generator.prototype.next()`    返回一个由 yield表达式生成的值
```js
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen(); 
```




无限id迭代器
```js
function* idMaker() {
    let i = 0;
    while (1) {
        yield i++;
    }
}
let gen = idMaker();
console.log(gen.next());  // { value: 0, done: false }
console.log(gen.next().value);  // 1
```

for...of遍历基于Iterator，以往Iterator我们要手写一个方法，每次返回value和done，而现在使用generator函数可以更优雅的完成
```js
let obj = {};
obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
for(let value of obj){
    console.log(value); // 1 2 3
}
```

状态机
```js
let state = function* () {
    while (1){
        yield 'A';
        yield 'B';
        yield 'C';
    }
};
let status = state();
console.log(status.next().value);
console.log(status.next().value);
console.log(status.next().value);
console.log(status.next().value);
console.log(status.next().value);
console.log(status.next().value);
...
//输出： A B C A B C A B*/
```
generator应用：长轮询
```js
let ajax = function* () {
    yield new Promise(function (resolve,reject) {
        setTimeout(function () {
            resolve({code:1});
        },1000)
    })
};
let pull = function () {
  let generator = ajax();
  let step = generator.next();
  step.value.then(function (val) {
      if(val.code!==0){
          console.log('wait');
          pull();
      }else{
          console.log(val);
      }
  })
};
pull(); //没1000ms输出wait*/
```
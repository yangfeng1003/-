## Promise
#### Promise构造函数
Promise对象是一个构造函数，用来生成Promise实例。Promise有三种状态：pending/reslove/reject。pending就是未完成，resolve可以理解为成功，reject可以理解为拒绝。  

Promise构造函数接收一个函数作为参数，该函数的两个参数分别是resolve和reject，是两个函数。resolve函数的作用是将Promise对象从Pending变为Resolved。reject函数的作用是将Promise对象的状态由Pending变为Rejected。   
```js
let promise = new Promise(function(resolve, reject){
    //``````some code `````
    if(/*异步操作成功*/){
        resolve(value);
    }else{
        reject(error);
    }
});
```
#### then()
Promise实例生成以后，可以用then()分别指定Resolve状态和rejected状态的回调函数。then()接收两个回调函数作为参数。  
```js
promise.then(function (value) {
    //sucess
},function (value) {
    //failure
});
```
如果调用resolve()和reject()时带有参数，那么这些参数会被传递给回调函数。   
reject函数的参数一般为Error实例对象，表示抛出的错误。resolve的参数可以是一个值，也可以是另一个promise示例。 如下p2的resolve参数为p1，那么p1的状态会传递给p2，如果p1为pending，则p2等待p1状态改变，当p1的状态为resolved或rejected，p2立刻跟着改变。示例中1s后p2调用resolve方法，但此时p1状态还未改变，所以p2的回调函数等待p1状态改变，再过2s后，p1变为rejected，p2也变为rejected）。
```js
    let p = new Promise(function (resolve,reject) {
        setTimeout(()=>reject(new Error('fail')),3000);
    });
    let p2 = new Promise(function (resolve,reject) {
        setTimeout(()=>resolve(p),1000);
    });
    p2.then(result=>console.log(result));
    p2.catch(error=>console.log(error));
```
#### .catch()  
.catch()方法是then(null,rejection)的别名，仅仅是一个语法糖，用于制定发生错误时的回调函数。

Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。即错误总是被下一个catch语句捕获。一般不要在then方法中定义Rejected状态的回调函数，而总是使用catch方法。 因为then(resolveHandler, rejectHandler) 这种形式中，rejectHandler 并不会捕获由 resolveHandler 引发的异常。
Node.js中有一个unhandledRejection事件，专门监听未捕获的Rejecetd错误。

#### Promise.all
```js
let p = Promise.all([p1,p2,p3]);
```
用于将多个Promise实例包装成一个新的Promise实例。接受一个数组作为参数,每一项分别是一个Promise实例（如果不是，就先调用Promise.resolve将参数转化为Promise实例）。   
p的状态有两种：   
1.当p1,p2,p3的状态都变为Fulfilled时, p的状态才变为Fulfilled。此时p1,p2,p3的返回值组成一个数组，传递给p的回调函数。   
2.只要p1,p2,p3有一个状态变为Rejected, p的状态就变为Rejected。此时第一个被Rejected的实例的返回值传递给p的回调函数。

#### Promise.race
```js
let p = Promise.all([p1,p2,p3]);
```
参数同上。 只要p1,p2,p3有一个率先改变状态，p的状态就跟着变。率先改变的Promise实例的返回值，会传递给p的回调函数。 

#### Promise.resolve()
用于将现有对象转化为Promise对象。
```js
Promise.resolve('foo') //等价于
new Promise(resolve => resolve('foo'))
```
如果希望得到一个Promise对象，比较方便的方法是直接调用此方法。 
```js
let p = Promise.resolve();
p.then(function(){
    //...
});
```

#### Promise.reject()
```js
let p = Promise.reject('出错了'); //等价于
let p = new Promise((resolve,reject)=>reject('foo'))
p.then(null,function(s){
    console.log(s);
});
```

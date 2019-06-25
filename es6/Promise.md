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

#### 实现Promise
首先要理解Promise规范： 这篇讲的很好
Promises/A+  [Promise的实现与标准](https://www.jianshu.com/p/4d266538f364)   
1. 为什么Promise能写成链式的，在.then之后还能接着.then？基于这一点可以判断出then方法return的是一个Promise
2. 原则上，promise.then(onResolved, onRejected)里的这两项函数需要异步调用。
```js
console.log('script start');

let promise = new Promise(function(resolve, reject) {
    console.log('in promise');
    resolve('reslove promise');
});

promise.then(function(value) {
    console.log('resolve: ', value);
}, function(reason) {
    console.log('reason: ', reason);
});

console.log('script end')
```
输出如下。可以看到传给then方法的回调是在最后执行的，所以可以判断出new Promise(function)中的function是同步执行的，而then(reslove,reject)中的resolve或reject函数是异步执行的。
```js
script start
in promise
script end
resolve:  reslove promise
```

实现代码
```js
function Promise(executor) {
    var self = this;
    self.status = 'pending';
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(function() { // 异步执行所有的回调函数
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (var i = 0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value)  /*同一个Promise的then方法可以被调用多次，当该Promise状态变为resolved或rejected状态时，注册在该Promise上的回调应该根据注册的顺序被调用。*/
                }
            }
        })
    }
    function reject(reason) {
        setTimeout(function() { // 异步执行所有的回调函数
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = reason;
                for (var i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](reason)
                }
            }
        })
    }
    try {
        executor(resolve, reject)
    } catch (reason) {
        reject(reason)
    }
}
/*
resolvePromise函数即为根据x的值来决定promise2的状态的函数
也即标准中的[Promise Resolution Procedure](https://promisesaplus.com/#point-47)
x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
`resolve`和`reject`实际上是`promise2`的`executor`的两个实参，因为很难挂在其它的地方，所以一并传进来。
*/
function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var thenCalledOrThrow = false;
/*1.如果x和promise是同一个对象的引用(x === promise),那么reject promise并将一个TypeError赋值给reason*/
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }
/*2.如果x是一个Promise(x instanceof Promise),那么promise的状态入下：

2.1 如果x处于pending状态那么promise也处于pending状态，直到x状态变为resolved或rejected。
2.2 如果x处于resolved状态，那么用x的value来resolve promise。
2.3 如果x处于rejected状态，那么用x的reason来reject promise*/
/* 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的.所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve*/
    if (x instanceof Promise) {
        if (x.status === 'pending') { //because x could resolved by a Promise Object
            x.then(function(v) {
                resolvePromise(promise2, v, resolve, reject)
            }, reject)
        } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
            x.then(resolve, reject)
        }
        return
    }
/*3.如果x是一个对象或function

3.1 如果获取属性x.then的过程中抛出异常e，那么将e作为reason来reject promise
3.2 如果x.then是一个function，那么调用x.then传入参数resolvePromise和rejectPromise
3.2.1 如果resolvePromise被调用且传入的参数为y，那么再次执行此操作，参数为(promise, y)
3.2.2 如果rejectPromise被调用且传入的参数r，那么将r作为reason来reject promise
3.2.3 如果resolvePromise和rejectPromise同时被调用，或者被调用多次，那么优先处理第一次调用，之后的调用都应该被忽略。
3.2.4 如果调用x.then抛出了异常e，若在抛出异常前resolvePromise或rejectPromise已经被调用，那么忽略异常即可。若resolvePromise或rejectPromise没有被调用过，那么将e作为reason来reject promise
3.3 如果x.then不是一个function，那么用x来resolve promise (x是对象)*/
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            then = x.then; //because x.then could be a getter.标准2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用。（即要判断它的类型，又要调用它，这就是两次读取）
            if (typeof then === 'function') { // 2.3.3.3
                then.call(x, function rs(y) { // 2.3.3.3.1
                    if (thenCalledOrThrow) return;// 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
                    thenCalledOrThrow = true;
                    return resolvePromise(promise2, y, resolve, reject)
                }, function rj(r) {
                    if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
                    thenCalledOrThrow = true;
                    return reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true;
            return reject(e)
        }
    } else { /*// 但如果这个Promise的状态已经确定了,x既不是对象也不是function,它有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态*/
        resolve(x)
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    var self = this;
    var promise2;
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) {
        return v
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function(r) {
        throw r
    };
    /*如果promise1是resolved状态且onResolved不是一个function那么promise2必须resolved，并且promise2的value必须与promise1相同*/
    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() { // 异步执行onResolved /*onResolved和onRejected需要通过异步的方式执行，可以用“macro-task”或“micro-task”机制来执行。*/
                try {
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }
    /*如果promise1是rejected状态且onRejected不是一个function那么promise2必须rejected，并且promise2的reason必须与promise1相同*/
    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() { // 异步执行onRejected
                try {
                    var x = onRejected(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }
    if (self.status === 'pending') {
        // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
        return promise2 = new Promise(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {
                    var x = onResolved(value);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            });
            self.onRejectedCallback.push(function(reason) {
                try {
                    var x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })
        })
    }
};

Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
};

/*Promise.deferred = Promise.defer = function() {
    var dfd = {};
    dfd.promise = new Promise(function(resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject
    });
    return dfd
};*/

//测试
let p = new Promise(function (resolve,reject) {
    console.log('start');
    // setTimeout(()=>resolve('2'),1000)
    resolve(1)
})
.then(result=>console.log(result),reason => console.log(reason))
// .catch(error=>console.log(error));
/*
let p = new Promise(function (resolve,reject) {
    console.log('start');
    setTimeout(()=>resolve('2'),1000)
})
.then(result=>{
    console.log(result);
    return new Promise(resolve=>{resolve('3')})
})
.then(result=>console.log(result))
.catch(error=>console.log(error));*/
```

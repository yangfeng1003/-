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
                for (var i = 0; i < self.
                    onResolvedCallback.length; i++) {
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
    try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
        executor(resolve, reject)
    } catch (reason) {
        reject(reason)
    }
}
// resolvePromise函数即为根据x的值来决定promise2的状态的函数。x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var thenCalledOrThrow = false;
    if (promise2 === x) { // then()方法return了自己的promise本身，循环应用
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }
    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function(v) {
                resolvePromise(promise2, v, resolve, reject)
            }, reject)
        } else {
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
3.3 如果x.then不是一个function，那么用x来resolve promise (x是对象) */
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            then = x.then; // because x.then could be a getter
            if (typeof then === 'function') {
                then.call(x, function rs(y) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return resolvePromise(promise2, y, resolve, reject)
                }, function rj(r) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(e)
        }
    } else {
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
    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() { // onResolved和onRejected需要通过异步的方式执行
                try {
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }
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
        return promise2 = new Promise(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
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

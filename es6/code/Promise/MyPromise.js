
//修改then方法，返回一个新的promise对象
function MyPromise(fn){
    const that = this;
    that.value = null;
    that.state = 'pending';
    that.resolveCallback = [];
    that.rejectCallback = [];

    function resolve(value){
        if(value instanceof MyPromise){        //一开始漏掉了   
            //这里是因为如果resolve（）的参数本身就是一个promise，称pp，我们需要先让括号pp里面给出一个结果，然后再继续执行。
            //万一括号里面就报错了呢，比如括号里的pp出现错误状态变为rejected，那么我们虽然有resolve(pp),但是还应该
            //让它冒泡到下一个then（onfulfilled，onrejected）的onrejected中，那么直接执行pp.then()不就是我们想要的吗，then（）根据pp的状态决定执行哪个函数
            return value.then(resolve,reject);
        }
        if(that.state === 'pending'){
            that.state = 'resolved';
            that.value = value;
            for(let i=0;i<that.resolveCallback.length;i++){
                that.resolveCallback[i](value);
            }
        }
    }
    function reject(reason){
        if(that.state === 'pending'){
            that.state = 'rejected';
            that.value = reason;
            for(let i=0;i<that.rejectCallback.length;i++){
                that.rejectCallback[i](reason);
            }
        }
    }

    try{
        fn(resolve,reject);// resolve/reject函数能不能定义在构造函数外？如果定义在构造函数外，那么在这里调用的时候，这句就变成resolve.bind(this)，而bind又会返回一个函数，相当于还是写在了构造函数内部
    }catch (e) {
        reject(e);
    }
}
// 每个Promise对象都可以在其上多次调用then方法，而每次调用then返回的Promise的状态取决于那一次调用then时传入参数的返回值
MyPromise.prototype.then = function(onResolved,onRejected){
    onResolved = typeof onResolved === "function"? onResolved : value => value;   //{return value} 实现then() 值的穿透
    onRejected = typeof onRejected === "function"? onRejected : reason => reason;
    let that = this;
    let promise2;
    if(that.state === 'resolved'){
        return promise2 = new MyPromise(function (resolve,reject) {
            try {
                let x = onResolved(that.value);
                if (x instanceof MyPromise) {
                    x.then(resolve, reject); // 如果返回值是一个Promise对象，直接取它的结果做为promise2的结果
                }
                resolve(x); //否则，以它的返回值做为promise2的结果
            } catch (e) {
                reject(e);
            }
        })
    }
    if(that.state === 'rejected'){
        return promise2 = new MyPromise(function (resolve,reject) {
            try {
                let x = onRejected(that.value);
                if (x instanceof MyPromise) {
                    x.then(resolve, reject);
                }
                reject(x);
            } catch (e) {
                reject(e);
            }
        })
    }
    if((that.state === 'pending')){
        return promise2 = new MyPromise(function (resolve,reject) {
            that.resolveCallback.push(function (value) {
                try {
                    let x = onResolved(that.value);
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject);  //例如//return new MyPromise(resolve=>resolve('第二个then完成')).then(value=>{console.log('第二最终');return '最终'});
                    }
                } catch (e) {
                    reject(e);
                }
            });
            that.rejectCallback.push(function (value) {
                try {
                    let x = onRejected(that.value);
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};

MyPromise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected)
};

MyPromise.resolve = function(value){    // 静态方法 Promise.resolve 和 Promise.reject ，直接返回一个最终态为成功或失败的promise对象即可。*/
    return new MyPromise(function(resolve,reject){
        resolve(value)
    })
};

MyPromise.reject = function(reason){
    return new MyPromise(function(resolve,reject){
        reject(reason)
    })
};

MyPromise.all = function (promises) {
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to all.');
    }
    return new MyPromise((resolve, reject) => {
        const result = [];
        let cnt = 0;
        for (let i = 0; i < promises.length; ++i) {
            promises[i].then(value => {
                cnt++;
                result[i] = value;
                if (cnt === promises.length) resolve(result)
            }, reject)
        }
    })
};

MyPromise.race = function (promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
    }
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; ++i) {
            promises[i].then(resolve, reject)
        }
    })
};

Promise.prototype.done = function(){
    return this.catch(function(e) { // 此处一定要确保这个函数不能再出错
        console.error(e)
    })
};

/** 测试then方法中返回promise的情况，*/
console.log('start');
new MyPromise((resolve, reject) => {
    //setTimeout(() => resolve('成功的回调数据'), 1000)
    resolve('success')
})
    .then(function(value) {
        console.log('resolved then:  ', value);
        // return 4                                             //返回一个值的情况
        //return new MyPromise(resolve=>resolve('第二个then完成'));    //返回一个promise resolve
        return new MyPromise(resolve=>resolve('第二个then完成')).then(value=>{console.log('第二最终');return '最终'});    //返回一个promise resolve
        //throw new Error('sth went wrong')                    //resolve中抛出错误，执行reject方法
    }, reason => { throw new Error('sth went wrong',reason)})
    .then(value=>console.log(value),reason=>console.log(reason));

//输出：
// start
// resolved then:   成功的回调数据
// 第二最终
// 最终

/** 测试then()方法值的穿透 （value没有变成undefined）.then 或者 .catch 的参数期望是函数,传入非函数则会发生值的穿透 */
/*new MyPromise(resolve=>resolve(8))
    .then()
    .then()
    .then(function foo(value) {
        console.log(value)
    });      */                   //输出8
//网上说要加上settimeout，我在没加的时候代码没有问题，给resolve和rejected四处加上setTimeout后不能实现值得穿透，不知道为什么？


/** 测试 .all()   .race()   Promise.resolve() */
/*let p1 = MyPromise.resolve('p1 成功');
let p2 = new MyPromise((resolve, reject) => {
    setTimeout(()=>resolve('p2 success'),2000);
});
let p3 = MyPromise.reject('p3 失败');

MyPromise.all([p1, p2]).then((result) => {    // 2s后输出 [ 'p1 成功', 'p2 success' ]
    console.log(result)
}).catch((error) => {
    console.log(error)
});

MyPromise.race([p1, p2]).then((result) => {    // p1 成功
    console.log(result)
}).catch((error) => {
    console.log(error)
});

MyPromise.all([p1,p2,p3]).then((result) => {   // 失败了，打出 '失败'
    console.log(result)
}).catch((error) => {
    console.log(error)
});*/

/** 测试done()*/
/*new MyPromise(resolve=>resolve(8))
    .then()
    .then()
    .then(function foo(value) {
        aa.log(value)      //这里有错误，如果在链的最后一步，不会报错，无法发现错误
    })
    .done(); */             //报错。TypeError: (intermediate value).then(...).then(...).then(...).done is not a function

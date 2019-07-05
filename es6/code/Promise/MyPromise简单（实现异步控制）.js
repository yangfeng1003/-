
function MyPromise(fn){
    const that = this;
    that.value = null;
    that.state = 'pending';
    that.resolveCallback = [];
    that.rejectCallback = [];
    try{
        fn(resolve,reject);
    }catch (e) {
        reject(e);
    }
    function resolve(value){
        if(that.state === 'pending'){
            that.state = 'resolved';
            that.value = value;
            // this.resolveCallback.map((index,value) => this.resolveCallback[index](value));
            //that.resolveCallback.map(value => resolve(value));  //注1
            // that.resolveCallback.map(resolveCallbackFun => resolveCallbackFun(value));  //注1
            for(let i=0;i<that.resolveCallback.length;i++){  //上一句的另一种写法
                that.resolveCallback[i](value);
            }

        }
    }
    function reject(reason){
        if(that.state === 'pending'){
            that.state = 'rejected';
            that.value = reason;
            // this.rejectCallback.map((index,value) => this.rejectCallback[index](value));
            // that.rejectCallback.map(reason => reject(reason));
            // that.rejectCallback.map(rejectCallbackFun => rejectCallbackFun(reason));
            for(let i=0;i<that.rejectCallback.length;i++){
                that.rejectCallback[i](reason);
            }
        }
    }
}

MyPromise.prototype.then = function(resolvedThen,rejectedThen){
    resolvedThen = typeof resolvedThen === "function"? resolvedThen : value=>value;
    rejectedThen = typeof rejectedThen === "function"? rejectedThen : reason=>reason;
    //let promise2 =  new MyPromise();
    const that = this;
    if(that.state === 'pending'){
        /*that.resolveCallback.push(resolve(that.value));
        that.resolveCallback.push(reject(that.value));*/    //注2，和注1一起看，这里回调的是一个function，如果在次数带参数，那么value是还没有执行resolve方法的value，即null，应该在注1处进行this.value的传值，注1的this.value才是真正上一次resolve的值
        that.resolveCallback.push(resolvedThen);
        that.rejectCallback.push(rejectedThen);
    }
    else if(that.state === 'resolved'){
        resolvedThen(that.value)        //这里和注2的不同是then之前的promise对象已经resolve或者reject了，所以value就是我们现在的this.value
    }
    else {
        rejectedThen(that.value);
    }
};

//测试
console.log('start');
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功的回调数据')
    }, 1000)
})/*.then(value => {
    console.log('resolved then:  ', value);
})*/
    .then(function(value) {
        console.log('resolved then:  ', value);
        return 4
    }, function(reason) {
        throw new Error('sth went wrong')
    });
/*
* 第一个实现中，实现了异步转为同步。但then返回的不是promise对象，是无法链式调用的
* 在末尾再加上一个then发现报错
    .then(value=>console.log(value)); //加上第二个then以后报错。TypeError: Cannot read property 'then' of undefined
*/
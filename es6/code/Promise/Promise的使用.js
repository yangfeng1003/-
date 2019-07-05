Promise的使用

console.log('start');

{
    let p = new Promise(resolve=>resolve('1')); //等价于
    let p2 = Promise.resolve('2',1000);

    p.then(value => console.log(value));
    p2.then(value => console.log(value));

}

{
    let p = Promise.reject('出错了'); //等价于
    let p2 = new Promise((resolve,reject)=>reject('foo'))
    p.then(null,function(s){
        console.log(s);
    });
}


/*{
    //rejected的参数一般为Error实例对象，表示抛出的错误。
    //resolve的参数可以试一个值，也可以是另一个promise示例。
    // （如下p2的resolve参数为p1，那么p1的状态会传递给p2，如果p1为pending，则p2等待p1状态改变，当p1的状态为resolved或rejected，p2立刻跟着改变。
    // 示例中1s后p2调用resolve方法，但此时p1状态还未改变，再过2s后，p1变为rejected，p2也变为rejected）。
    let p = new Promise(function (resolve,reject) {
        setTimeout(()=>reject(new Error('fail')),3000);
    });
    let p2 = new Promise(function (resolve,reject) {
        setTimeout(()=>resolve(p),1000);
    });
    p2.then(result=>console.log(result));
    p2.catch(error=>console.log(error));
}*/


/*function myFun() {
    return new Promise(function (resolve,reject) {
        timeout('f',1000);
        resolve();
    });
}
function timeout(print,ms) {
    setTimeout(()=> console.log(print),ms);
}
myFun();*/

//最后一个catch的错误无法抛出，在其最后提供一个done方法，保证抛出任何可能出现的错误
Promise.prototype.done = function (onFulfilled,onRejected) {
    this.then(onFulfilled,onRejected)
        .catch(function (reason) {
            //抛出异常
            setTimeout(()=>{throw reason},0);
        });
};





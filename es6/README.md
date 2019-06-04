/*解构赋值*/
let [a,b,c] = [1,,3];
console.log(a,b,c); //1 undefined 3
[a,b] = [b,a];
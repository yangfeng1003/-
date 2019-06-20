/*
i	执行对大小写不敏感的匹配。
g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
m	执行多行匹配（multiline ）。*/

let regex = new RegExp("xyz",'i');
let regex2 = new RegExp(/xyz/i);

let regex3 = new RegExp(/xyz/ig,'i');

console.log(regex3.flags); //i  ES6为正则表达式新增了flags属性，会返回正则表达式的修饰符。

//y修饰符（含义是 粘连sticky）
//y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
// 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s); // ["aaa"]
r2.exec(s); // ["aaa"]

r1.exec(s); // ["aa"]
r2.exec(s); // null

//与y修饰符相匹配，ES6的正则对象多了sticky属性，表示是否设置了y修饰符。
console.log(r1.sticky,r2.sticky); // false true


//u修饰符（含义是Unicode）
//用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。


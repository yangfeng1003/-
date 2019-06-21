console.log('\u0061');  //a 小于两个字节
console.log('\u20BB'); //₻7
console.log('\u20BB7'); //₻7 大于两个字节，但是将前4位作为一部分
console.log('\u{20BB7}');//𠮷 大于两个字节，加上大括号来表示

let a = '𠮷';
console.log(a.length); //2 每两个字节length为1，它大于两个字节，所以length为2

//api： includes  startsWith  endsWith  repeat  padStart  String.raw
let str = "string";
console.log(str.includes('r')); //true 字符串包含字符
console.log(str.startsWith('s'));//true  字符串起始字符
console.log(str.endsWith('g'));//true  字符串终止字符
console.log(str.repeat(3)); //stringstringstring  重复字符串
console.log('1'.padStart(2,'0')); //01  长度两位，不够在前面补0
console.log(`Hi\n${1+2}`); // Hi 第二行是 3
console.log(String.raw`Hi\n${1+2}`); // Hi\n3  注意raw后面没有括号





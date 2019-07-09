http://es6.ruanyifeng.com/   ECMAScript 6 入门 作者：阮一峰

# ES6新特性列表
- Let + const
- 箭头函数
- Class，类
- 解构赋值
- 字符串的扩展（模板字符串 Unicode表示 api）
- 对象的扩展（简洁表示  属性表达式  Object新增api）
- 数组的扩展 
- 数值的扩展 (二进制八进制字面量 Number Math)
- 正则的扩展 （y u修饰符 flags属性 sticky属性）
- 函数的扩展（箭头函数  函数参数默认值  rest参数  扩展运算符  name属性  尾调用优化）
- Map + Set + Weakmap + Weakset：新的数据结构
- Symbol：新的基本类型，独一无二的值
- Iterators + for..of：遍历
- Proxy：代理器
- Reflect
- Promise
- Generator：生成器
- Decorator：修饰器是一个函数，用来修改类的行为。修饰器只能用于类和类的方法


## Let 和 Const
只在声明所在的块级作用域内有效。
只能在声明后使用，不可重复定义。
没有变量提升，都存在暂时性死区（temporal dead zone，简称 TDZ）.  
const用于指定固定值，因此必须初始化`（如果是引用类型，其属性内容是可变的，因为没有改变引用地址）`


## [数组的扩展](https://github.com/yangfeng1003/Knowledge/blob/master/js%E5%9F%BA%E7%A1%80/Array_api.md)
- 转化为数组：`from() of()`
- 查找数组：  `find() findIndex() includes()`  (其他：filter every some)
- 遍历:      `keys() values() entries()`
- 填充数组：  `fill() copyWithin()`   
>这里是arr.keys() 如果是对象,要写成Object.keys(obj)





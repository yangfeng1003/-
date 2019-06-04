ES6新特性列表
- Arrows,箭头函数
- Classes，类
- Enhanced object literals，增强的对象字面值
- Template strings：模板字符串
- Destructuring：解构
- Default + rest + spread：参数默认值，rest参数,扩展运算符
- Let + const:命名声明的新方式
- Iterators + for..of：遍历器
- Generators：生成器
- Unicode：更广泛的编码支持
- Modules：语言层面上支持的模块机制
- Module loaders：模块加载器
- Map + set + weakmap + weakset：新的数据结构
- Proxies：代理器
- Symbols：新的基本类型，独一无二的值
- Subclassable built-ins：类的继承
- Promises：
- Math + number + string + array + object apis：拓展了一些内置对象的方法
- Binary and octal literals：二进制八进制字面量
- Reflect api：操作对象的新api
- Tail calls:尾调用


### 箭头函数
箭头函数使用类似于`=>`这样的语法定义函数，不过其最大特点在于**和父作用域具有一样的this**。使用箭头函数时再也不用担心this跳来跳去了。
此外如果箭头函数如果定义在另一个函数里面，箭头函数会共享它父函数的arguments变量。


### Classes
JavaScript中其实并不存在真正的类，ES6的类其实是**基于原型链模拟面向对象的一种语法糖**。其本质上可以看做是构造函数的另一种写法。与真的类一样，它支持`super`继承，实例，静态方法和`constructor`方法。

```js
// 定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// 通过extends关键字实现继承
class SkinnedMesh extends THREE.Mesh {
  //constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
  //一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  constructor(geometry, materials) {
    // super表示父类的构造函数，用来新建父类的this对象,
    // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。如果不调用super方法，子类就得不到this对象。
    super(geometry, materials);
    //在构造方法中绑定this,可以防止实例找不到this
    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
  }
  
  // 非定义在this上的方法都会被直接定义在原型链上
  update(camera) {
    //...
    // super在此处作为对象，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
    super.update();
  }
  // 可以使用get和set关键字，对某个属性设置存值函数和取值函数
  get boneCount() {
  // 类的方法内部如果含有this，它默认指向类的实例
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  
  // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}

// 类的所有实例共享一个原型对象
let skin = new SkinnedMesh();
// 静态方法需要直接通过类调用
SkinnedMesh.defaultMatrix
```


### 对象的拓展
ES6中对象的使用方法得以拓展，主要包括以下几点：

- 属性和方法可以简洁表示；
- 允许以表达式的模式定义属性名；
- 可以通过`__proto__`读取或设置当前对象的prototype对象;
- 使用`Object.is({},{})`判断两个对象是否完全相对，类似于===;
- `Object.assign(target, source1, source2)`合并对象；（浅拷贝）

### 模板字符串
- 模板字符串定义在两个反撇号中；
- 在模板字符串中可以直接换行，格式会得以保留；
- 通过${}可以很方便的在模板字符串中添加变量；

### 解构赋值
解构使用模式匹配的方法绑定变量和值。解构在绑定失败的时会实现软绑定，即没有匹配值时返回`undefined`
参考：https://www.cnblogs.com/koto/p/5865064.html
**数组解构**
```js
let point = [1,2,3];
//以前的写法：
let a = 1;
let b = 2;
let c = 3;
let x = point[0];
let y = point[1];

//现在
let [a,b,c] = [1,2,3]; //a 1, b 2, c 3
let [x,y] = point;

//默认值
[a=5, b=7] = [1]; //a 1, b 7

//交换变量 (不需要额外变量)
[a,b] = [b,a]; //a 7, b 1

//忽略不感兴趣的返回值
[a,,b] = f(); //a 1,b 3
function f(){
    return [1, 2, 3];
}

//剩余数组
//当解构一个数组时，可以使用剩余模式，将数组剩余部分赋值给一个变量
[a, ...b] = [1, 2, 3]; //a 1, b [2,3]
//注意：如果剩余元素右侧有逗号[a, ...b,]，会抛出 SyntaxError，因为剩余元素必须是数组的最后一个元素。

```

**对象解构**

对象的解构赋值与数组有一个不同，数组的元素是按次序排列的，变量的取值由它的位置决定。而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
var o = {p: 42, q: true};
var {p, q} = o; //p 42,q true

//无声明赋值
({a, b} = {a: 1, b: 2}); //通过解构，无需声明即可赋值一个变量。
//（...）表达式前面需要一个分号，否则会当成上一行函数执行。"()"的作用是使编译器区分解构语句中的{}和代码块中的{}，{a,b}是一个块而不是对象字面量，正如var {a, b} = {a: 1, b: 2}。

//给新变量名赋值
var {p: foo, q: bar} = o;  //foo 42, bar true

//默认值
var {a = 10, b = 5} = {a: 3};

//函数参数默认值
function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 } } = {}){}

//对象解构中的 Rest
//Rest 属性收集那些尚未被解构模式拾取的剩余可枚举属性键。
let {c, d, ...rest} = {c: 10, d: 20, e: 30, f: 40}; //c 10, d 20, rest { e: 30, f: 40 }

```
**字符串解构**
```js
//将字符串转换成一个类似数组的对象
const [a,b,c,d,e] = 'hello'; //a "h",b "e",c "l",...
//字符串具有length属性
let {length:len} = 'hello'; //len 5 

```

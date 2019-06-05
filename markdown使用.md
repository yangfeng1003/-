### markdown使用
[使用Sublime Text 3写Markdown](https://blog.csdn.net/qazxswed807/article/details/51235792#1%E5%AE%89%E8%A3%85)
在sublime中  按下组合键Ctrl+Shift+P调出命令面板，输入mdp，可以在浏览器中预览markdown文件。 

## Markdown 语法的简要规则
#### 标题(文字前加 # 号，一共六级标题)
# 一级标题
## 二级标题
### 三级标题

#### 无序列表与有序列表
无序列表
- feng(在文字前加上 - 或 * ，然后一个空格)
有序列表
1. feng（直接在文字前加1. 2. 3.，然后一个空格）

>引用(在文本前加入 > )

#### 行与段落
如果要另起一行，就在这行最后加上两个空格  
如果要开始新段，就要在中间留一个空的行

aaa bbb  
cc

aaa bbb

cc

#### 图片与链接

图片为：`![图片描述](图片地址)`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190604101844333.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyMjIwOA==,size_16,color_FFFFFF,t_70 )

链接为：`[链接名](链接地址)`
[使用Sublime Text 3写Markdown](https://blog.csdn.net/qazxswed807/article/details/51235792#1%E5%AE%89%E8%A3%85)
插入图片的地址需要图床，这里推荐围脖图床修复计划 与 CloudApp 的服务，生成URL地址即可。

用反引号包含显示浅粉色，可以保留字符原格式，如；`#这里不是标题了`

#### 粗体与斜体
**粗体(两个 * 包含一段文本)**      *斜体(用一个 * 包含一段文本)*

#### 代码框
```js
let a = 1;
```
#### 分割线
三个*号

***

三个-号

---

#### 表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

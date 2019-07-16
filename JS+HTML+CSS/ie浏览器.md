navigator.userAgent
判断浏览器内核。
ie11当然也是ie浏览器，是ie环境，但是不能用此方法进行判断。
<!-- 判断是否是IE内核的浏览器
https://blog.csdn.net/hemeinvyiqiluoben/article/details/79334067
    （ie11通过navigator.userAgent进行判断看到内核不是ie，要单独判断）*/ -->
>win10环境不能安装ie8怎么办？
>http://www.winwin7.com/JC/5207.html

通过这种方式可以把Edge切换成多种不同的浏览器啦~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190716124519291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyMjIwOA==,size_16,color_FFFFFF,t_70)


由图Edge浏览器内，用currentStyle可以访问到样式，说明ie环境存在
![由图Edge浏览器内，用currentStyle可以访问到样式，说明ie环境存在](https://img-blog.csdnimg.cn/20190716130813428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyMjIwOA==,size_16,color_FFFFFF,t_70)
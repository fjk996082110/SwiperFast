###### 快速生成移动端轮播图，并支持自选设置内容，自定义了滚动条。

完善功能如下：1）即点即停功能2）自定义滚动条功能（touchscroll.js）3）橡皮筋效果（tweenTransition.js）

--------------------------------------------------

Swiper（轮播图）用法：

依赖transformCSS.js

例：

```js
new Swiper（'＃swiper-container'，{           
    loop：true，//无缝滚动           
    auto：true，///自动播放           
    time：2000，//自动播放间隔           
    loop：true //是否显示导航点       
}）;
```

--------------------------------------------------

touchsroll使用：        

作用          

快速实现内容的可滑动，并且有惯性移动，边界回弹效果，加滚动条                

 例：          

```js
new Touchscroll（'＃main'，'#content'）;
```

依赖          transformCSS.js          tweenTransition.js      

-------------------------------------------------- --

tweenTransition用法：           例：              

tweenTransition（节点，样式，初始化，结束，持续时间，时间，类型='线性'）            

```js
new tweenTransition(node, style, init, end, duration, time, type = 'linear')
```

依赖           transformCSS.js
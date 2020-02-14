/**
 *

 *
 *
 * @param outerSelector
 * @param innerSelector
 * @constructor
 *
 * 构造函数
    Touchscroll

    作用
    快速实现内容的可滑动, 并且有惯性移动, 边界回弹效果, 加滚动条

    使用示例
    new Touchscroll('#main', '#content');

    依赖
    transformCSS.js
    tweenTransition.js
 */

function Touchscroll(outerSelector, innerSelector){
    //获取元素
    var main = document.querySelector(outerSelector);
    var content = main.querySelector(innerSelector);
    var isYueJie = false;
    var scrollBar = null;

    //绑定触摸开始事件
    main.addEventListener('touchstart', function (e) {
        //获取初始位置
        main.y = e.changedTouches[0].clientY;
        main.t = transformCSS(content, 'translateY');
        //当前的触摸时间
        main.startTime = Date.now();
        //清空定时器
        if (content.timer && content.timer.translateY) clearInterval(content.timer.translateY);
        if (scrollBar.timer && scrollBar.timer.translateY) clearInterval(scrollBar.timer.translateY);
        //阻止默认行为 防止产生菜单
        e.preventDefault();
    });

    //绑定触摸滑动事件
    main.addEventListener('touchmove', function (e) {
        main._y = e.changedTouches[0].clientY;
        var translateY = main._y - main.y + main.t;
        transformCSS(content, 'translateY', translateY);
        var ty = -transformCSS(content, 'translateY') / content.offsetHeight * main.offsetHeight;
        transformCSS(scrollBar, 'translateY', ty);
    });

    //触摸结束事件
    main.addEventListener('touchend', function (e) {
        var translateY = currentTranslateY = transformCSS(content, 'translateY');
        main._y = e.changedTouches[0].clientY;
        var disY = main._y - main.y;
        main.endTime = Date.now();
        var disTime = main.endTime - main.startTime;
        var v = disY / disTime;
        var s = v * 200;
        translateY += s;

        //检测边界
        if (translateY >= 0) {
            translateY = 0;
            isYueJie = true;
        }

        //下边边界
        var minTranslateY = -(content.offsetHeight - main.offsetHeight);
        if (translateY <= minTranslateY) {
            translateY = minTranslateY;
            isYueJie = true;
        }

        tweenTransition(content, 'translateY', currentTranslateY, translateY, 500, 20, isYueJie ? 'back' : 'pinghua');
        //获取当前的滚动条的位置
        var currentTy = transformCSS(scrollBar, 'translateY');
        //计算滚动条最终的位置
        var ty = -translateY / content.offsetHeight * main.offsetHeight;
        tweenTransition(scrollBar, 'translateY', currentTy, ty, 500, 20, isYueJie ? 'back' : 'pinghua');

        isYueJie = false;
    });

    //滚动条初始化操作
    function init(){
        //设定容器为相对定位
        main.style.position = 'relative';
        //创建一个滚动条
        scrollBar = document.createElement('div');
        scrollBar.style.position = 'absolute';
        scrollBar.style.right = '0';
        scrollBar.style.top = '0';
        scrollBar.style.width = '4px';
        scrollBar.style.background  = 'rgba(0,0,0,0.5)';
        scrollBar.style.borderRadius = '2px';
        //计算高度
        var h  = main.offsetHeight / content.offsetHeight * main.offsetHeight;
        scrollBar.style.height = h+'px';
        main.appendChild(scrollBar);
    }

    init();
}
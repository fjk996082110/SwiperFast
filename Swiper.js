/**
 * @description:
 * @param {type} selector  选择器
 * @param {type} options  选择器对象
 * @return:
 * @依赖  transformCSS.js
 * @example
 *      new Swiper('#swiper-container',{
 *          loop:true,//无缝滚动
 *          auto:true,//自动播放
 *          time:2000,//自动播放间隔
 *          pagination:true//是否显示导航点
 *      })
 *
 */
function Swiper(selector, options, callback) {
  let auto =
    options &&
      typeof options === "object" &&
      !options.auto &&
      options.auto !== undefined
      ? false
      : true;
  let time =
    options &&
      typeof options === "object" &&
      options.time &&
      typeof options.time === "number"
      ? options.time
      : 1500;
  let loop =
    options &&
      typeof options === "object" &&
      !options.loop &&
      options.loop !== undefined
      ? false
      : true;
  let pagination =
    options &&
      typeof options === "object" &&
      !options.pagination &&
      options.pagination !== undefined
      ? false
      : true;

  let container = document.querySelector(selector);
  let swiperWrapper = container.querySelector(".swiper-wrapper");
  let index = 0;
  let swiperPagination = container.querySelector(".swiper-pagination");
  let swiperDots = container.querySelectorAll(".swiper-pagination span");
  let len = swiperWrapper.querySelectorAll(".swiper-item").length;

  //无缝滚动
  if (loop) swiperWrapper.innerHTML += swiperWrapper.innerHTML;
  let swiperItems = swiperWrapper.querySelectorAll(".swiper-item");
  let length = swiperWrapper.querySelectorAll(".swiper-item").length;

  let timer = null;
  //滑动判断
  let isFirst = true; //是否第一次滑动
  let isHorizontal = true; //是否水平滑动

  container.addEventListener("touchstart", function (e) {
    //点击时清除定时器
    clearInterval(timer);
    //获取点击时 swiperWrapper位置和手指位置
    container.x = e.changedTouches[0].clientX;
    container.y = e.changedTouches[0].clientY;
    if (loop) {
      if (index == 0) {
        index = len;
        switchSlide(index, false);
      }
      if (index == length - 1) {
        index = len - 1;
        switchSlide(index, false);
      }
    }
    container.l = transformCSS(swiperWrapper, "translateX");
    //是否存在回调函数，并执行回调函数
    callback && typeof callback == 'object' && typeof callback.start === 'function' && callback.start();
  });
  container.addEventListener("touchmove", function (e) {
    //获取移动时手指位置
    container._x = e.changedTouches[0].clientX;
    container._y = e.changedTouches[0].clientY;
    let disX = Math.abs(container._x - container.x);
    let disY = Math.abs(container._y - container.y);
    if (isFirst) {
      isFirst = false;
      if (disX > disY) {
        isHorizontal = true;
      } else {
        isHorizontal = false;
      }
    }
    if (isHorizontal) {
      e.preventDefault();
    } else {
      return;
    }
    let newLeft = container._x - container.x + container.l;
    //设置
    transformCSS(swiperWrapper, "translateX", newLeft);
    //是否存在回调函数，并执行回调函数
    callback && typeof callback == 'object' && typeof callback.move === 'function' && callback.move();
  });
  container.addEventListener("touchend", function (e) {
    isFirst = true;
    container._x = e.changedTouches[0].clientX;
    //滑动距离检测
    let disX = Math.abs(container._x - container.x);
    if (disX >= container.offsetWidth / 2) {
      if (container._x > container.x) {
        index--;
      } else if (container._x < container.x) {
        index++;
      }
    }
    switchSlide(index);
    autoPlay();
    //是否存在回调函数，并执行回调函数
    callback && typeof callback == 'object' && typeof callback.end === 'function' && callback.end();
  });
  //初始化
  function init() {
    swiperWrapper.style.width = length + "00%";
    swiperItems.forEach(function (item) {
      item.style.width = 100 / length + "%";
    });
    //初始化小圆点
    if (!pagination && swiperPagination) {
      swiperPagination.style.display = "none";
    }
    container.style.overflow = "hidden";
    container.style.position = "relative";
  }
  init();
  //切换函数
  function switchSlide(j, isTransition = true) {
    //index边界检测
    if (j < 0) {
      j = 0;
    } else if (j > length - 1) {
      j = length - 1;
    }

    let newLeft = -j * container.offsetWidth;
    if (isTransition) {
      swiperWrapper.style.transition = "all .5s";
    } else {
      swiperWrapper.style.transition = "none";
    }
    transformCSS(swiperWrapper, "translateX", newLeft);
    for (let i = 0; i < swiperDots.length; i++) {
      swiperDots[i].classList.remove("active");
    }
    if (swiperDots.length > 0) {
      swiperDots[j % len].classList.add('active');
    }

    index = j;
  }
  //定时器
  function autoPlay() {
    if (!auto) return;
    timer = setInterval(function () {
      index++;
      switchSlide(index);
    }, time);
  }
  autoPlay();

  //最后一张幻灯片时移动
  swiperWrapper.addEventListener("transitionend", function () {
    if (loop) {
      if (index === length - 1) {
        index = len - 1;
        switchSlide(index, false);
      }
    }
    //是否存在回调函数，并执行回调函数
    callback && typeof callback == 'object' && typeof callback.switched === 'function' && callback.switched();
  });
  //失去和获得焦点
  window.addEventListener("focus", function () {
    autoPlay();
  });
  window.addEventListener("blur", function () {
    clearInterval(timer);
  });
  //函数暴露
  this.switchSlide = switchSlide;
  this.index = function () {
    return index;
  }
}

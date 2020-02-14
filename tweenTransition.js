
(function (w) {

    function tweenTransition(node, style, init, end, duration, time, type = 'linear') {
        var tween = {
            linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            back: function (t, b, c, d, s) {
                if (s == undefined) s = 2;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            pinghua: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            }
        };

        var t = 0;
        var b = init;
        var c = end - init;
        var d = duration;
        /**
         * node.timer.left
         * node.timer.width
         * node.timer.rotate
         * @type {number}
         */
        //定时器对象属性的初始化
        if (node.timer === undefined) {
            node.timer = {};
        }
        node.timer[style] = setInterval(function () {
            if (t >= d) {
                clearInterval(node.timer[style]);
                return;
            }
            t += time;
            var res = tween[type](t, b, c, d);
            switch (style) {
                case 'width':
                case 'height':
                case 'left':
                case 'top':
                case 'right':
                case 'bottom':
                    node.style[style] = res + 'px';
                    break;
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    transformCSS(node, style, res);
                    break;

                case 'opacity':
                    node.style[style] = res;
                    break;

                default:
                    node.style[style] = res + 'px';
                    break;
            }
        }, time);
    }

    w.tweenTransition = tweenTransition;

})(window);
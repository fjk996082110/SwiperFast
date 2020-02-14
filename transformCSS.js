/*
 * @Author: your name
 * @Date: 2020-01-18 15:40:06
 * @LastEditTime : 2020-01-27 10:00:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ShangGuiGu\Demo\轮播图\translate测试\translateCSS.js
 * 
 * 
 * @示例:
 * translateCSS(swiperWrapper,'translateX',375)
 * translateCSS(swiperWrapper,'translateY')
 * @作用
 * 获取和设置元素的transform
 */

function transformCSS(node,style,value) {
    if(node.store===undefined){
        node.store={};
    }
    //设置
    if(arguments.length===3){
        //将当前的信息 保存在对象中
        node.store[style]=value;
        // {translateX: 300, rotate: 45}   =>  translateX(300px) rotate(45deg)
        let str='';
        for (const i in node.store) {
            switch (i) {
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    str+=`${i}(${node.store[i]}px)`;
                    break;
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                    str+=`${i}(${node.store[i]}deg)`;
                    break;
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    str+=`${i}(${node.store[i]})`;
                    break;

                default:
                    break;
            }
        }
        node.style.transform=str;

    };
    //读取
    if(arguments.length===2){
        if(node.store[style]===undefined){
            if(style.substr(0,5)==='scale'){
                return 1;
            }else{
                return 0;
            }
        }else{
            return node.store[style];
        }
    };
}

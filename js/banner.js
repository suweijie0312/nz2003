

// 渐隐渐现轮播图
// 修改透明度实现效果
// 可以使用 move运动函数   过渡都可以实现
class setOpacity {
    constructor(element) {
        this.ele = element;
        this.oUllis = element.querySelectorAll('ul>li');

        this.oUl = element.querySelector('ul');

        this.index = 0;
        this.time;
    }

    init() {
        this.autoLoop();
        this.inOut();
        this.setActive();
    }

    // 改变index索引数值函数
    // 参数:改变方式 : left --操作   right ++操作
    change(type) {
        // 当执行轮播显示切换时,让当前的轮播图片不显示,让下一个轮播图片显示
        this.oUllis[this.index].style.opacity = 0;
        // console.log(this.index)

        // 下一个图片: 有可能是 -- 有可能是 ++
        if (type === 'left') {
            this.index--;
          
        } else if (type === 'right') {
            this.index++;
        }

        // 对 index 执行判断
        // 4个标签,length就是4 最后一个索引是 3
        // 如果 超出 3 也就是 4 , 没有这个索引对应的标签
        // 返回第一个标签,索引是0
        if (this.index === this.oUllis.length) {
          
            this.index = 0;
          
        } else if (this.index === -1) {
            // 如果是小于第一个索引0,也就是-1
            // 到最后一个图片的索引,length-1
            this.index = this.oUllis.length - 1
        }


        // 让下一个轮播图片显示
        this.oUllis[this.index].style.opacity = 1;
        // console.log(this.index)

        this.setFocusStyle();
    }


    // 不用复制克隆li标签
    // 直接自动轮播
    autoLoop() {
        this.time = setInterval(() => {
            this.change('right');
        }, 3000);
    }


    setFocusStyle() {
        // 获取ol中所有的li
        const oA = this.ele.querySelectorAll('[name="olli"]');

        // 循环遍历
        oA.forEach((v, k) => {
            // 清除 class 中的 active
            v.className = '';
            if (k === this.index) { 
                // console.log(typeof(this.index))
                // 索引与index表示的索引相同
                // 添加 class 样式
                v.className = 'active';
            }
        })
    }


    // 鼠标移入停止,移出继续自动轮播
    inOut() {
        this.ele.addEventListener('mouseenter', () => {
            clearInterval(this.time);
        })

        this.ele.addEventListener('mouseleave', () => {
            this.autoLoop();
        })
    }


    // 左右切换
    // 定义了 change() 函数 只要传参正确参数,就可以执行正确的效果
    // 点左按钮,传参 left
    // 点右按钮,传参 right

    // 当前切换效果,是通过 css 过渡实现的
    // 没有调用定时器,也就不存在点击过快,同时执行多个定时器的情况
    // 因此不用防止点击过快

    // 点击焦点:
    //    让当前index对象的li,透明度是0
    //    获取当前点击标签 index属性的属性值 , 字符串---数值
    //    赋值给 index变量
    //    让新的index变量,对应的li标签透明度是1
    //    设定 焦点样式,执行函数

    setActive() {
        this.ele.addEventListener('click', e => {
            e = e || window.event;
            if (e.target.getAttribute('name') === 'left') {
                this.change('left');
            } else if (e.target.getAttribute('name') === 'right') {
                this.change('right');
            } else if (e.target.getAttribute('name') === 'olli') {
                // 1,让当前index对象的ul>li,透明度是0
                this.oUllis[this.index].style.opacity = 0;
                
                // 2,获取点击对象index属性值,赋值给index变量,类型是数值类型
                this.index = e.target.getAttribute('index')-0;
                // console.log(typeof(this.index));
                // 3,新的index对应的ul>li标签,透明度为1
                this.oUllis[this.index].style.opacity = 1;
                // 4,设定焦点样式
                this.setFocusStyle();
            }
        })
    }

    // 没有通过 move() 定时器执行程序
    // 不用防止点击过快,不用防止浏览器隐藏,程序执行抽风
}



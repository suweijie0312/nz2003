class SetZoom{
    constructor(element,imageArr){
        this.ele = element;
        this.arr = imageArr;
        this.show = element.querySelector('.show');
        this.mask = element.querySelector('.mask');
        this.list = element.querySelector('.list');
        this.lis = element.querySelectorAll('ul>li');
        this.glass = element.querySelector('.glass');
        this.img = element.querySelector('img')

        this.boxLeft =this.ele.offsetLeft;
        this.boxTop =this.ele.offsetTop;
        // 显示区域 边框线
        this.showBorderLeft =this.show.clientLeft;
        this.showBorderTop =this.show.clientTop;
        //  占位
        this.showWidth =this.show.clientWidth;
        this.showHeight = this.show.clientHeight;
        // 放大镜占位
        this.glassWidth = parseInt(getStyle(this.glass,'width'));
        this.glassHeight = parseInt(getStyle(this.glass,'height'));
        // 遮罩层占位
        this.maskWidth = parseInt(getStyle(this.mask,'width'));
        this.maskHeight = parseInt(getStyle(this.mask,'height'));

        this.BGIWidth = parseInt(getStyle(this.glass,'backgroundSize'));

    }
    init(){
        this.cR();      
        this.move();
        this.active();
        
    }
    // 鼠标移入,显示,遮盖层和放大镜
    // 鼠标移出,隐藏,遮盖层和放大镜
    cR(){
        this.ele.addEventListener('mouseenter',()=>{
            this.mask.style.display = 'block';
            this.glass.style.display = 'block';
        })
        this.ele.addEventListener('mouseleave',()=>{
            this.glass.style.display = 'none';
            this.mask.style.display = 'none';
        })
    }
    // 鼠标移入显示区域,添加拖拽效果
    // 鼠标移出显示区域,删除拖拽效果
    // 可以写在 inOut() 中 一起执行效果
    // 也可以写成独立的 事件效果
    move(){
        this.show.addEventListener('mousemove',(e)=>{
            //  获取鼠标的位置
            let x = e.clientX - this.boxLeft - this.showBorderLeft - this.maskWidth/2;
            let y = e.clientY - this.boxTop - this.showBorderTop - this.maskHeight/2;
            if(x < 0)x=0;
            if(y < 0)y=0;
            if(x > this.showWidth-this.maskWidth)x=this.showWidth-this.maskWidth;
            if(y > this.showHeight - this.maskHeight)y= this.showHeight - this.maskHeight;
            this.mask.style.top = y +'px';
            this.mask.style.left  = x + 'px';
            let bx  = this.BGIWidth * x / this.showWidth;
            let by  = this.BGIWidth * y / this.showHeight;
            this.glass.style.backgroundPosition = `-${bx}px -${by}px`;
         })
    }
    active(){
        this.list.addEventListener('click',(e)=>{
            e = e || window.event;
            if(e.target.tagName === 'IMG'){
             this.lis.forEach((v)=>{
                 v.className ='';
             })
             e.target.parentElement.className = 'active';
             let index = e.target.parentElement.getAttribute('index');
             this.img.setAttribute('src' , `./images/${this.arr[index].normal}`);
             this.glass.style.backgroundImage = `url('./images/${this.arr[index].big}')`;
            }
        })
    }
}
function getStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[attr];
    } else {
        return element.currentStyle[attr];
    }
}
class Fun{
        constructor(element){
            this.ele = element;
            this.oAs = document.querySelectorAll('.a2');
            this.oDivs = document.querySelectorAll('.box5');
        }
      fun1(){
          let that = this;
          this.ele.addEventListener('click',function(e){
             e = e || window.event;
             if(e.target.getAttribute('name') === 'nav_a'){
               that.oAs.forEach(function(value,key){
                   that.oDivs[key].className = 'box5';
               })
               that.oDivs[e.target.getAttribute('index')].className = 'box5 active';
             }
          })
      } 
    }
    
    
    document.querySelector('#ul1_a1').addEventListener('mouseenter',function(){
        $('.box4').css({display:'block'});
        $('.box5').parent().slideDown(1000);
        $('.box5').first().slideDown(1500);
    
      document.querySelectorAll('.box5').forEach(function(v,k){
        v.addEventListener('mouseleave',function(){
            $('.box5').first().slideUp(500);
            $('.box5').slideUp(500);
            $('.box5').parent().slideUp(1000);
            var time = window.setTimeout(function(){
            $('.box4').css({display:'none'})
            },800)
        })
      })
    })
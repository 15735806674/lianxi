$(function(){
    var clientH=$(window).height();
    window.onmousedown= function (e) {
        e.preventDefault();
    }
    window.onmousemove= function (e) {
        e.preventDefault();
    }
    var num=0;
    var flag=true;
    touch.on("body","swipeup","#fullpage",function(e){
        if(!flag){
            return;
        }
        num++;
        if(num==$("section").length){
            num=$("section").length-1;
            return;
        }
        $("#fullpage").css({
            marginTop:-num*clientH
        })
        flag=false;
    })
    touch.on("body","swipedown","#fullpage",function(e){
        if(!flag){
            return;
        }
        num--;
        if(num==-1){
            num=0;
            return;
        }
        $("#fullpage").css({
            marginTop:-num*clientH
        })
        flag=false;
    })
$("#fullpage")[0].addEventListener("webkitTransitionEnd",function(){
    flag=true;
    $("section").each(function(){
        flag=true;
        $("section").each(function(index,obj){
          if(index==0){
              return;
          }
          if(index==num){
              $(obj).find(".title").css({
                  transform:"translate(0,0)",
                  opacity:1
              })
              $(obj).find(".dpic").css({
                  transform:"translate(0,0)",
                  opacity:1
              })
          }else{
              $(obj).find(".title").css({
                  transform:"translate(-80px,0)",
                  opacity:0
              })
              $(obj).find(".dpic").css({
                  transform:"translate(80px,0)",
                  opacity:0
              })
          }
        })
    })
})

    // 检测屏幕

    $(window).resize(function(){

        $("#fullpage").css({
            marginTop:-num*clientH
        })
        if($(window).width() > 1000){
            $(".menu a").css({
                animation:"none"
            })
            $(".menu-ahead,.menu-forward").css({
                transform:"translate(0,0) rotate(0)"
            })
            flag= true;
        }
    })

    // 菜单响应式的处理
    var flag2=true;
    $(".menu-option").click(function(){
        if(flag2){
            // 按钮
        $(".menu-ahead").css({
            transform:" translate(0,6px) rotate(45deg)  ",
            transition:"transform 0.5s linear"
        })
        $(".menu-forward").css({
            transform:"translate(0,-6px) rotate(-45deg)",
            transition:"transform 0.5s linear"
        })
            // 菜单
            $(".menu a").each(function(index,obj){
                $(obj).css({
                    opacity:0,
                    animation:"menu 0.3s linear forwards "+0.2*index+"s"
                })
            })
            flag2=false;
        }else{
            // 按钮
            $(".menu-ahead").css({
                transform:" translate(0,0) rotate(0deg)  ",
                transition:"transform 0.5s linear"
            })
            $(".menu-forward").css({
                transform:"translate(0,0) rotate(0deg)",
                transition:"transform 0.5s linear"
            })
            $(".menu a").each(function(index,obj){
                $(obj).css({
                    opacity:1,
                    animation:"menu1 0.3s linear forwards "+(1.2-0.2*index)+"s"
                })
            })
            flag2=true;
        }

    })

    // 侧边跳转
    var height=$("section").height();
    $(".floor li").each(function(index,obj){
        $(obj).click(function(){
              $(".floor li").removeClass("active").eq(index).addClass("active");
          $("section").css("display","none").eq(index).css("display","block")
        })
    })
    // $('#fullpage').fullpage({
    //     "navigation":true
    // })
})


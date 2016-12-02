$(function(){
    var clienH = $(window).height();
    var num = 0;
    var flag = true;
    touch.on("body","swipeup swipedown","#fullpage",function(e){
        if(e.type == "swipeup"){
            if(!flag){
                return;
            }
            num++;
            if(num==$("section").length){
                num=$("section").length-1;
                return;
            }
            $("#fullpage").css({
                marginTop:-num*clienH
            })
            flag = false;
        }else if(e.type == "swipedown"){
            if(!flag){
                return;
            }
            num--;
            if(num==-1){
                num=0;
                return;
            }
            $("#fullpage").css({
                marginTop:-num*clienH
            })
            flag = false;
        }
    })
    $("#fullpage")[0].addEventListener("webkitTransitionEnd",function(){
        flag = true;
    })
})

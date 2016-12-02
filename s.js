window.onload=function(){
    var scene=document.querySelector(".scene");
    var room=document.querySelector(".room");
    // 屏幕的宽高
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    // 设置基准轴
    room.style.transformOrigin="center center "+clientW/2+"px";
    //最后一面
    var lastPanel=document.querySelector(".panel:last-child");
    lastPanel.style.transform="translate3d(0,0,"+clientW+"px) rotated(0,1,0,180deg)";
    // 天花板   地板
    var floor=document.querySelector(".panel:first-child");
    var ceil=document.querySelector(".panel:nth-child(5)");
    var chuanghu=document.querySelector(".panel:nth-child(3)");
    chuanghu.style.transform="translate3d(0,0,"+clientW+"px)"
    floor.style.width=ceil.style.width=floor.style.height=ceil.style.height=clientW+"px";
    ceil.style.top=-(clientW-clientH)+"px";
    // 执行
    lastPanel.onclick=function(){
        room.style.transition="transform 2s ease";
        room.style.transform="translateZ(-500px) rotate3d(0,1,0,180deg)"
    }
    var angle1=180,angle=0;
    var flag1=true;
    document.onmousedown=function (e) {
        flag1=false;
        var startX=e.clientX;
        var startY=e.clientY;
        document.onmousemove=function (e) {
            flag1=true;
            room.style.transition="none";
            var moveX=e.clientX;
            var moveY=e.clientY;
            angle=Math.abs((moveX-startX))>Math.abs((moveY-startY))?-(moveX-startX):-(moveY-startY);
            room.style.transform="translateZ(-300px) rotate3d(0,1,0,"+(angle1+angle)+"deg)";
            e.preventDefault();
        };


        document.onmouseup=function () {

            document.onmousemove=null;
            document.onmouseup=null;
            if (!flag1){
                return
            }
            if (flag1){
                angle1+=angle;
                flag1=false;
            }
        };
        e.preventDefault();
    };
    var flag=true;
    var panels=document.querySelectorAll(".panel");
    for (var i=0;i<panels.length;i++){
        if ( i<panels.length-1){
            panels[i].ondblclick=function () {
                room.style.transition="transform 2s ease";
                if (flag){
                    room.style.transform="translateZ(0) rotate3d(0,1,0,"+(angle1)+"deg)";
                    flag=false;
                }else {
                    room.style.transform="translateZ(-300px) rotate3d(0,1,0,"+(angle1)+"deg)";
                    flag=true;
                }
            }
        }
    }
}

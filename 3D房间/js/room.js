window.onload =function(){
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var scene=document.querySelector(".scene");
    var room=document.querySelector(".room");
    var floor=document.querySelector(".panle:first-child");
    var ceil=document.querySelector(".panle:nth-child(4)");
    floor.style.width=ceil.style.width=floor.style.height=ceil.style.height=clientW+"px";
    ceil.style.top=-(clientW-clientH)+"px";
    var lastpanle=document.querySelector(".panle:last-child");
    room.style.transformOrigin="center center "+clientW/2+"px";
    lastpanle.style.transform="translate3d(0,0,"+clientW+"px)";
    lastpanle.onclick=function(){
        room.style.transition="transform 3s";
        room.style.transform="translate3d(0,0,-600px) rotateY(0deg)";
    }
    var angle=0,angle1=180;

    var flag1=true;
   document.onmousedown=function(e){
       flag1=false;
        var startx=e.clientX;
        var starty=e.clientY;
       document.onmousemove=function(e){
           flag1=true;
           room.style.transition="none";
           var cx=e.clientX;
            var cy=e.clientY;
             angle=Math.abs(cx-startx)>Math.abs(cy-starty)?-
                 (cx-startx):-(cy-starty);
            room.style.transform="translateZ(-600px) rotate3d(0,1,0,"+angle+"deg)";
             e.preventDefault();
        }
        document.onmouseup=function(){

            document.onmousemove=null;
            document.onmouseup=null;
            if(!flag1){
                return;
            }if(flag1){
                angle1+=angle;
                flag1=false;
            }

        }
        e.preventDefault();
    }
    var panles=document.getElementsByClassName("panle");
    var flag=true;
    for(var i=0;i<panles.length;i++){
        if(i<panles.length-1){
        panles[i].ondblclick=function(){
            room.style.transition="transform 2s ease";
            if(flag){
          room.style.transform="translateZ(0) rotate3d(0,1,0,"+angle +"deg)";
                flag=false;
            }else{
                room.style.transform="translateZ(-600px) rotate3d(0,1,0,"+angle+"deg)";
                flag=true;
            }
          }
        }
    }

}
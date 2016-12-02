function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.strokeStyle="#fff";
    this.fillStyle="#fff";
    this.lineWidth=1;
    this.history=[];
    this.biannum=5;
    this.jiaonum=20;
}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.fillStyle=this.fillStyle;
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx=e.offsetX;
            var starty=e.offsetY;

            that.copy.onmousemove=function(e){
                that.init();
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0 );
                }
                that.cobj.beginPath();
                that[that.type](startx,starty,endx,endy);
                that.cobj[that.style]();
            },
            that.copy.onmouseup=function(){
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
    },
   rect:function(x,y,x1,y1){
        this.cobj.rect(x,y,x1-x,y1-y);
   },
   arc:function(x,y,x1,y1){
       var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
      this.cobj.arc(x,y,r,0,2*Math.PI) ;
   },
    bian:function(x,y,x1,y1){
       var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var angle=360/this.biannum*Math.PI/180;
        for(var i=0;i<this.biannum;i++){
            this.cobj.lineTo(Math.cos(i*angle)*r+x,Math.sin(i*angle)*r+y);
        }
        this.cobj.closePath();
    },
    jiao:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var angle=360/(this.jiaonum*2)*Math.PI/180;
        var r1=r/3;
        for(var i=0;i<this.jiaonum*2;i++){
            if(i%2==0){
            this.cobj.lineTo(Math.cos(i*angle)*r+x,Math.sin(i*angle)*r+y);
            }else{
                this.cobj.lineTo(Math.cos(i*angle)*r1+x,Math.sin(i*angle)*r1+y);
            }
        }
        this.cobj.closePath();
    },
    pen:function(){
        var that=this;
        this.copy.onmousedown=function(e){
             var startx=e.offsetX;
            var starty=e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function (e) {
                that.init();
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                      that.cobj.putImageData(that.history[that.history.length-1],0,0);
         }
         that.cobj.lineTo(endx,endy);
                that.cobj.stroke();
            }
                that.copy.onmouseup=function(){
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                    that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                }
    }

   }
}
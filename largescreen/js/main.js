/**
 * Created by tom.chang on 2015/3/10.
 */
(function(){

})();


//var angle;
//12列*10行格子
var canvas;//画布
var StepDfd;
var StopSwitch=false;
var stage;//createjs 上下文对象
var container;//自定义区域容器 配合遮罩mask场景使用
var people=[];//存放画布上的每个人
var peoplePosArr=[];//记录每个人的index以便随后随机打乱 生成随即动画
//var hideArr=[0,1,2,3,4,5,15,14,13,12,11,10,16, 17, 18, 19, 28, 29, 30, 31, 32, 33, 46, 47, 48, 63, 128, 143, 144, 145, 158, 159, 160, 161, 162, 163, 175, 174, 173, 172];
var hideArr=[0,1,2,11,10,9,12,23, 22, 35,24,60,71,72,82,83,84,85,95,94,93];//这些位置上不放头像可以形成近似气球状
var total_show=96;//mc的总数量 头像
var total_col=12;//横排mc的数量
var max=110;
var _scaleAll=scaleAll();
var cur_time;
var tick_time;
var photoFloder="img/kenan/";
var throttle=500;
/*
//概率随机函数
var scaleRange=[0.6,0.8,1,1.2];
var targetPdf = [0.1,0.2,0.4,0.3];
var targetCdf = pdf2cdf(targetPdf);*/
var cur_index=0;
var hidePeopleArr=[];
//气球容器宽度
var mcWidth=60;
//头像大小
var imgWidth=mcWidth-10;
var anim_counts=0;
var COUNT=0;
var mess_comet_interval=1000;
var people_comet_interval=2000;
var cur_people_id=null;
var cur_mess_id=window.localStorage.getItem("messId")||null;
var comet_mess_lock=true;
var comet_people_lock=true;
var messList=$(".mess-list");
var messPos=0;
var messTmpl=tmpl("messTmpl");
var isScrollArr=[false,false];
var messListHeight=$(".mess-list-box").height();
var messBoxHeight=140;
var isMessScroll=false;
var scrollNow=_scrollNow();
var comingLock=false;
//初始化所有有效位置
var indexArr=(function(mcArr,arr){
    for(var i=0;i<mcArr;i++){
        if(hideArr.indexOf(i)==-1){
            arr.push(i);
        }
    }
    arr.sort(function(a,b){
        return Math.random()>0.5
    });
    total_show=arr.length;
    return arr
})(total_show,[]);
//var h:int=
//初始化画布
function init() {
    //examples.showDistractor();
    //wait for the image to load
    var mask=new createjs.Shape();
    comet_mess_lock=false;
    comet_people_lock=false;
    canvas = document.getElementById("mainCanvas");
    $(canvas).width($(canvas).parent().width());
    $(canvas).prop("width",$(canvas).width());
    $(canvas).prop("height",$("body").height()-100);
    stage = new createjs.Stage(canvas);
    container = new createjs.Container().set({name: "container"});
    container.x=mcWidth/*(canvas.width-total_col*mcWidth)/2+mcWidth/2*/;
    container.y=mcWidth;
    mask.graphics = new createjs.Graphics().beginFill("blue").rect(0, 0, canvas.width,canvas.height-50/*(max/total_col)*mcWidth+mcWidth*2*/);
//    console.log(canvas.width,(max/total_col)*mcWidth+mcWidth*2)
    container.mask=mask;
    stage.addChild(container);
    /*
     for(var i=0;i<100;i++){
     var img = new Image();
     var x=getRandom(area.min.x,area.max.x),y=getRandom(area.min.y,area.max.y);
     img.onload = proxy(handleImageLoad,img,x,y);
     img.src = "../_assets/art/apple.jpg";
     angle = 0;
     }*/

    createjs.Ticker.addEventListener("tick", tick);
}
//test
/*setInterval(function(){
    //&.p
    if(people.length<indexArr.length){
        addOne();
    }
},10)*/
//增加一个头像
var addChain;
function addPromise(fn){
   return addChain.then(fn)
};
function addOne(p){
    if(COUNT>=max){return}
    var i= getCurIndex(),dfd= $.Deferred();
    if(hideArr.indexOf(i)==-1){
        var img = new Image();
        var x=i%total_col*mcWidth+getRandom(-10,10),y=Math.floor(i/total_col)*mcWidth+getRandom(-10,10);
        if(p&&p.headimgurl){
            comingLock=true;
            COUNT++;
            //console.log("locked")
            img.src = photoFloder+"("+Math.max(COUNT%129,1)+").jpg";
        }
        img.onload = function(){
            var handle=proxy(handleImageLoad,img,x,y,i,dfd);
            if(!addChain||addChain.state()=="resolved"){
                handle();
            }else if(addChain.state()=="pending"){
                addPromise(handle);
            }
            addChain= dfd;
        };//proxy(handleImageLoad,img,x,y,i,dfd);
    }
    //}
}
//获取下一个头像数组游标
function getCurIndex(){
    var index= indexArr[cur_index];
    cur_index=cur_index+1==indexArr.length?0:cur_index+1;
    return index;
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
//头像添加舞台
function handleImageLoad(img,x,y,i,dfd) {
    var shape = new createjs.Shape();
    var bmp = new createjs.Bitmap(img);
    var width=imgWidth;
//    var scale=width/img.width;
//    var mtx = new createjs.Matrix2D().scale(scale,scale);
//    bmp.graphics.beginBitmapFill(img, "no-repeat",mtx).setStrokeStyle(2).beginStroke("white").drawCircle(0, 0, mcWidth);
    var bg=new createjs.Shape(new createjs.Graphics().beginFill("rgba(255,255,255,0.3)").drawCircle(0, 0, imgWidth/2+2));
    var child = new createjs.Container();
    var line=new createjs.Shape(new createjs.Graphics().beginStroke("hsl(" + (Math.random() * 60 + getRandom(120,360) | 0) + ",100%,50%)").
        moveTo(canvas.width/2-x,canvas.height-y-container.y-50).
        bezierCurveTo((canvas.width/2-x)*0.7,(canvas.height-y-container.y-50) ,
        (canvas.width/2-x)*0.3, (canvas.height-y-container.y-50)*0.6, 0,0).endStroke());
//            console.log(x,y)
    shape.graphics = new createjs.Graphics().drawCircle(0, 0, width/2).endStroke();
    shape.x=width/2-imgWidth/2;
    shape.y=width/2-imgWidth/2;
    bmp.mask=shape;
    bmp.x=0-imgWidth/2;
    bmp.y=0-imgWidth/2;
    bmp.scaleX=bmp.scaleY=width/img.width;
    child.alpha=0;
    child.index=i;
    child.width=child.height=width;
    child.x=x;
    child.y=y;
    child.addChild(bg);
    child.addChild(bmp);
//    child.scaleX=child.scaleY=scaleRange[discreteSampling(targetCdf)];
    people.push(child);
    //peoplePosArr.push(i);
    child.addChildAt(line,0);
    animOne(child,null,null,dfd);
    container.addChild(child);
    //stage.addChild(shape2)
    stage.update();
    /*return

    //find canvas and load images, wait for last image to load
    var  star;
    // create a new stage and point it at our canvas:

    // masks can only be shapes.
    star = new createjs.Shape();
    // the mask's position will be relative to the parent of its target:
    star.x = img.width / 2;
    star.y = img.height / 2;
    // only the drawPolyStar call is needed for the mask to work:
    //star.graphics.beginStroke("#FF0").setStrokeStyle(5).drawPolyStar(0, 0, img.height / 2 - 15, 5, 0.6).closePath();

    star.graphics.beginStroke("#FF0").setStrokeStyle(5).drawCircle(40, 40, 40).closePath();
    var bg = new createjs.Bitmap(img);
    // blur and desaturate the background image:
    bg.filters = [new createjs.BlurFilter(2, 2, 2), new createjs.ColorMatrixFilter(new createjs.ColorMatrix(0, 0, -100, 0))];
    bg.cache(0, 0, img.width, img.height);
    stage.addChild(bg);

    var bmp = new createjs.Bitmap(img);
    stage.addChild(bmp);
    bmp.mask = star;

    // note that the shape can be used in the display list as well if you'd like, or
    // we can reuse the Graphics instance in another shape if we'd like to transform it differently.
    stage.addChild(star);*/
}

//每一帧执行的tick脚本
function tick(event) {
    /*if(container.x>100||container.x<-100){
     step=-step;
     }
     container.x+=step;*/
    var now=+new Date;
    if(!tick_time){
        tick_time=now;
    }
    //每隔100ms放大缩小头像
    if(now-tick_time>throttle&&!comingLock){
        if(hidePeopleArr.length>=max-total_show){
            switchShow();
            //_scaleAll()
        }
        tick_time=now;
    }
    stage.update(event);
    // angle += 0.025;
}
//单个进场动画 因为屏幕上总的显示数是固定的，所以进场就有退场，linkOne为需要隐藏的关联元素，
function animOne(target,linkOne,onlyShow,dfd){
    if(people.length>max){return;}
    var _linkOne=linkOne,x=target.x,y=target.y,animTo;
    if(people.length>total_show){
        _linkOne=getSamePos(target);
    }
    //console.log(_linkOne)
    if(_linkOne){
        createjs.Tween.get(_linkOne)
            .to({alpha: 0}, throttle*0.5,createjs.Ease.sineOut)
            .call(function(){
            });
    }

    if(onlyShow){
        animTo={alpha: 1};
    }else{
        target.x=canvas.width/2;
        target.y=canvas.height;
        animTo={alpha: 1,x:x,y:y};
    }
    if(onlyShow){
        console.log("被显示的----------"+target.index)
    }
    createjs.Tween.get(target)
        .to(animTo, throttle*2,createjs.Ease.cubicOut)
        .call(function(){
//            if(line&&(people.length<max||people.length%2==0)){
//            }
            var index=hidePeopleArr.indexOf(target);
            comingLock=false;
            if(index>-1){
               hidePeopleArr.splice(index,1)
            }
           if(_linkOne){
               hidePeopleArr.push(_linkOne)
           }
            //console.log(dfd)
            anim_counts++;
            if(typeof dfd=="object"&&typeof dfd.resolve=="function"){
                dfd.resolve();
            }
            //console.log("unlock")
            if(!linkOne){
              // animLikeBall(target);
            }
        });
}

function animLikeBall(target){
    if(Math.random()>0.5){
        var mx,my,x1,y1,x2,y2;
        mx=Math.random()>0.5?getRandom(2,10):getRandom(-10,-2);
        my=-mx;
        x1=target.x+mx;
        y1=target.y+my;
        x2=target.x-mx;
        y2=target.y-my;
        createjs.Tween.get(target).to({x:x1,y:y1},500).to({x:target.x,y:target.y},500).to({x:x2,y:y2},500).to({x:target.x,y:target.y},500);

    }
    setTimeout(function(){
        animLikeBall(target);
    },2000)
}

function getSamePos(target){
    /*if(target.linkOne){
        return target.linkOne;
    }*/
    for(var i= 0,l=people.length;i<l;i++){
        if(people[i]!=target&&people[i].index==target.index&&people[i].alpha==1){
//            target.linkOne=people[i];
//            people[i].linkOne=target;
            return people[i];
        }
    }
}

//切换显示
function switchShow(){
    if(StopSwitch){
        return true;
    }
    StopSwitch=true;
    if(anim_counts!=0&&anim_counts%10==0){
        hidePeopleArr.sort(function(){
            return Math.random()>0.5;
        })
    }
    var counts=getRandom(4,8);
    var oneDfd,handle,dfdArr=[];
    for(var i= 0;i<counts;i++){
        if(hidePeopleArr[i]&&hidePeopleArr[i].alpha==0){
            oneDfd= $.Deferred();
            handle= $.proxy(animOne,null,hidePeopleArr[i],null,true,oneDfd);
            console.log("要显示的---"+hidePeopleArr[i].index)
                handle();
            dfdArr.push(oneDfd)
        }
        $.when(dfdArr).then(function(){
            StopSwitch=false;
        })
    }
    //hidePeopleArr.splice(0,counts);
    //hidePeopleArr=hidePeopleArr.concat(hidePeopleArr.splice(0,counts))
   // hidePeopleArr.push();
}
function scaleAll(){
    var isBack=false,_o,big,small;
    return function(){
        if(!isBack){
            _o=scaleSome(5,peoplePosArr,10,16);
            big=_o.big;
            small=_o.small;
            for(var i=0;i<big.length;i++){
                people[big[i]].scaleX=people[big[i]].scaleY=1.3
            }
            /* for(var i=0;i<small.length;i++){
             people[small[i]].scaleX=people[small[i]].scaleY=0.7
             }*/
            isBack=true;
        }else{
            for(var i=0;i<big.length;i++){
                people[big[i]].scaleX=people[big[i]].scaleY=1
            }
            for(var i=0;i<small.length;i++){
                people[small[i]].scaleX=people[small[i]].scaleY=1
            }
            isBack=false;
        }
    }
}
function scaleSome(num,posArr,row,column){
    var big=[],small=[],p=posArr.slice(),one,_row,_col,tempArr,index;
    for(var i=0;i<num;i++){
        one= p.splice(getRandom(0,p.length-1),1)[0];
        big.push(getMcByIndex(one,posArr));
        _col=one%column;
        _row=Math.floor(one/column);
        tempArr=getNearBy(_row,_col,row,column);
        for(var j= 0,l=tempArr.length;j<l;j++){
            index=getMcByIndex(tempArr[j],posArr);
            if(index!=-1){
                small.push(index/*people[index]*/);
                p.splice(getMcByIndex(index,p),1);
            }
        }
    }
    return {big:big,small:small};
}
function getMcByIndex(index,p){
    for(var i= 0,l= p.length;i<l;i++){
        if(p[i]==index){
            return i
        }
    }
    return -1
}
function getNearBy(row,col,rows,cols){
    var arr=[];
    if(col-1>=0){
        arr.push(row*cols+col-1)
        //arr.push({row:row-1,col:col})
    }
    if(col+1<=cols-1){
        arr.push(row*cols+col+1)
        // arr.push({row:row,col:col})
    }
    if(row-1>=0){
        arr.push((col-1)*rows+col)
        //arr.push({row:row-1,col:col-1})
    }
    if(row+1<=rows-1){
        arr.push((col+1)*rows+col)
        //arr.push({row:row+1,col:col+1})
    }
    return arr;
}
function proxy(fc){
    var args=[].slice.call(arguments,1);
    return function(){
        fc.apply(null,args);
    }
}
//create by Milo  http://www.cnblogs.com/miloyip/archive/2010/04/21/1717109.html
function pdf2cdf(pdf) {
    var cdf = pdf.slice();

    for (var i = 1; i < cdf.length - 1; i++)
        cdf[i] += cdf[i - 1];
    // Force set last cdf to 1, preventing floating-point summing error in the loop.
    cdf[cdf.length - 1] = 1;

    return cdf;
}
function discreteSampling(cdf) {
    var x = Math.random();
    for (var i in cdf)
        if (x < cdf[i])
            return i;

    return -1; // should never runs here, assuming last element in cdf is 1
}
//新信息
function addMess(body,data,listIndex){
    cur_time=+new Date/1000;
    if(data&&data.mess_time){
        //显示时间
        data.ctime=formatTime(cur_time,data.mess_time);
    }
//    data.mess=Math.random();
//    body.append(messTmpl(data));
    scrollList(body,listIndex,messTmpl(data));
}
//to backend
//推送新签到

setInterval(function(){
    if(comet_people_lock){return}
    comet_people_lock=true;
    var testData={"result":"true","list":[{"id":"0","nickname":"vion","headimgurl":"img/Penguins.jpg","sign_time":"1425982011086"},{"nickname":"vion","headimgurl":"img/Penguins.jpg","sign_time":"1425982011086"}]}
/*
    $.post(app.getPeopleUrl,{id:cur_people_id},function(data){
*/
    setTimeout(function(){
        var data=/*JSON.parse(data)*/testData;
        comet_people_lock=false;
        if(data.result+""=="true"){
            for(var i= 0,l=data.list.length;i<l;i++){
                addOne(data.list[i]);
            }
            if(l>0){
                cur_people_id=data.list[l-1].id;
            }
        }
    },100)
/*
    })
*/
},people_comet_interval);
//推送消息

setInterval(function(){
    if(comet_mess_lock){return}
    comet_mess_lock=true;
    //coding.net演示平台不支持ajax 改写
    var testData={"result":"true","list":[{"id":"11","headimgurl":"img/Penguins.jpg","nickname":"兰子","mess_time":"1426822863","mess":"where you go"},{"id":"11","headimgurl":"img/Koala.jpg","nickname":"柯南","mess_time":"1426822863","mess":"i found the truth"}]};
/*
    $.post(app.getMess,{id:cur_mess_id},function(data){
*/
    setTimeout(function(){
        var data=/*JSON.parse(data)*/testData;
        comet_mess_lock=false;
        if(data.result+""=="true"){
            var body;
            for(var i= 0,l=data.list.length;i<l;i++){
                //addOne(data.list[i]);
                if(messPos==0){
                    body=messList.eq(0);
                    messPos=1;
                }else{
                    body=messList.eq(1);
                    messPos=0;
                }
                data.list[i].headimgurl=photoFloder+"("+getRandom(1,130)+").jpg";//for test
                addMess(body,data.list[i],messPos==0?1:0);
            }
            if(l>0){
                cur_mess_id=data.list[l-1].id;
                window.localStorage.setItem("messId",cur_mess_id)
            }
        }
    },500)
/*
    })
*/
},mess_comet_interval);

setInterval(function(){
   // refreshList();
},30000);

function formatTime(now,mess_time){
   var delta=now-mess_time;
   if(delta<10){
       return "刚刚";
   }else if(delta<30){
       return "三十秒前";
   }else if(delta<60){
       return "一分钟前"
   }else if(delta<120){
       return "两分钟前";
   }else if(delta<300){
       return "五分钟前";
   }else if(delta<600){
       return "十分钟前";
   }else if(delta<1800){
       return "三十分钟前";
   }else{
       return "一小时前";
   }
}

function refreshList(){
    var oneList;
    for(var j= 0,l=messList.length;j<l;j++){
        oneList=messList.eq(j).find("li");
        if(oneList.length>15){
            oneList.filter(function(item,index){return index<14}).remove();
           // oneList.filter(":gt(15)").remove();
        }
    }
    var timeList=messList.find(".time"),now=+new Date/1000,$li;
     for(var i= 0,l=timeList.length;i<l;i++){
         $li=timeList.eq(i);
         $li.html(formatTime(now,$li.data("time")))
     }
}
//自动滚动
function scrollList(body,listIndex,data){
    if(!isScrollArr[listIndex]){
        isScrollArr[listIndex]=true;
        /*    if(body.height()>messListHeight){
         scrollNow(body,data);
         isScrollArr[listIndex]=true;
         }*/
    }
    scrollNow(body,data);
}
function _scrollNow(){
    var deferList=[],isMoving=false;
    function scroll(body,data){
        isMoving=true;
         var top=body.data("top");
         if(!top){
          top=0;
         }
        body.append(data);
        if(body.height()>messListHeight){
            body.data("isScroll",true);
            body.data("top",top+84);
            body.animateNow({translate3d:"0,-"+(top+84)+"px,0"},1000,function(){
                var next=deferList.shift();
                isMoving=false;
                if(next){
                    next();
                }
            });
        }else{
            isMoving=false
        }
      /*  setTimeout(function(){
            var next=deferList.shift();
            isMoving=false;
            if(next){
                next();
            }
        },1000);*/

    }
    function addDeferList(cb){
        deferList.push(cb);
    }
    return function(body,data){
        if(!isMoving/*||!body.data("isScroll")*/){
            scroll(body,data);
        }else{
            addDeferList(scroll.bind(null,body,data));
        }
    }
}
$(window).on("keypress",function(e){
     if(e.keyCode==32){
        $(canvas).toggleClass("hidden");
     }
})
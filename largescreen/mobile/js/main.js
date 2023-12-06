$(document).ready(function(){
    /*判断为安卓，则移动留言框*/
    if(window.navigator.userAgent.match(/linux|android/i)!=null){
        window.onresize=function() {
            if (window.innerHeight < 400) {
                $(".logo").css("top","-50%");
                $(".content-box").css("top","-52%");
//                $(".submit-btn").css("bottom","-50%");
            }else{
//                $(".submit-btn").css("bottom","6%");
                $(".logo").css("top","10%");
                $(".content-box").css("top","0%")
            }
        };
    }

    $(".finger").click(function(e){
            console.log("扫描指纹签到");
            $(".finger").animate({opacity:1},500,"ease",function(){
                $(".post-box").show();
                $(".post-msg").html("签到中，请稍后...")
            });
            $(".post-msg").html("签到成功，即将进入“我要大声说”");
            /*提示“签到成功”，停留1.6秒之后，进入留言区*/
            setTimeout(
                function(){
                    $(".content-box").animate({left:"-100%"},800,"cubic-bezier(.45,0,.22,.92)",function()
                    {
                        $(".print").css("display","none");
                        /*清空提示 隐藏提示框*/
                        setTimeout(function(){
                            $(".post-msg").html("");
                            $(".post-box").hide();
                        },600);
                    });
                },1000
            );
          /*  $.ajax({
                type:"POST",
                url:app.printUrl,*//*签到php*//*
                success:function(data){
                    *//*判断是否签到成功*//*
                    if(data.result+""=="true"){  *//*false=fail true=successed*//*
                        $(".post-msg").html("签到成功，即将进入“新年祝福区”");
                        *//*提示“签到成功”，停留1.6秒之后，进入留言区*//*
                        setTimeout(
                            function(){
                                $(".content-box").animate({left:"-100%"},800,"cubic-bezier(.45,0,.22,.92)",function()
                                {
                                    $(".print").css("display","none");
                                    *//*清空提示 隐藏提示框*//*
                                    setTimeout(function(){
                                        $(".post-msg").html("");
                                        $(".post-box").hide();
                                    },600);
                                });
                            },1000
                        );
                    }else{
                        $(".post-msg").html("签到出错，请重新签到！");
                        *//*出错提示，停留1.6秒之后消失隐藏，用户可重新签到*//*
                        setTimeout(
                            function () {
                                $(".post-msg").html("")
                                $(".post-box").hide();
                            },1600
                        );
                    }
                },
                error:function(){
                    $(".post-msg").html("网络未知错误,请重新签到！")
                    //出错提示，停留1.6秒之后消失隐藏，用户可重新签到
                    setTimeout(
                        function () {
                            $(".post-msg").html("")
                            $(".post-box").hide();
                        },1600
                    );

                    *//*提示“签到成功”，停留1.6秒之后，进入留言区*//*
                 *//*   $(".post-msg").html("签到成功，即将进入“新年祝福区”");
                    setTimeout(
                        function(){
                            $(".content-box").animate({left:"-100%"},800,"cubic-bezier(.45,0,.22,.92)",function()
                            {
                                $(".print").css("display","none");
                                *//**//*清空提示 隐藏提示框*//**//*
                                setTimeout(function(){
                                    $(".post-msg").html("");
                                    $(".post-box").hide();
                                },600);
                            })
                        },1000
                    );*//*

                },
                dataType:"json"
                }
            );*/
        }
    );
    /*判断留言文字长度*/
    $(".main").height(window.innerHeight);/*安卓输入框问题*/
    $("#textInput").on("input",function(e){
        var curText=$("#textInput").val();
        var n= 0,curLen=0;
        var maxNum=100;
        for (var i = 0; i<curText.length; i++) {
            var leg = curText.charCodeAt(i);//ASCII码
            if (leg > 255) {//大于255的都是中文
                n += 2;//如果是中文就是2个字节
            } else {
                n += 1;//英文，不多说了
            }
            curLen+=1;
            if(n/2>=maxNum){
                var num=$("#textInput").val().substr(0,curLen);
                $("#textInput").val(num);
                console.log("超过字数限制，多出的字将被截断！" );
                $(".countTips").animate("flash",800,"ease");
                break;
            }
        }
        if(n/2<=maxNum)
        {
            $("#textCount").text(Math.ceil(maxNum-n/2));
        }
    });

    /*留言板“提交”按钮 点击事件*/
    $(".submit-btn").click(function(e){
        console.log("送上祝福")
        var isSubmit=false;
        if($("#textInput").val().length!=0&&isSubmit!=true){

            /*显示数据发送提示框*/
            $(".post-box").show();
            $(".post-msg").html("正在提交祝福，请稍后...");
            isSubmit=true;
            /*发送留言数据*/
            $.ajax({
                type:"POST",
                dataType:"json",
                url:app.sendMessUrl,/*提交留言php*/
                data:"msg="+$("#textInput").val(),
                success:function(data){
                    /*判断是否提交成功*/
                    if(data.result+""=="true"){  /*0=fail 1=successed*/
                        $(".post-msg").html("提交成功！");
                        isSubmit=false;
                        setTimeout(
                            function(){
                                $("#textInput").val("");
                                $(".post-msg").html("")
                                $(".post-box").hide();
                            },1600
                        );

                    }else{
                        $(".post-msg").html("提交错误，请重新提交！")
                        setTimeout(
                            function () {
                                $(".post-msg").html("")
                                $(".post-box").hide();
                            },1600
                        );
                    }
                },
                error:function(){
                    $(".post-msg").html("网络未知错误,请重新提交！");
                    /*出错提示，停留1.6秒之后消失隐藏，用户可重新提交留言*/
                    setTimeout(
                         function () {
                             $(".post-msg").html("");
                             $(".post-box").hide();
                         },1600
                     );
                }
            });
            console.log(isSubmit);
        }else{
            alert("请输入你的祝福语！");
        }
    });
});



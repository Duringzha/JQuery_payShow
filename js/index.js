/**
 * Created by Administrator on 2015/4/15.
 */
$(function(){

    //获取视频元素
    var myVideo = document.getElementById('myVideo')//获取video元素
        ,tol
        ,currentTime;

    //获取屏幕宽高
    var winHight = $(window).height();
    var winWidth = $(window).width();
    $(".page").css({'height':winHight});

    function videoStop(){
        if(myVideo.played){
            myVideo.pause();
            $("#videoStart").show();
        }
    }

    function pageUp(){
        $(".mainContent").stop(true,true).animate({top : "-=" + winHight  + "px"},700);
    }
    function pageDown(){
        $(".mainContent").stop(true,true).animate({top : "+=" + winHight  + "px"},700);
    }

    //键盘事件控制
    document.onkeydown = function(event){
       var i = event || window.event;
       var k = i.keyCode || i.which;
       var offsetLength2 = parseInt($(".mainContent").css("top"));
       videoStop();
       if(k == 32){
            i.stopPropagation();
            i.preventDefault();
       }
       if(k == 38 && -offsetLength2 >= winHight){
           pageDown()
           console.log(offsetLength2)
       }else if(k == 40 && -offsetLength2 < winHight * 6){
           pageUp()
           console.log(offsetLength2)
       }
    };

    //第三页动画效果
    function page3(){
        if($(".page3Text").is(":visible")==false){
            $("#topHand").stop(true,true).animate({left:'+=70%',top:'+=75%'},800);
            $("#bottomHand").stop(true,true).animate({right:'+=70%',bottom:'+=60%'},800)
        }
        $(".page3Text").delay(500).fadeIn(1500);
    }

    //滚动监听
    var scrollFunc=function(e){
        var temp = 0;
        var offsetLength = parseInt($(".mainContent").css("top"));
        var ee=e || window.event;//浏览器兼容
        var fadeTemp = -offsetLength
        if(ee.wheelDelta){//IE/Opera/Chrome
            temp = ee.wheelDelta;
            videoStop();
            if(temp < 0  && -offsetLength < winHight * 6){
                pageUp()
                if(fadeTemp+winHight == winHight){
                    $(".page2Text").delay(500).fadeIn(1500);
                    $("#page2").css({
                        'background-size': '100% 100%'
                    })
                }
                if(fadeTemp == winHight){
                    page3();
                }
                if(fadeTemp - winHight == winHight){
                    $("#page4").css({
                        'background-size': '105% 105%'
                    })
                    $(".page4Text").delay(1000).fadeIn(1500);
                }
                if(fadeTemp - winHight*2 == winHight){
                    $(".page5Text").delay(500).fadeIn(1500);
                }
                if(fadeTemp - winHight*3 == winHight){
                    $("#page6").css({
                        'background-size': '104.5% 104.5%'
                    })
                    $(".page6Text").delay(500).fadeIn(1500);
                }
            }else if(temp > 0  && -offsetLength >= winHight){
                pageDown()
            }
        }else if(ee.detail) {//Firefox
            temp = ee.detail;
            videoStop()
            if (temp > 0 && -offsetLength < winHight * 6) {
                pageUp()
                if(fadeTemp+winHight == winHight){
                    $(".page2Text").delay(500).fadeIn(1500);
                    $("#page2").css({
                        'background-size': '100% 100%'
                    })
                }
                if(fadeTemp == winHight){
                    page3();
                }
                if(fadeTemp - winHight == winHight){
                    $("#page4").css({
                        'background-size': '105% 105%'
                    })
                    $(".page4Text").delay(1000).fadeIn(1500);
                }
                if(fadeTemp - winHight*2 == winHight){
                    $(".page5Text").delay(500).fadeIn(1500);
                }
                if(fadeTemp - winHight*3 == winHight){
                    $("#page6").css({
                        'background-size': '104.5% 104.5%'
                    })
                    $(".page6Text").delay(500).fadeIn(1500);
                }
            } else if (temp < 0 && -offsetLength >= winHight) {
                pageDown()
            }
        }
    }
    /*注册事件*/
    var body;
    if(navigator.userAgent.indexOf("Firefox")>0 || navigator.userAgent.indexOf("MSIE")>0){
        body = document.documentElement;
    }else{
        body = document.body;
    }
    var isFinish = true;
    if(navigator.userAgent.indexOf("Firefox")>0){
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',scrollFunc,false);
        }
    }else{
        document.onmousewheel = scrollFunc;
    }

//点击按钮换页
    $("#downBtn").click(function(){
        var offsetLength = parseInt($(".mainContent").css("top"));
        if(-offsetLength+winHight  && offsetLength != winHight *6){
            $(".mainContent").stop(true,true).animate({top : "-=" + winHight  + "px"},700);
        }
    })
    //video控制
    myVideo.addEventListener("loadedmetadata", function(){
        tol = myVideo.duration;//获取总时长
    })
    myVideo.addEventListener("timeupdate", function(){
        currentTime = myVideo.currentTime;//获取当前播放时间
        if(currentTime == tol){
            $("#videoBg").css({'opacity':'1'});
            $("#videoStart").show();
        }
    });
    $("#videoStart").click(function(){
        $("#videoBg").css({'opacity':'0'});
        if (myVideo.paused){
            myVideo.play();
            $("#videoStart").hide();
        }else{
            $("#videoStart").show();
        }
    })
})


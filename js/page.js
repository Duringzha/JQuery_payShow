/**
 * Created by Administrator on 2015/4/15.
 */

(function ($) {
    $.fn.page = function (options) {
        var settings = {
            myVideo: document.getElementById('myVideo'),//获取video元素
            tol: 0, //视频时长
            videoTime: 0, //视频当前播放时间
            videoPlay: $("#videoStart"),//视频开始/暂停按钮
            winHight: $(window).height(), //获取屏幕高度
            mainContent: $(".mainContent"), //获取页面父元素
            //offsetLength: $("#page2").offset().top, //parseInt($(".mainContent").css("top")), //获取页面父元素与浏览器顶部距离
            downBtn: $("#downBtn"),//换页按钮
            pageHeight: $(".page"),//获取页面元素
            videoBg: $("#videoBg"),//获取视频幕布元素
            /*以下获取各页面内元素*/
            page2: $("#page2"),
            page2Txt: $(".page2Text"),
            page3: $("#page3"),
            page3Txt: $(".page3Text"),
            topHand: $("#topHand"),//拿着扫描仪的手
            bottomHand: $("#bottomHand"),//拿着手机的手
            page4: $("#page4"),
            page4Txt: $(".page4Text"),
            page5: $("#page5"),
            page5Txt: $(".page5Text"),
            page6: $("#page6"),
            page6Txt: $(".page6Text"),
            page7: $("#page7"),
            slideTab: $("#slide li a")
        };
        if (options) {
            $.extend({}, settings, options);
        }
        //设置页面高度为浏览器高度
        settings.pageHeight.css({'height': settings.winHight});

        //设置页面url始终在第一屏
            var t = $("#page1").offset().top;
            $(window).scrollTop(t);

        //video控制
        settings.myVideo.addEventListener("loadedmetadata", function () {
            settings.tol = settings.myVideo.duration;//获取总时长
        });

        //视频播放完毕后，显示幕布和开始按钮
        settings.myVideo.addEventListener("timeupdate", function () {
            settings.videoTime = settings.myVideo.currentTime;//获取当前播放时间
            if (settings.videoTime == settings.tol) {
                settings.videoBg.css({'opacity': '1'});
                settings.videoPlay.show();
            }
        });

        //点击按钮开始或暂停视频
        settings.videoPlay.click(function () {
            settings.videoBg.css({'opacity': '0'});
            if (settings.myVideo.paused) {
                settings.myVideo.play();
                settings.videoPlay.hide();
            } else {
                settings.videoPlay.show();
            }
        });

        //视频停止事件，用于鼠标滚轮滚动后视频自动停止
        function videoStop() {
            if (settings.myVideo.played) {
                settings.myVideo.pause();
                settings.videoPlay.show();
            }
        }
        $("html").mousewheel({
            onmousewheelstart: function() {
            },
            onmousewheel: function(y) {
            },
            onmousewheelend: function(length) {
                //alert(length);
                var tabindex = parseInt($(".active").attr("title"));
                if(length>0){
                    pageDown(tabindex);
                }else{
                    pageUp(tabindex);
                }
            }
        });
        //页面向上滑动
        function pageUp(id) {
            $("html,body").animate({scrollTop: $("#page" + id).next().offset().top}, 700);
            settings.slideTab.removeClass("active");
            $("#slide li a").eq(id).addClass("active");
            animation(id + 1);
        }
        //页面向下滑动
        function pageDown(id) {
            $("html,body").animate({scrollTop: $("#page" + id).prev().offset().top}, 700);
            settings.slideTab.removeClass("active");
            $("#slide li a").eq(id-2).addClass("active");
        }

        //页面动画函数整合
        function page2Animate() {
            settings.page2Txt.delay(500).fadeIn(1500);
            settings.page2.css({
                'background-size': '100% 100%'
            });
        }

        function page3Animate() {
            if (settings.page3Txt.is(":visible") == false) {
                settings.topHand.stop(true, true).animate({left: '+=70%', top: '+=75%'}, 800);
                settings.bottomHand.stop(true, true).animate({right: '+=70%', bottom: '+=60%'}, 800)
            }
            settings.page3Txt.delay(500).fadeIn(1500);
        }

        function page4Animate() {
            settings.page4.css({
                'background-size': '105% 105%'
            });
            settings.page4Txt.delay(1000).fadeIn(1500);
        }

        function page5Animate() {
            settings.page5Txt.delay(500).fadeIn(1500);
        }

        function page6Animate() {
            settings.page6.css({
                'background-size': '104.5% 104.5%'
            });
            settings.page6Txt.delay(500).fadeIn(1500);
        }
        function animation(i){
            if (i == 2) {
                page2Animate()
            } else if (i == 3) {
                page3Animate()
            } else if (i == 4) {
                page4Animate()
            } else if (i == 5) {
                page5Animate()
            } else if (i == 6) {
                page6Animate()
            }
        }

        //滚动监听
        /*var scrollFunc = function (e) {
            var ee = e || window.event;//浏览器兼容
            var temp = 0;
            var tabindex = parseInt($(".active").attr("title"));
            if (ee.wheelDelta) {//IE/Opera/Chrome
                temp = ee.wheelDelta;
                videoStop();
                if(temp > 0){
                    pageDown(tabindex)
                }else if(temp < 0){
                    pageUp(tabindex)
                }

            } else if (ee.detail) {//Firefox
                temp = ee.detail;
                videoStop();
                if(temp > 0){
                    if($("body html").is(":animated")){

                    }
                    pageUp(tabindex);
                }else if(temp < 0){
                    pageDown(tabindex);
                }

            }
        }*/
        /*注册事件*/
       /* var body;
        if (navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("MSIE") > 0) {
            body = document.documentElement;
        } else {
            body = document.body;
        }
        var isFinish = true;
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }
        } else {
            document.onmousewheel = scrollFunc;
        }*/
        //点击按钮换页
        settings.downBtn.click(function () {
            var tabindex = parseInt($(".active").attr("title"));
            videoStop();
            pageUp(tabindex)
        })
        //点击右侧圆点导航条跳转页面
        settings.slideTab.click(function (event) {
            var index = this.title;
            var i = parseInt(index);
            var id = '#' + 'page' + index;
            settings.slideTab.removeClass("active");
            $(this).addClass("active");
            videoStop();
            $("html,body").stop(true,true).animate({scrollTop: $(id).offset().top}, 700);
            animation(i);
        });

        //键盘事件监听
        document.onkeydown = function (event) {
            var i = event || window.event;
            var k = i.keyCode || i.which;
            var tabindex = parseInt($(".active").attr("title"));
            videoStop();
            if (k == 32) {
                //禁止按空格键事件
                i.stopPropagation();
                i.preventDefault();
            }
            if (k == 38) {
                pageDown(tabindex)
            } else if (k == 40) {
                videoStop();
                pageUp(tabindex)
            }
        };
    }
})(jQuery);
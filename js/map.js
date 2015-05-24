/**
 * Created by Administrator on 2015/4/21.
 */
// 百度地图API功能
$(function(){
    var firefox = navigator.userAgent.indexOf('Firefox') != -1;
    function MouseWheel(e) {
        ///对img按下鼠标滚路，阻止视窗滚动
        e = e || window.event;
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
    }
    window.onload = function () {
        var mapdiv = document.getElementById('allmap');
        firefox ? mapdiv.addEventListener('DOMMouseScroll', MouseWheel, false) : (mapdiv.onmousewheel = MouseWheel);
    }
    var map = new BMap.Map('allmap');
// 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野

    myGeo.getPoint("珠海市香洲区水湾头御海湾花园", function (poi) {
        var marker = new BMap.Marker(poi); //创建marker对象
        if (poi) {
            map.centerAndZoom(poi, 16);
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        } else {
            alert("您选择地址没有解析到结果!");
        }
        //alert('您的位置：'+poi.lng+','+poi.lat);
        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            alert("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError",function(e){
            // 定位失败事件
            alert(e.message);
        });
        map.addControl(geolocationControl);
        map.enableScrollWheelZoom();
        var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
            '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
            '</div>';

        //创建检索信息窗口对象
        var searchInfoWindow = null;
        searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
            title: "百度大厦",      //标题
            width: 290,             //宽度
            height: 105,              //高度
            panel: "panel",         //检索结果面板
            enableAutoPan: true,     //自动平移s
            searchTypes: [
                BMAPLIB_TAB_SEARCH,   //周边检索
                BMAPLIB_TAB_TO_HERE,  //到这里去
                BMAPLIB_TAB_FROM_HERE //从这里出发
            ]
        });

        marker.enableDragging(); //marker可拖拽
        searchInfoWindow.open(marker);
        marker.addEventListener("click", function (e) {
            searchInfoWindow.open(marker);
        })
        map.addOverlay(marker); //在地图中添加marker
    }, "珠海市");
})
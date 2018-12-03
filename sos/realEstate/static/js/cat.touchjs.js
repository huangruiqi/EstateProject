/*
* author: www.somethingwhat.com
*/
var cat = window.cat || {};
cat.touchjs = {
    left: 0,
    top: 0,
    scaleVal: 1,    //缩放
    rotateVal: 0,   //旋转
    curStatus: 0,   //记录当前手势的状态, 0:拖动, 1:缩放, 2:旋转
    //初始化
    init: function ($targetObj, callback) {
        touch.on($targetObj, 'touchstart', function (ev) {
            cat.touchjs.curStatus = 0;
            ev.preventDefault();//阻止默认事件
        });
        if (!window.localStorage.cat_touchjs_data)
            callback(0, 0, 1, 0);
        else {
            var jsonObj = JSON.parse(window.localStorage.cat_touchjs_data);
            cat.touchjs.left = parseFloat(jsonObj.left), cat.touchjs.top = parseFloat(jsonObj.top), cat.touchjs.scaleVal = parseFloat(jsonObj.scale), cat.touchjs.rotateVal = parseFloat(jsonObj.rotate);
            callback(cat.touchjs.left, cat.touchjs.top, cat.touchjs.scaleVal, cat.touchjs.rotateVal);
        }
    },
    //拖动
    drag: function ($targetObj, callback) {
        // var touchsideTop = (cat.touchjs.scaleVal - 1) * $targetObj[0].height / 2;
        // var touchsideButtom = (1 - cat.touchjs.scaleVal) * $targetObj[0].height / 2;
        // var touchsideLeft = (cat.touchjs.scaleVal -1) * $targetObj[0].width / 2;
        // var touchsideRight = (1 - cat.touchjs.scaleVal) * $targetObj[0].width / 2;
        touch.on($targetObj, 'drag', function (ev) {
            // setTimeout(() => {alert(ev.clientX);}, 1000);
            // alert(ev.clientX);
            // console.log($targetObj);
            // alert(cat.touchjs.scaleVal)
            // console.log(cat.touchjs.scaleVal)
            if (cat.touchjs.scaleVal <= 1) {

            }else {
                $targetObj.css("left", cat.touchjs.left + ev.x).css("top", cat.touchjs.top + ev.y);
                // console.log($targetObj[0].offsetLeft,touchsideLeft, touchsideRight );
                // alert(touchsideButtom, $targetObj[0].height)
                // alert($targetObj[0].offsetTop)
                // $targetObj.css("top", cat.touchjs.left + ev.y);
                // $targetObj.css("left", cat.touchjs.left + ev.x);
                // if (0 < $targetObj[0].offsetLeft <= touchsideLeft && 0 < $targetObj[0].offsetTop <= touchsideTop) {
                //         $targetObj.css("top", touchsideTop + ev.y);
                //         $targetObj.css("left", cat.touchjs.left + ev.x);
                // }else if($targetObj[0].offsetLeft > touchsideLeft){
                //     $targetObj.css("left", touchsideLeft)
                // }
                // if(0 < $targetObj[0].offsetLeft <= touchsideLeft && touchsideButtom <= $targetObj[0].offsetTop < 0) {
                //         $targetObj.css("top", touchsideTop + ev.y);
                //         $targetObj.css("left", cat.touchjs.left + ev.x);
                // }else if($targetObj[0].offsetLeft > touchsideLeft){
                //     $targetObj.css("top", touchsideTop)
                // }
                // if(touchsideRight <= $targetObj[0].offsetLeft < 0 && touchsideButtom <= $targetObj[0].offsetTop < 0) {
                //         $targetObj.css("top", touchsideTop + ev.y);
                //         $targetObj.css("left", cat.touchjs.left + ev.x);
                // }else if($targetObj[0].offsetTop < touchsideButtom){
                //     $targetObj.css("top", touchsideButtom)
                // }
                // if(touchsideRight <= $targetObj[0].offsetLeft < 0 && 0 <  $targetObj[0].offsetTop <= touchsideTop) {
                //         $targetObj.css("top", touchsideTop + ev.y);
                //         $targetObj.css("left", cat.touchjs.left + ev.x);
                // }else if($targetObj[0].offsetTop > touchsideTop){
                //     $targetObj.css("top", touchsideTop)
                // }

                
            // alert($targetObj.css("width"));
            // if(parseInt(cat.touchjs.top + ev.y) >= 0) {
            //     $targetObj.css("top", 0);
            // }else{
            //     $targetObj.css("top", cat.touchjs.top + ev.y);
            // }
            // console.log($targetObj.css("bottom") + "dd");
            // if(parseInt($targetObj.css("bottom")) > 0 || parseInt($targetObj.css("top")) > 0) {
            //     // alert(445);
                // if (parseInt($targetObj.css("bottom")) > 0) {
                //     // alert(440);
                //     $targetObj.css("top", 0);
                //     console.log($targetObj.css("bottom"));
                // } else if(parseInt($targetObj.css("top")) > 0) {
                //     $targetObj.css("top", 0);
                // }
                
                // if (parseInt($targetObj.css("top")) < 0 && parseInt($targetObj.css("bottom")) >= 0 && ev.x > 0) {
                //     $targetObj.css("top", cat.touchjs.left + ev.y);
                // } else if (parseInt($targetObj.css("top")) >= 0 && parseInt($targetObj.css("bottom")) < 0 && ev.x < 0) {
                //     $targetObj.css("top", cat.touchjs.left + ev.y);
                // } else if (parseInt($targetObj.css("top")) < 0 && parseInt($targetObj.css("bottom")) < 0) {
                //     $targetObj.css("top", cat.touchjs.left + ev.y);
                // }  
            }              
                
            
            // if(parseInt($targetObj.css("left")) < 0 || parseInt($targetObj.css("right")) < 0) {
            //     if (parseInt($targetObj.css("left")) < 0 && parseInt($targetObj.css("right")) >= 0 && ev.x > 0) {
            //         $targetObj.css("left", cat.touchjs.left + ev.x);
            //     } else if (parseInt($targetObj.css("left")) >= 0 && parseInt($targetObj.css("right")) < 0 && ev.x < 0) {
            //         $targetObj.css("left", cat.touchjs.left + ev.x);
            //     } else if (parseInt($targetObj.css("left")) < 0 && parseInt($targetObj.css("right")) < 0) {
            //         $targetObj.css("left", cat.touchjs.left + ev.x);
            //     }
            // }
            // }
            // console.log($targetObj.css("bottom"));
        });
        touch.on($targetObj, 'dragend', function (ev) {
            cat.touchjs.left = cat.touchjs.left + ev.x;
            cat.touchjs.top = cat.touchjs.top + ev.y;
            // if($targetObj[0].offsetLeft > touchsideLeft){
            //     cat.touchjs.left = touchsideLeft;
            // }else if($targetObj[0].offsetLeft < touchsideRight){
            //     cat.touchjs.left =  touchsideRight;
            // }
            // if($targetObj[0].offsetTop > touchsideTop){
            //     cat.touchjs.top = touchsideTop;
            // }else if($targetObj[0].offsetTop < touchsideButtom){
            //     cat.touchjs.top =  touchsideButtom;
            // }
            callback(cat.touchjs.left, cat.touchjs.top);
        });
    },
    //缩放
    scale: function ($targetObj, callback) {
        var initialScale = cat.touchjs.scaleVal || 1;
        var currentScale;
        touch.on($targetObj, 'pinch', function (ev) {
            if (cat.touchjs.curStatus == 2) {
                return;
            }
            cat.touchjs.curStatus = 1;
            currentScale = ev.scale - 1;
            currentScale = initialScale + currentScale;
            currentScale = currentScale > 2 ? 2 : currentScale;

            currentScale = currentScale < 1 ? 1 : currentScale;
            cat.touchjs.scaleVal = currentScale;
            console.log(ev)
            // alert($targetObj[0].offsetLeft, $targetObj[0].offsetRight)
            var transformStyle = 'scale(' + cat.touchjs.scaleVal + ') rotate(' + cat.touchjs.rotateVal + 'deg)';
            $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);
            callback(cat.touchjs.scaleVal);
        });

        touch.on($targetObj, 'pinchend', function (ev) {
            if (cat.touchjs.curStatus == 2) {
                return;
            }
            initialScale = currentScale;
            cat.touchjs.scaleVal = currentScale;
            callback(cat.touchjs.scaleVal);
        });
    },
    //旋转
    rotate: function ($targetObj, callback) {
        var angle = cat.touchjs.rotateVal || 0;
        touch.on($targetObj, 'rotate', function (ev) {
            if (cat.touchjs.curStatus == 1) {
                return;
            }
            cat.touchjs.curStatus = 2;
            var totalAngle = angle + ev.rotation;
            if (ev.fingerStatus === 'end') {
                angle = angle + ev.rotation;
            }
            cat.touchjs.rotateVal = totalAngle;
            var transformStyle = 'scale(' + cat.touchjs.scaleVal + ') rotate(' + cat.touchjs.rotateVal + 'deg)';
            $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);
            $targetObj.attr('data-rotate', cat.touchjs.rotateVal);
            callback(cat.touchjs.rotateVal);
        });
    }
};
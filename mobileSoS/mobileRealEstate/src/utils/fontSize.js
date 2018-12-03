(function (doc, win) {
  var dpr = window.devicePixelRatio || 1;
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
    var dpr = window.devicePixelRatio * 1.2 || 1;
  } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
    var dpr = 1;
  } else {  //pc
    var dpr = 1;
  };
  var docEl = document.getElementsByTagName('html')[0],
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
      docEl.style.fontSize = dpr * 16 * (clientWidth / 1920) + 'px'
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

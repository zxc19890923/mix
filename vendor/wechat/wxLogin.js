!function (a, b) {
    function d(a) {
        var e, c = b.createElement("iframe"), d = "https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid + "&scope=" + a.scope + "&redirect_uri=" + a.redirect_uri + "&state=" + a.state + "&login_type=jssdk";
        d += a.style ? "&style=" + a.style : "", d += a.href ? "&href=" + a.href : "", c.src = d, c.frameBorder = "0", c.allowTransparency = "true", c.scrolling = "no", c.width = "300px", c.height = "320px", e = b.getElementById(a.id), e.innerHTML = "", e.appendChild(c)
    }

    a.WxLogin = d
}(window, document);
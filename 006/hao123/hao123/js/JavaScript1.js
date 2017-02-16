$(function () {
    //加载皮肤
    if (localStorage.skin) {
        $(".links").css("color", localStorage.skin);
        $(".active").css("background", localStorage.skin);
        $(".menu").css("border-top", "2px solid " + localStorage.skin);
        $(".menu>div").mouseover(function () {
            $(this).css("color", localStorage.skin);
        }).mouseout(function () {
            $(this).css("color", "black");
        });
    }

    $(".skin1,.skin2,.skin3").click(function () {
        localStorage.skin = $(this).css("background-color");
        //alert(localStorage.skin);
        $(".links").css("color", localStorage.skin);
        $(".active").css("background", localStorage.skin);
        $(".menu").css("border-top", "2px solid " + localStorage.skin);
        $(".menu>div").mouseover(function () {
            $(this).css("color", localStorage.skin);
        }).mouseout(function () {
            $(this).css("color", "black");
        });
    });
})
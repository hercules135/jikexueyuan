$(function () {
    //导航条点击
    $(".navbar>div").click(function () {
        $(".navbar>div").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    });
    $(".wodeguanzhu_btn").click(function () {
        $(".newsandhot>div").hide();
        $(".wodeguanzhu").show();
    });
    $(".tuijian_btn").click(function () {
        $(".newsandhot>div").hide();
        $(".tuijian").show();
    });
    $(".daohang_btn").click(function () {
        $(".newsandhot>div").hide();
        $(".daohang").show();
    });
    $(".shiping_btn").click(function () {
        $(".newsandhot>div").hide();
        $(".shiping").show();

        //重新排列瀑布流,否则页面错乱
        var msnry = new Masonry('.grid');
        msnry.layout();
    });
    $(".gouwu_btn").click(function () {
        $(".newsandhot>div").hide();
        $(".gouwu").show();
    });

    //我的导航开关
    $(".wodedaohang").click(function () {
        //开关我的导航
        $(".wodedaohang_content").toggle();
        //切换小图标箭头
        if (!$(".wodedaohang_content").is(":visible")) {
            $(".wodedaohang_icon").css("background", "url('./img/baidupcwodeguanzhu/未标题-1_03.png') no-repeat");
        }
        else {
            $(".wodedaohang_icon").css("background", "url('./img/baidupcwodeguanzhu/未标题-1_03.gif') no-repeat");
        }
       
    });

    //换一换
    $(".change").click(function () {
        var arr = $(".shishiredian");
        var arrnew = [];
        while (arr.length > 0) {
            var i = parseInt(Math.random()*arr.length);
            arrnew.push(arr[i]);
            arr.splice(i,1);
        }
        $(".tuijiancontent").html(arrnew);
    });

    //$("#range").change(function () {
    //    $("#rangnum").text($(this).val() + "%");
    //    $("article").css("opacity", ($(this).val() / 100));
    //    localStorage.opacity = $(this).val() / 100;
    //});

    $('#range').bind('input propertychange', function () {
        $("#rangnum").text($(this).val() + "%");
        $("article").css("opacity", ($(this).val() / 100));
        localStorage.opacity = $(this).val() / 100;
    });


    $("#shouqi,article").click(function () {
        $("#skin").animate({ top: "-310px", opacity: "0" }, "slow");;
    });

    $("#skin_btn").click(function () {
        $("#skin").animate({ top: "0px", opacity: "1" }, "slow");;
        
    });

    var hasskin = function () {
        if (localStorage.skinsrc != null) {
            $("#skin_preview>div:not('#small_preview')").each(function () {
                $(this).html("");
            });
            $("div[src='" + localStorage.skinsrc + "']").html("<img src=\"img/skins/1.png\" style=\"position:absolute;right:3px;bottom:3px;\" />");
            $("body").css("background-image", "url('../" + localStorage.skinsrc + "')");
            $("#small_preview").css("background-image", "url('../" + localStorage.skinsrc + "')");
            $("nav a,nav #city").css("color", "#fff");
            $("#skin_btn").css("color", "#fff");
            $("footer div,footer a,footer b,footer p").css("color", "#fff");
            $("article>img").attr("src", "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/holiday/xmas2016/logo.gif");
        }
        if (localStorage.opacity!=null) {
            $("article").css("opacity", localStorage.opacity);
            $("#rangnum").text(localStorage.opacity * 100 + "%");
            $("#range").val(localStorage.opacity * 100);
        }
    }
    hasskin();
    $("#disskin").click(function () {
        localStorage.clear();
        location.reload();
    });
})


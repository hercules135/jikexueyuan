$(function () {
    //皮肤模块div本来就直接存在,没有create方法,如果有的话,单例模式可以保证不要出现2个,就是在创建以前判断是否存在
    var Skin = {
        init: function () {
            this.render();
            this.bind();
        },
        render: function () {
            this.range_input = $('#range');

            this.shouqi = $("#shouqi");
            this.article = $("article");

            this.skin_btn = $("#skin_btn");
            this.disskin_btn = $("#disskin");


            this.preview_div = $("#skin_preview>div:not('#small_preview')");
        },
        bind: function () {

            this.range_input.on('input propertychange', this.range);

            this.shouqi.on("click",this.slideup);
            this.article.on("click",this.slideup);
            this.skin_btn.on("click",this.showSkinDiv);
            this.disskin_btn.on("click", this.delSkin);

            this.preview_div.on("click", this.previewclick);
            this.preview_div.on("mouseover", this.preview);
        },

        //顶部皮肤透明度
        range: function () {
            $("#rangnum").text($(this).val() + "%");
            $("article").css("opacity", ($(this).val() / 100));
            localStorage.opacity = $(this).val() / 100;
        },
        //收起皮肤页面
        slideup: function () {
            $("#skin").animate({ top: "-310px", opacity: "0" }, "slow");;
        },
        //显示皮肤页面
        showSkinDiv: function () {
            $("#skin").animate({ top: "0px", opacity: "1" }, "slow");
        },
        //如果有选择过皮肤则显示皮肤
        hasskin: function () {
            if (localStorage.skinsrc != null) {
                $("#skin_preview>div:not('#small_preview')").each(function () {
                    $(this).html("");
                });
                $("div[src='" + localStorage.skinsrc + "']").html("<img src=\"img/skins/1.png\" style=\"position:absolute;right:3px;bottom:3px;\" />");
                $("body").css("background-image", "url('" + localStorage.skinsrc + "')");
                $("#small_preview").css("background-image", "url('" + localStorage.skinsrc + "')");
                $("nav a,nav #city").css("color", "#fff");
                $("#skin_btn").css("color", "#fff");
                $("footer div,footer a,footer b,footer p").css("color", "#fff");
                $("article>img").attr("src", "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/holiday/xmas2016/logo.gif");
            }
            if (localStorage.opacity != null) {
                $("article").css("opacity", localStorage.opacity);
                $("#rangnum").text(localStorage.opacity * 100 + "%");
                $("#range").val(localStorage.opacity * 100);
            }
        },
        //删除皮肤
        delSkin: function () {
            localStorage.clear();
            location.reload();
        },
        //皮肤预览
        preview: function () {
            $("#small_preview").css("background-image", "url('" + $(this).attr("src") + "')");

        },
        previewclick: function () {

            $("#skin_preview>div:not('#small_preview')").each(function () {
                $(this).html("");
            });
            $(this).html("<img src=\"img/skins/1.png\" style=\"position:absolute;right:3px;bottom:3px;\" />");

            $("article>img").attr("src", "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/holiday/xmas2016/logo.gif");
            $("body").css("background-image", "url('" + $(this).attr("src") + "')");
            var src = $(this).attr("src");
            localStorage.skinsrc = src;
        }
    }





    var RightNav = {
        init: function () {
            this.render();
            this.bind();
        },
        render: function () {

        },
        bind: function () {

        },
    }


    var NavBtns = {
        init: function () {
            this.render();
            this.bind();
        },
        render: function () {
            this.navbardiv = $(".navbar>div");
            this.wodeguanzhu_btn = $(".wodeguanzhu_btn");
            this.tuijian_btn = $(".tuijian_btn");
            this.daohang_btn = $(".daohang_btn");
            this.shiping_btn = $(".shiping_btn");
            this.gouwu_btn = $(".gouwu_btn");
            this.wodedaohang_btn = $(".wodedaohang");
            this.change_btn = $(".change");

        },
        bind: function () {
            this.navbardiv.on("click",this.navbarActive);
            this.wodeguanzhu_btn.on("click",this.wodeguanzhu);
            this.tuijian_btn.on("click",this.tuijian);
            this.daohang_btn.on("click",this.daohang);
            this.shiping_btn.on("click",this.shiping);
            this.gouwu_btn.on("click",this.gouwu);
            this.wodedaohang_btn.on("click",this.wodedaohang);
            this.change_btn.on("click",this.change);
        },
        navbarActive: function () {
            $(".navbar>div").each(function () {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
        },
        wodeguanzhu: function () {
            $(".newsandhot>div").hide();
            $(".wodeguanzhu").show();
        },
        tuijian: function () {
            $(".newsandhot>div").hide();
            $(".tuijian").show();
        },
        daohang: function () {
            $(".newsandhot>div").hide();
            $(".daohang").show();
        },
        shiping: function () {
            $(".newsandhot>div").hide();
            $(".shiping").show();

            //重新排列瀑布流,否则页面错乱
            var msnry = new Masonry('.grid');
            msnry.layout();
        },
        gouwu: function () {
            $(".newsandhot>div").hide();
            $(".gouwu").show();
        },
        //我的导航切换是否显示
        wodedaohang: function () {
            //开关我的导航
            $(".wodedaohang_content").toggle();
            //切换小图标箭头
            if (!$(".wodedaohang_content").is(":visible")) {
                $(".wodedaohang_icon").css("background", "url('img/baidupcwodeguanzhu/未标题-1_03.png') no-repeat");
            }
            else {
                $(".wodedaohang_icon").css("background", "url('img/baidupcwodeguanzhu/未标题-1_03.gif') no-repeat");
            }

        },
        //热点时事换一换
        change: function () {
            var arr = $(".shishiredian");
            var arrnew = [];
            while (arr.length > 0) {
                var i = parseInt(Math.random() * arr.length);
                arrnew.push(arr[i]);
                arr.splice(i, 1);
            }
            $(".tuijiancontent").html(arrnew);
        },
    }


    Skin.init();
    Skin.hasskin();
    RightNav.init();
    NavBtns.init();
})


$(function () {
                    
    var m1 = function () {
        $(this).find(".hide").slideDown();
        $(this).find(".show").stop().slideUp();
    };
    var m2 = function () {
        $(this).find(".hide").stop().slideUp();
        $(this).find(".show").slideDown();
    };

    //type 1:实战 2:JavaScript 3:HTML 4:HTML5 5jQuery...
    var data = [
        { title: "前端开发环境搭建(三种工具任选其一)", classnum: 6, time: 41, type: "1", students: 21792, describe: "本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技巧", picturesrc: "http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png", icon: "VIP" },
        { title: "前端开发环境搭建(三种工具任选其一)", classnum: 6, time: 41, type: "1", students: 313792, describe: "本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技巧", picturesrc: "http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png", icon: "VIP" },
        { title: "前端开发环境搭建(三种工具任选其一)", classnum: 6, time: 41, type: "1", students: 1792, describe: "本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技巧", picturesrc: "http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png", icon: "VIP" },
        { title: "前端开发环境搭建(三种工具任选其一)", classnum: 6, time: 41, type: "1", students: 17192, describe: "本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技巧", picturesrc: "http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png", icon: "VIP" },
        { title: "前端开发环境搭建(三种工具任选其一)", classnum: 6, time: 41, type: "1", students: 71292, describe: "本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技巧", picturesrc: "http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png", icon: "VIP" },
        { title: "前端开发环境搭建(三种工具任选其一)", classnum: 6, time: 41, type: "1", students: 731292, describe: "本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技巧", picturesrc: "http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png", icon: "VIP" },
    ];

    var adapter = doT.template($("#item").html());

    $(".content_items").append(adapter(data));
    $(".content_items").append(adapter(data));

    $(".item_style1").on("mouseenter", m1);
    $(".item_style1").on("mouseleave", m2);

    $("#sm").click(function () {
        $(".item_style2").each(function () {
            $(this).removeClass("item_style2").addClass("item_style1");
        });

        $(".item_style1").on("mouseenter", m1);
        $(".item_style1").on("mouseleave", m2);
        localStorage.style = "sm";
    });
    $("#md").click(function () {
        $(".item_style1").each(function () {
            $(this).removeClass("item_style1").addClass("item_style2");
        });
        localStorage.style = "md";

    });
    function init() {
        if (localStorage.style == "md") {
            $(".item_style1").each(function () {
                $(this).removeClass("item_style1").addClass("item_style2");
            });
        }
        else {
            $(".item_style2").each(function () {
                $(this).removeClass("item_style2").addClass("item_style1");
            });

            $(".item_style1").on("mouseenter", m1);
            $(".item_style1").on("mouseleave", m2);
        }
    };
    init();


    $(".close_search").click(function () {
        $(".searchbar").animate({ width: 0, opacity: 0, }, "slow");
    });
    $(".search_btn").click(function () {
        $(".searchbar").animate({ width: "851px", opacity: 1, }, "slow");

    });

    $(".up").click(function () {
        var speed = 200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });

    function showScroll() {
        $(window).scroll(function () {
            var scrollValue = $(window).scrollTop();
            scrollValue > 100 ? $('.up').fadeIn() : $('.up').fadeOut();
        });
    }

    showScroll();

})
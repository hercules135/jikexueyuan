$(function () {
    //准备数据
    var data = [
        { src: "img/1.jpg" },
        { src: "img/2.jpg" },
        { src: "img/3.jpg" },
        { src: "img/4.jpg" },
        { src: "img/5.jpg" },
    ];
    for (var i = 0; i < 23; i++) {
        data[i] = {src:"img/"+(i+1)+".jpg"}
    }

    var loadmore =function(){
        for (var i = 0; i < data.length; i++) {
            var box = $("<div>").addClass("box").appendTo($(".container"));
            var con = $("<div>").addClass("con").appendTo(box);
            $("<img>").attr("src",data[i].src).appendTo(con);
        }
        imgload();
        $(window).on("scroll", scroll);
    }

    //JQ方法添加标签

    var imgload = function () {
        //获取每行几个
        var num = Math.floor($(document).width() / $(".box").eq(0).width());
        console.log(num);

        //每列高度数组
        var boxHeightArr = new Array;

        $(".box").each(function (i, v) {
            //console.log(i+"-"+v);
            if (i < num) {
                $(v).css("position", "initial");
                boxHeightArr[i] = $(v).outerHeight();//使用height会拿不到border padding
                //console.log(boxHeightArr[i]);
            }
            else {
                //找到最高点
                var minBoxHeight = Math.min.apply(null,boxHeightArr);
                //console.log(minBoxHeight);
                //获取最高点下标
                var minBoxIndex = $.inArray(minBoxHeight,boxHeightArr);

                //放置当前图片
                $(v).css({
                    position:"absolute",
                    top:minBoxHeight,
                    left:$(".box").eq(minBoxIndex).offset().left
                });

                //修改最高点高度
                boxHeightArr[minBoxIndex] += $(v).outerHeight();
            }
        });
    }

    //滚动方法
    var scroll = function () {
        var scrollTop = $(this).scrollTop();
        var documentHeight = $(document).height();
        var conHeight = $(this).height();

        if (scrollTop + conHeight >= documentHeight - 100) {
            $(window).off("scroll");
            loadmore();
        }
    }
    //加载更多
    var loadmore2 = function () {
        $(".container").append(adapter(data));
        imgload();
        $(window).on("scroll", scroll);
    }
    $(window).on("scroll", scroll);

    imgload();

    $(window).on("change", imgload());

    //改变浏览器大小重新布局
    $(window).resize(function () {
        imgload();
    });

    //没有足够内容直接加载更多
    console.log($(document).height());
    console.log($(".container").height());
    if ($(document).height() > $(".container").height()) {
        loadmore();
    }
    
})
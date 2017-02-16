$(function () {

    //初始化doT模板
    var adapter = doT.template($("#item").html());

    var type = "精选";
    $(".cl li").click(function () {
        type = $(this).text();
        $(".itemlist").empty();
        getlist();
    });

    //获取列表方法
    var getlist = function () {
        $.ajax({

            url: "/newslist",
            type: "get",
            data: { type: type },
            datatype: "json",
            beforeSend: function () {

            },
            success: function (re) {
                //$(".itemlist").empty();
                $(".itemlist").append(adapter(re));
            }
        })
    }
    getlist();

    $(".more").click(function () {
        getlist();
    });

})
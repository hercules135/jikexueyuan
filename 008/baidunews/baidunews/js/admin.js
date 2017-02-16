$(function () {

    //初始化doT模板
    var adapter = doT.template($("#item").html());
    //获取列表方法
    var getlist = function () {
        $.ajax({
            url: "php/getnewslist.php",
            type: "get",
            data: {type:"-1"},
            datatype:"json",
            beforeSend: function () {
                $("tbody").html('loading...');
            },
            success: function (re) {
                $("tbody").empty();
                $("tbody").append(adapter(re.data));
                $(".del").on("click", del);
                $(".edit").on("click", edit);
            }
        })
    }
    getlist();

    //添加方法
    $("#addnews").click(function () {
        if (f1.checkValidity()) {
            //这个方法仅仅验证表单,没有显示哪里出错了,但是如果是submit就会提示,我想知道submit按钮调用了哪个方法来确认并显示错误的
            var data = $("#f1").serialize();
            console.log(data);
            $.ajax({
                type: "POST",
                url: "php/addnews.php",
                data: data,
                success: function (re) {
                    alert("添加成功");
                    getlist();

                },
                error: function (re) {
                    //alert(JSON.stringify(re));
                }
            }); 
        }

    });

    //保存方法
    $("#save").click(function () {
        if (f2.checkValidity()) {
            //这个方法仅仅验证表单,没有显示哪里出错了,但是如果是submit就会提示,我想知道submit按钮调用了哪个方法来确认并显示错误的
            var data = $("#f2").serialize();
            console.log(data);
            $.ajax({
                type: "POST",
                url: "php/editnews.php",
                data: data,
                success: function (re) {
                    alert("修改成功");
                    $('#myModal').modal('hide');
                    getlist();

                },
                error: function (re) {
                    //alert(JSON.stringify(re));
                }
            });
        }
    });

    //删除方法
    var del = function () {
        if (!confirm("是否删除?")) {
            return;
        }
        var id = $(this).attr("newsid");
        var temp = $(this);
        $.ajax({
            url: "php/delnews.php",
            type: "post",
            data: { id: id },
            success: function (re) {
                if (re) {
                    temp.parent().parent().remove();
                }
                else {

                }
            }
        });
    };

    //编辑方法
    var edit = function () {
        $("[name='id']").val($(this).attr("newsid"));
        $("#f2 [name='title']").val($(this).parent().parent().children().eq(0).text());
        $("#f2 [name='time']").val($(this).parent().parent().children().eq(1).text());
        $("#f2 [name='src']").val($(this).parent().parent().children().eq(2).text());
        $("#f2 [name='picturesrc']").val($(this).attr("psrc"));
    }
})
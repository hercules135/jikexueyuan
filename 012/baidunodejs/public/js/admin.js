
    var admin = {
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            var me = this;

            //初始化doT模板
            me.adapter = doT.template($("#item").html());
            me.addnewsbtn = $("#addnews");
            me.savebtn = $("#save");
        },
        bind:function(){
            var me = this;

            me.addnewsbtn.click(me.addnews);
            me.savebtn.click(me.save);
        },
        //获取列表方法
        getlist:function () {
            var me = this;
            $.ajax({
                url: "/newslist",
                type: "get",
                data: {type:"-1"},
                datatype:"json",
                beforeSend: function () {
                    $("tbody").html('loading...');
                },
                success: function (re) {
                    $("tbody").empty();
                    $("tbody").append(me.adapter(re));
                    $(".del").on("click", me.del);
                    $(".edit").on("click", me.edit);
                }
            })
        },
        //添加新闻方法
        addnews:function () {
            if (f1.checkValidity()) {
                var data = $("#f1").serialize();
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "admin/addnews",
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
            else{
                alert("请正确填写");
            }
        },
        //保存方法
        save:function () {
            if (f2.checkValidity()) {
                //这个方法仅仅验证表单,没有显示哪里出错了,但是如果是submit就会提示,我想知道submit按钮调用了哪个方法来确认并显示错误的
                var data = $("#f2").serialize();
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "admin/editnews",
                    data: data,
                    datatype:"json",
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
        },
        //删除方法
        del:function () {
            if (!confirm("是否删除?")) {
                return;
            }
            var id = $(this).attr("newsid");
            var temp = $(this);
            $.ajax({
                url: "admin/delnews",
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
        },
        //编辑方法
        edit:function () {
            $("[name='id']").val($(this).attr("newsid"));
            $("#f2 [name='title']").val($(this).parent().parent().children().eq(0).text());
            $("#f2 [name='time']").val($(this).parent().parent().children().eq(1).text());
            // $("#f2 [name='src']").val($(this).parent().parent().children().eq(2).text());
            var srctext = $(this).parent().parent().children().eq(2).text();
            $("#f2 [name='src']").find("[value='"+srctext+"']").attr("selected","selected");
            $("#f2 [name='src']").find();
            $("#f2 [name='picturesrc']").val($(this).attr("psrc"));
        }
    }

    admin.init();
    admin.getlist();
    debugger;

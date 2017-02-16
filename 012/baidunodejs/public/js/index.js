$(function(){
    var i =1;
    
    var index = {
        type : "精选",
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            //初始化doT模板
            this.adapter = doT.template($("#item").html());
            this.navbtn = $(".cl li");
            this.morebtn = $(".more");
        },
        bind:function(){
            this.navbtn.click(this.change);
            this.morebtn.click(this.getlist);
        },
        //获取列表方法
        getlist:function () {
            $.ajax({

                url: "/newslist",
                type: "get",
                data: { type: index.type },
                datatype: "json",
                beforeSend: function () {

                },
                success: function (re) {
                    //$(".itemlist").empty();
                    $(".itemlist").append(index.adapter(re));
                }
            })
        },
        change:function () {
            index.type = $(this).text();
            $(".itemlist").empty();
            index.getlist();
        }
    }

    index.init();
    index.getlist();
})


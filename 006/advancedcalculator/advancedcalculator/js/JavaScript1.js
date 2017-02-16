if (!window.localStorage) {
    alert('浏览器不支持localStorage');
}
localStorage.m = 0;//初始化内存,内存数字
var lastnum = 0;//上一个数字
var thisnum = 0;//当前数字
var char = "";//计算符号
var answerflag = "";//记录上一个按钮是否是等号,如果是,按数字的时候作为一次新的计算
$(function () {
    //屏幕数字太长的话改变大小方法
    var changescreen = function (num) {
        if (thisnum.toString().length > 11) {
            $(".screen").css("font-size", "34px");
        }
        else {
            $(".screen").css("font-size", "70px");
        }
        if (localStorage.m != 0) {
            $(".micon").show();
        }
        else {
            $(".micon").hide();
        }
        if (num) {
            $(".screen").html(num);
        }
        else {
            $(".screen").html(thisnum);
        }
    }
    changescreen();
    //数字点击
    $(".num").click(function () {
        debugger;
        //如果 answerflag ==1 就说明thisnum展示的是答案 不需要拼接
        if (answerflag == "1") {
            lastnum = thisnum;
            thisnum = 0;
            answerflag = "";
        }
        else
        {
            //如果屏幕中最后一位是点 就拼接点
            if ($(".screen").html().indexOf(".") == $(".screen").html().length - 1) {
                thisnum = thisnum + ".";
            }
        }
        thisnum = parseFloat(thisnum + $(this).html());
        changescreen();
    })
    //全清按钮
    $(".clearall").click(function () {
        //localStorage.m = 0;//初始化内存
        lastnum = 0;
        thisnum = 0;
        answerflag = "";
        changescreen();
    });
    //加减运算符
    $(".plusorminus").click(function () {
        thisnum = thisnum * (-1);
        changescreen();
        answerflag = "";
    });
    //倒数运算符
    $(".reciprocal").click(function () {
        thisnum = parseFloat((1 / thisnum).toFixed(9));
        changescreen();
        answerflag = "";
    });
    //等号
    var answer = function () {
        if (char == "加") {
            //thisnum = lastnum + thisnum;
            thisnum = Math.formatFloat(lastnum + thisnum, 9)
        }
        else if (char == "减") {
            thisnum = Math.formatFloat(lastnum - thisnum, 9);
        }
        else if (char == "乘") {
            thisnum = Math.formatFloat(lastnum * thisnum, 9);
        }
        else if (char == "除") {
            if (thisnum == 0) {
                $(".screen").html("除数不能为0");
                return;
            }
            thisnum = Math.formatFloat(parseFloat(lastnum / thisnum).toFixed(9), 9); //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
        }

    }
    $("#equalsign").click(function () {
        answer();
        changescreen();
        answerflag = "1";
        char = ""
    });
    //加运算符
    $(".plus").click(function () {
        answer();
        lastnum = thisnum;
        thisnum = 0;
        char = "加";
        answerflag = "";
        changescreen(lastnum);
    });
    //减法运算符
    $(".subtraction").click(function () {
        answer();
        lastnum = thisnum;
        thisnum = 0;
        char = "减";
        answerflag = "";
        changescreen(lastnum);
    });
    //乘法运算符
    $(".multiplication").click(function () {
        answer();
        lastnum = thisnum;
        thisnum = 0;
        char = "乘";
        answerflag = "";
        changescreen(lastnum);
    });
    //除运算符
    $(".division").click(function () {
        answer();
        lastnum = thisnum;
        thisnum = 0;
        char = "除";
        answerflag = "";
        changescreen(lastnum);
    });
    //小数点点击方法
    $(".dot").click(function () {

        if (answerflag == "1") {
            lastnum = thisnum;
            thisnum = 0;
            answerflag = "";
        }
        if ($(".screen").html().indexOf(".") < 0) {
            var showstr = thisnum + ".";
            if (showstr.length > 11) {
                $(".screen").css("font-size", "34px");
            }
            $(".screen").html(showstr);
        }

    });

    //百分号 Math.sqrt(x)
    $(".percent").click(function () {
        lastnum = thisnum;
        thisnum = lastnum * 0.01;
        changescreen();
        answerflag = "1";
    });

    //开根号
    $(".evolution").click(function () {
        lastnum = thisnum;
        thisnum = Math.sqrt(lastnum);
        changescreen();
        answerflag = "1";
    });
    //sin
    $(".sin").click(function () {
        lastnum = thisnum;
        thisnum = Math.sin(lastnum);
        changescreen();
        answerflag = "1";
    });
    //cos
    $(".cos").click(function () {
        lastnum = thisnum;
        thisnum = Math.cos(lastnum);
        changescreen();
        answerflag = "1";
    });

    //存
    $(".save").click(function () {
        localStorage.m = thisnum;
        changescreen();
    });

    //取
    $(".load").click(function () {
        if (localStorage.m != 0) {
            thisnum = localStorage.m;
            changescreen();
        }
    });

    //累存
    $(".plussave").click(function () {

        if (localStorage.m != 0) {
            localStorage.m = parseFloat(localStorage.m) + parseFloat(thisnum);
            changescreen();
        }
    });

    //积存
    $(".multiplicationsave").click(function () {

        if (localStorage.m != 0) {
            localStorage.m *= parseFloat(thisnum);
            changescreen();
        }
    });

    //清存
    $(".clear").click(function () {
        localStorage.m = 0;
        changescreen();
    });

    Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }


})

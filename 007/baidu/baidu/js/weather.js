$(function () {
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function (_result) {
        if (remote_ip_info.ret == '1') {
            $.ajax({
                type: "GET",
                url: "http://wthrcdn.etouch.cn/weather_mini?city=" + remote_ip_info.city,
                data: "",
                success: function (msg) {
                    console.log(msg);
                    msg = JSON.parse(msg);
                    $("#city").text(msg.data.city + ":" + msg.data.wendu + "℃|" + msg.data.ganmao);

                    var myDate = new Date();
                    var date = myDate.toLocaleDateString();
                    $(".w_title").text(date);
                    //msg.data.forecast[0].date
                    var i = 0;
                    $(".w").each(function () {
                        $(this).children().eq(0).text(msg.data.forecast[i].date);
                        $(this).children().eq(1).attr("src", getWeatherPicture(msg.data.forecast[i].type));

                        $(this).children().eq(2).text(msg.data.forecast[i].low.replace("低温", "") + "-" + msg.data.forecast[i].high.replace("高温", ""));
                        $(this).children().eq(3).text(msg.data.forecast[i].type);
                        $(this).children().eq(4).text(msg.data.forecast[i].fengxiang + msg.data.forecast[i].fengli);
                        i++;
                    });
                }
            });
        }
    });

    var getWeatherPicture = function (str) {
        var url = "02";
        switch (str) {
            default:
            case "晴": url = "00"; break;
            case "多云": url = "01"; break;
            case "阴": url = "02"; break;
            case "阵雨": url = "03"; break;
            case "雷阵雨": url = "04"; break;
            case "小雨": url = "07"; break;
            case "中雨": url = "08"; break;
            case "大雨": url = "09"; break;

        }

        return "http://app1.showapi.com/weather/icon/day/" + url + ".png";
    }

})
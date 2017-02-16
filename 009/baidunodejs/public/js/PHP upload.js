$(function () {
    $("#pic").change(function () {

        debugger; upload();
    });
    var upload = function () {
        debugger;
        //准备formdata
        var fd = new FormData();
        fd.append("pic", $("#pic")[0].files[0]);
        //准备xhr
        var xhr = new XMLHttpRequest();

        xhr.onload = function (event) {
            console.log(xhr.responseText);
        }

        //进度
        xhr.onload.onprogress = function (event) {
            if (event.lengthComputable) {
                var precent = Math.round(event.loaded * 100 / event.total);
                console.log(precent + "%");
            }

        }
        xhr.onloadstart = function (e) {
            console.log("开始上传");
        }
        xhr.onerror = function (e) {
            console.log(e);
        }


        //上传
        xhr.open("post", "php/upload.php", true)
        xhr.send(fd);

        //完成后把路径自动填写
    }
})
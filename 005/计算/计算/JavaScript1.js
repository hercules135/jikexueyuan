var calculate = function (x, y, char) {
    if (char == "加") {
        return x + y;
    }
    else if (char == "减") {
        return x - y;
    }
    else if (char == "乘") {
        return x * y;
    }
    else if (char == "除") {
        if (y == 0) {
            alert("除数不能为0");
            return;
        }
        return parseFloat(x / y).toFixed(9); //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    }
}

var sub = function () {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var char = document.getElementById("char").value;
    if (!x || !y) {
        alert("数值不能为空");
        return;
    }
    x = parseFloat(x);
    y = parseFloat(y);
    if (isNaN(x) || isNaN(y)) {
        alert("请输入数字");
        return;
    }
    if (char == "除" && y == 0) {
        alert("除数不能为0");
        return;
    }
    document.getElementById("result").value = calculate(x, y, char);
}
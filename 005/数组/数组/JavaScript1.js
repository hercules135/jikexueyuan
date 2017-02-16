var arr = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a"];
var json = { "a": { char: "", num: 1, position: "" } };
function check2() {
    json = {};
    for (var i = 0; i < arr.length; i++) {
        if (json[arr[i]]) {
            json[arr[i]].num += 1;
            json[arr[i]].position.push(i);
        }
        else {
            //如果不存在就添加
            json[arr[i]] = { char: arr[i], num: 1, position: [i] };
        }
    }
    //找到最大的数

    var max = Object.keys(json).sort(function (a, b) {
        return json[a].num < json[b].num
    })[0];

    alert("最多出现的字符" + max + ",出现了" + json[max].num + "次,下标分别为" + json[max].position.join(","));
}
check2();






//alert(json["a"].num);
//function check() {
//    json = [];
//    //循环数组，完成JSON数据
//    for (var i = 0; i < arr.length; i++) {
//        flag = false;
//        for (var j = 0; j < json.length; j++) {
//            //如果存在这个字符，就num+1否则就添加这个字符
//            if (json[j].char ==arr[i]) {
//                flag = true;
//                json[j].num += 1;
//                break;
//            }
//        }
//        if (!flag) {
//            json.push({ char: arr[i], num: 1 });
//        }
//    }
//    //循环JSON数据，找到num最大的元素
//    var maxnum = 0;
//    var maxitem;
//    for (var i = 0; i < json.length; i++) {
//        if (maxnum<json[i].num) {
//            maxnum = json[i].num;
//            maxitem = json[i];
//        }
//    }
//    //找到位子
//    var position = "";
//    var positionarr = new Array();
//    var index = 0;
//    for (var i = 1; i <= maxnum; i++) {
//        //indexOf(x,y) y 表示开始检索的位置，要找下一个，就要从上一个位置后面开始
//        index = arr.indexOf(maxitem.char, index);
//        positionarr.push(index);
//        index += 1;
//        position = positionarr.join(',');
//    }
//    alert("最多出现的字符" + maxitem.char + ",出现了" + maxnum + "次,下标分别为" + position);
//    Object.keys(arr).sort(function () {

//    })
//}
//check();
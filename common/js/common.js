// 网络
// var url = "http://www.beyondwinlaw.com/api/mix_api/index.php/";
// 本地
// var url = "http://localhost/by/db3_api/index.php/";
var url = "http://localhost/by/cloud_api/index.php/";

// 1. 判断是否登录
function checkLogin(userId) {
    // 如果没有登录直接访问界面,就跳转到登录界面
    if (userId == null || userId == undefined || userId == "") {
        alert("登陆过期, 单击确定跳转到登陆界面");
        window.location.href = "../index.html";
    }
}
// 2. 修改密码
function editPass($scope, md5, queryData) {
    $scope.old_pass = "";
    $scope.new_pass = "";
    $scope.second_new_pass = "";
    $scope.editPass = function () {
        var data = {uid: uid, old_pass: md5.createHash($scope.old_pass), new_pass: md5.createHash($scope.new_pass)};
        if ($scope.new_pass != $scope.second_new_pass) {
            alert("两次输入密码不一致");
        }
        else {
            queryData.postData("user/pass_update", data).then(function (data) {
                alert(data.message);
                console.log(data);
            });
        }
    };
}

// 3 城市联动
function city($scope, $http) {
    $http.get("../common/json/city.json").success(function (data) {
        $scope.provinceData = data;
        //$scope.province = data[0].name;
    });
}
// 4. console.log()公用
function consoleLog(data) {
    console.log(data);
}

// 1. 获取窗口高度
function rightHeight() {
    var bodyHeight = $(window).height() - 55;
    $(".right").css("min-height", bodyHeight);
}
window.onresize = function () {
    rightHeight();
};

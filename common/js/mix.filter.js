angular.module("mix.filter", [])
.filter("homeFilter", function() {
    return function() {

    }
})
// splitArr
.filter('splitArr', function () {
    return function (str) {
        // 刚加载 先判断一下 如果为空 那么就停止执行, 如果有值,那么菜分割
        if (str == undefined) {
            return "";
        }
        var splitArr = str.split("##");
        return splitArr;
    }
});
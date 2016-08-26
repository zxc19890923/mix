/* 自定义指令(输入法院模糊查找) */
angular.module("mix.directive", [])
    .directive('selectCourt', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.errorInfo = "请输入法院名称";
                scope.scope.angularShowInfo = false;
                element.on("keyup", function () {
                    // scope.$watch('searchVal', function (newVal) {
                    queryData.getData("court/court_search", {name: encodeURI(element.val())}, true).then(function (data) {
                        if (data.status == true) {
                            scope.searchData = data.data;
                            consoleLog(data);
                        }
                        else {
                            scope.errorInfo = "没有查找到法院,请重新输入";
                            scope.searchData = "";
                        }
                    });
                    // })
                })
            }
        }
    })
    /* 自定义获取年份的指令 */
    .directive("getYear", function ($http) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                $http.get("../common/json/year.json").success(function (data) {
                    scope.yearList = data;
                    console.log(data);
                });
            }
        }
    })

    /* 自定义获取出生年份的指令 */
    .directive("getBirthYear", function ($http) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                $http.get("../common/json/birthYear.json").success(function (data) {
                    scope.birthYearList = data;
                })
            }
        }
    })

    /* 自定义手机验证的指令 */
    .directive("checkPhone", function ($http, queryData) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.on("change", function () {
                    queryData.getData("lawyer/check_phone", {phone: element.val()}).then(function (data) {
                        scope.message = data;
                        consoleLog(element.val());
                        consoleLog(data);
                        if (data.status == false) {
                            scope.phoneMessage = data.message;
                            scope.phone = "";
                            return false;
                        }
                        else {
                            scope.phoneMessage = "";
                        }
                    });
                })
            }
        }
    })

    /* 封装jquery进度百分比的插件指令 */
    .directive("radialDirective", function () {
        return {
            restrict: 'EA',
            scope: {},
            //template: '<div class="prg-cont rad-prg" id="indicatorContainer"></div>',
            link: function (scope, element, attrs) {
                var num = attrs.id * 3.6;
                if (num <= 180) {
                    element.parent().parent().find('.right').css('transform', "rotate(" + num + "deg)");
                }
                else {
                    element.parent().parent().find('.right').css('transform', "rotate(180deg)");
                    element.parent().parent().find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
                }
            }
        }
    })

    /* 单击收藏, 单击取消收藏 指令 */
    .directive("cancelcollectionOrCollection", function ($location, queryData) {
        return {
            restrict: "AE",
            link: function (scope, element, attrs) {
                // 基本信息中后台返回一个,是否收藏的参数,判断星星的颜色,然后根据参数判断是收藏还是取消收藏.

                element.on("click", function () {
                    if (attrs.collection == "") {
                        if (element.attr("class") == "fa fa-star-o") {
                            element.attr("class", "fa fa-star").css("color", "#ffb70a");
                        }
                        else {
                            element.attr("class", "fa fa-star-o").css("color", "#333");
                        }

                        var data = {
                            uid: uid,
                            clid: attrs.id,
                            type: 2,
                            collection_id: attrs.collection
                        };
                        queryData.postData("user/collection", data).then(function (data) {
                            consoleLog(data);
                            window.location.reload();
                        });
                    }
                    else {
                        data = {
                            collection_id: attrs.collection
                        };
                        queryData.getData("user/collection_delete", data).then(function (data) {
                            consoleLog(data);
                            window.location.reload();
                        });
                    }
                });

            }
        }
    })

    .directive("clickChangeColor", function () {
        return {
            restrict: "AEC",
            link: function (scope, element, attrs) {
                element.on("click", function () {
                    element.addClass("text-primary");
                    element.parent().siblings().find("a").removeClass("text-primary");
                })
            }
        }
    });
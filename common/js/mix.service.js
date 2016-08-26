/* ui-route 路由器, 文件上传依赖 ngFileUpload
 *
 *  使用说明:
 *  get 方法
 *  接口: api
 *  参数: params 对象
 *  queryData.getData("api", params).then(function(data) {
 *       console.log(data);
 *  }
 *
 *  p  ost请求同理
 *
 */
angular.module("mix.service", [])
    .factory("queryData", function ($http, $q) {
        var resultData = {};
        /* get方法获取数据 */
        resultData.getData = function (urlParams, params, state) {
            var deferred = $q.defer();
            /* get方法获取数据 */
            $http.get(url + urlParams, {params: params}, {cache: state}).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
                    window.location.href = "../index.html"
                }
                else {
                    alert(status + " 错误");
                }
                return false;
            });
            return deferred.promise;
        };
        /* post方法获取数据 */
        resultData.postData = function (urlParams, data) {
            var deferred = $q.defer();
            /* post方法获取数据 */
            $http.post(url + urlParams, data).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
                    window.location.href = "../index.html"
                }
                else {
                    alert(status + " 错误");
                }
                return false;
            });
            return deferred.promise;
        };
        return resultData;
    })
    /* 创建获取数据的服务 结束 */
    // 退出登录服务
    .factory("signOut", function (queryData) {
        var outInfo = {};
        outInfo.out = function () {
            sessionStorage.clear();
            var params = {};
            queryData.getData("login/logout", params).then(function (data) {
                if (data.status == true) {
                    window.location.href = "../gw/login.html";
                    return data.message;
                }
                else {
                    return data.message;
                }
            })
        };
        return outInfo;
    })
    // 省市联动服务
    .factory("provinceCity", function (queryData, $http, $q) {
        var provinceCity = {};
        provinceCity.province = function () {
            var defered = $q.defer();
            $http.get("../common/json/city.json").success(function (data) {
                defered.resolve(data);
            }).error(function (data) {
                defered.reject(data);
            });
            return defered.promise;
        };
        return provinceCity;
    });



  
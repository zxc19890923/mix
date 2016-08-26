/**
 * Created by liuchungui on 16/8/24.
 */
/**
 * 对项目的服务模块, 依赖于mix.service模块
 */

angular.module('project.service', ['mix.service'])
    //项目模块
    .factory("projectModule", ['queryData', function (queryData) {
        return {
            /**
             * 通过项目查询项目模块
             * @param $params
             */
            query: function ($params) {
                return queryData.getData('common/project_modules', $params);
            }
        }
    }])
    //项目条目模块
    .factory("projectModuleItem", ['queryData', function (queryData) {
        return {
            /**
             * 查询项目模块的条目
             * @param $params
             * @returns {string}
             */
            query: function ($params) {
                // 返回条目
                return queryData.getData("common/items", $params);
            }
        };
    }]);

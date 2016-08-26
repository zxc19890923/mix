/**
 * Created by liuchungui on 16/8/19.
 */

var lawyerApp = angular.module("lawyerApp", ["ui.router", "ui.bootstrap", "ng.ueditor", "w5c.validator", "mix.service", "mix.directive", "mix.filter", "ngFileUpload", "project.service"]);

// 配置表单验证
lawyerApp.config(function (w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
        blurTrig: true,
        showError: true,
        removeError: true

    });
    w5cValidatorProvider.setRules({
        name: {
            required: "输入的用户名不能为空",
            pattern: "用户名必须输入字母、数字、下划线,以字母开头"
        },
        phone: {
            required: "输入手机号码不能为空",
            number: "手机号码格式不正确"
        }
    });
});
// 路由控制
lawyerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/account");
    $stateProvider
    // 项目管理
        .state("account", {
            url: "/account",
            templateUrl: "account.html",
            controller: accountCtrl
        })
        .state("projects", {
            url: "/projects",
            templateUrl: "projectList.html",
            controller: projectsListCtrl
        })
        .state("projectDetail", {
            url: "/projectDetail/:id",
            templateUrl: "projectDetail.html",
            controller: projectDetailController
        })
        .state("projectDetail.speed", {
            url:"/speed",
            templateUrl: "speed.html",
            controller: projectSpeedController
        })
        .state("projectDetail.supervision", {
            url:"/projectSupervision",
            templateUrl: "projectSupervision.html",
            controller: projectSupervisionController
        })
        .state("projectDetail.projectInfo", {
            url:"/projectInfo",
            templateUrl: "projectInfo.html",
            controller: projectInfoController
        })
        .state("projectDetail.projectPerson", {
            url:"/projectPerson",
            templateUrl: "projectPerson.html",
            controller: projectPersonController
        })
        .state("projectDetail.projectFiles", {
            url:"/projectFiles",
            templateUrl: "projectFiles.html",
            controller: projectFilesController
        })
        .state("projectDetail.projectToDo", {
            url:"/projectToDo",
            templateUrl: "projectToDo.html",
            controller: projectToDoController
        })
        //文件列表
        .state("projectDetail.fileOne", {
            url: "/fileOne",
            templateUrl: "projectFileList.html",
            controller: projectFileListController
        })
        .state("projectDetail.fileTwo", {
            url: "/fileTwo",
            templateUrl: "projectFileList.html",
            controller: projectFileListController
        })
        .state("projectDetail.fileThree", {
            url: "/fileThree",
            templateUrl: "projectFileList.html",
            controller: projectFileListController
        })
        .state("projectDetail.fileFour", {
            url: "/fileFour",
            templateUrl: "projectFileList.html",
            controller: projectFileListController
        })
});

// 配置界面公共的控制器, 比如退出登录, 查看用户信息, 修改密码 (获取数据服务, 退出登录服务, 单击标题效果服务)
lawyerApp.controller("commonCtrl", function ($scope, queryData, signOut) {
    $scope.signOut = function () {
        signOut.out();
    };

    $scope.navigationItems = [
        {
            name: '档案管理',
            item: 'account'
        },
        {
            name: '项目管理',
            item: 'projects'
        }
    ];
    $scope.selectedIndex = sessionStorage.getItem('selectedIndex');
    if($scope.selectedIndex == undefined) {
        $scope.selectedIndex = 0;
    }
    $scope.selectedItem = function (row) {
        $scope.selectedIndex = row;
        sessionStorage.setItem('selectedIndex', row);
    }
});

function projectsListCtrl($scope, queryData) {
    // 这是卸载common.js文件中, 设置有半部分高度,从而添加背景颜色的方法.
    rightHeight();
    //跳转详情页的key
    var detailSelectKey = sessionStorage.getItem('detailSelectKey');
    if(detailSelectKey == undefined) {
       detailSelectKey = 'projectSupervision';
    }
    $scope.detailSelectKey = detailSelectKey;

    // 默认项目状态
    $scope.status = "所有";
    // 分页数据
    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
    // 单击分页
    $scope.pageChanged = function (page) {

    };
}

/**
 * 项目详情控制器
 * @param $scope
 * @param queryData
 */
function projectDetailController($scope, queryData) {
    // 这是卸载common.js文件中, 设置有半部分高度,从而添加背景颜色的方法.
    rightHeight();
    /**
     * 对详情页的导航配置
     */
    $scope.navigationItems = [
        {
            name: '案件督办',
            key: 'projectSupervision'
        },
        {
            name: '进度',
            key: 'speed'
        },
        {
            name: '项目信息',
            key: 'projectInfo'
        },
        {
            name: '参与人员',
            key: 'projectPerson'
        },
        {
            name: '文件',
            key: 'projectFiles'
        }
    ];
    $scope.detailSelectIndex = sessionStorage.getItem('detailSelectIndex');
    if($scope.detailSelectIndex == undefined) {
        $scope.detailSelectIndex = 0;
    }
    $scope.selectedItem = function (row) {
        $scope.detailSelectIndex = row;
        sessionStorage.setItem('detailSelectKey', $scope.navigationItems[row].key);
        sessionStorage.setItem('detailSelectIndex', row);
    }

    $scope.projectName = "王宝强离婚案";
    $scope.projectNum = "BY-768";
}

/**
 * 项目进度控制器
 * @param $scope
 * @param queryData
 */
function projectSpeedController($scope, queryData) {
    
}

/**
 * 案件督办
 * @param $scope
 * @param queryData
 */
function projectSupervisionController($scope, projectModule) {
    projectId = 92;
    userId = 10;

    //请求项目模块
    projectModule.query({uid: userId, pid: projectId}).then(function (data) {
        $scope.moduleArray = data.data;
        consoleLog($scope.moduleArray);
    });

    //保存项目模块
    $scope.saveModule = function (info) {
        sessionStorage.setItem('moduleName', info.module);
        sessionStorage.setItem('moduleId', info.mid);
        sessionStorage.setItem('projectModuleId', info.pmid);
    };
}

/**
 * 项目基本信息控制器
 * @param $scope
 * @param queryData
 */
function projectInfoController($scope, queryData) {

}

/**
 * 项目参与人信息
 * @param $scope
 * @param queryData
 */
function projectPersonController($scope, queryData) {

}

/**
 * 项目文件信息控制器
 * @param $scope
 * @param queryData
 */
function projectFilesController($scope, queryData) {

}

/**
 * 项目文件列表控制器
 * @param $scope
 * @param queryData
 */
function projectFileListController($scope, queryData) {
    
}

/**
 * 项目代办事项控制器
 * @param $scope
 * @param queryData
 */
function projectToDoController($scope, queryData, projectModuleItem) {
    // 调取模块名称 显示
    $scope.moduleName = sessionStorage.getItem("moduleName");
    var projectModuleId = sessionStorage.getItem("projectModuleId");

    var userId = 10;
    //查询条目
    projectModuleItem.query({pmid: projectModuleId, uid: userId}).then(function (data) {
        $scope.projectModuleData = data;
    });

    function projectItem($scope, $http, data) {
        if (confirm("确定提交吗?")) {
            $http.post(url + "common/item_update", data).success(function (result) {
                if (result.status == true) {
                    consoleLog(result);
                    window.location.reload();
                }
                else {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                }
            })
        }
    }

    // type==0选择复选框,传递参数,调接口
    $scope.itemChange = function (pmiid, detail, mid, pid, pmid) {
        $scope.pmiid = pmiid;
        $scope.detail = detail;
        $scope.mid = mid;
        $scope.pid = pid;
        $scope.pmid = pmid;

        var data = {
            pmiid: $scope.pmiid,
            uid: id,
            item_detail: $scope.detail,
            mid: $scope.mid,
            pid: $scope.pid,
            pmid: $scope.pmid,
            operate: 0
        };
        // 调用定义的公共接口 操作条目
        projectItem($scope, $http, data);
    };
    //type == 1
    $scope.itemChangeType = function (pmiid, detail, mid, pid, pmid) {
        $scope.pmiid = pmiid;
        $scope.detail = detail;
        $scope.mid = mid;
        $scope.pid = pid;
        $scope.pmid = pmid;
    };
    // type==2
    $scope.fileTypeTwo = function (stime, sadd) {
        var data = {
            pmiid: $scope.pmiid,
            uid: id,
            item_detail: $scope.detail,
            mid: $scope.mid,
            pid: $scope.pid,
            pmid: $scope.pmid,
            trial_time: stime,
            trial_addr: sadd,
            operate: 2
        };
        consoleLog(data);
        // 调用定义的公共接口 操作条目
        projectItem($scope, $http, data);
    };
    // type==3
    $scope.fileTypeThree = function (tname, tfirm, tdepartment, tposition, tphone, ttel, temail) {
        var data = {
            pmiid: $scope.pmiid,
            uid: id,
            item_detail: $scope.detail,
            mid: $scope.mid,
            pid: $scope.pid,
            pmid: $scope.pmid,
            name: tname,
            firm: tfirm,
            department: tdepartment,
            position: tposition,
            phone: tphone,
            tel: ttel,
            email: temail,
            operate: 3
        };
        consoleLog(data);
        // 调用定义的公共接口 操作条目
        projectItem($scope, $http, data);
    };
    // type==5
    $scope.fileTypeFive = function (stime, sadd) {
        var data = {
            pmiid: $scope.pmiid,
            uid: id,
            item_detail: $scope.detail,
            mid: $scope.mid,
            pid: $scope.pid,
            pmid: $scope.pmid,
            trial_time: stime,
            trial_addr: sadd,
            operate: 5
        };
        consoleLog(data);
        // 调用定义的公共接口 操作条目
        projectItem($scope, $http, data);
    };
}

// 操作条目 如果type = 1 条目操作上传材料
lawyerApp.controller("itemUploadFile", ['$scope', 'Upload', function ($scope, Upload) {
    $scope.fileInfo = $scope.file;
    $scope.fileTypeOne = function () {
        $scope.upload($scope.file);
    };
    $scope.upload = function (file) {
        Upload.upload({
            url: url + 'common/item_update',
            data: {
                pmiid: $scope.pmiid,
                uid: id,
                item_detail: $scope.detail,
                mid: $scope.mid,
                pid: $scope.pid,
                pmid: $scope.pmid,
                file: file,
                file_type: $scope.fileType,
                operate: 1
            }
            //成功的情况
        }).progress(function (evt) {
            //这就是进度的对象
            consoleLog(evt);
            //进度条
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.pro = progressPercentage;
            consoleLog('progess:' + progressPercentage + '%');
            $(".progress-striped").show();
            $scope.progress = $scope.pro;
            //失败的情况
        }).success(function (data, status, headers, config) {
            if (data.status == true) {
                window.location.reload();
            }
            else {
                alert("上传失败,请检查文件大小");
                window.location.reload();
            }
            consoleLog(data);
        }).error(function (data) {
            consoleLog(data);
        })
    }
}]);


// 客户管理控制器
function accountCtrl($scope, $http, queryData) {
    //假数据 http://localhost/by/db3_api/index.php/lawyer/lawyer?lawyer_id=1827
    var params = {
        lawyer_id: 1827
    };
    // queryData.getData("lawyer/lawyer", params).then(function (data) {
    //     /* 律师基本信息,法院信息,检察院信息,公安信息 */
    //     $scope.lawyer = data.data.lawyer;
    //     if(data.data.lawyer_court == undefined) {
    //         $scope.lawyer_court = {};
    //     }
    //     else {
    //         $scope.lawyer_court = data.data.lawyer_court;
    //     }
    //     if(data.data.lawyer_procuratorate == undefined) {
    //         $scope.lawyer_procuratorate = {};
    //     }
    //     else {
    //         $scope.lawyer_procuratorate = data.data.lawyer_procuratorate;
    //     }
    //     if(data.data.lawyer_police == undefined) {
    //         $scope.lawyer_police = {};
    //     }
    //     else {
    //         $scope.lawyer_police = data.data.lawyer_police;
    //     }
    //
    //
    //     // 为了设置,修改法院选中的值, 如果是法院信息
    //     if ($scope.lawyer_court != undefined) {
    //         $scope.holder = $scope.lawyer_court.court;
    //         if ($scope.lawyer_court.start_time != null) {
    //             var startTime = $scope.lawyer_court.start_time.split("-");
    //             $scope.lawyer_court.start_time_year = startTime[0];
    //             $scope.lawyer_court.start_time_month = startTime[1];
    //         }
    //         if ($scope.lawyer_court.end_time != null) {
    //             var endTime = $scope.lawyer_court.end_time.split("-");
    //             $scope.lawyer_court.end_time_year = endTime[0];
    //             $scope.lawyer_court.end_time_month = endTime[1];
    //             consoleLog(startTime[1]);
    //         }
    //     }
    //     // 设置检察院年月
    //     if ($scope.lawyer_procuratorate != undefined) {
    //         if ($scope.lawyer_procuratorate.start_time != null) {
    //             startTime = $scope.lawyer_procuratorate.start_time.split("-");
    //             $scope.lawyer_procuratorate.start_time_year = startTime[0];
    //             $scope.lawyer_procuratorate.start_time_month = startTime[1];
    //         }
    //         if ($scope.lawyer_procuratorate.end_time != null) {
    //             endTime = $scope.lawyer_procuratorate.end_time.split("-");
    //             $scope.lawyer_procuratorate.end_time_year = endTime[0];
    //             $scope.lawyer_procuratorate.end_time_month = endTime[1];
    //             consoleLog(startTime[1]);
    //         }
    //     }
    //     // 设置公安年月
    //     if ($scope.lawyer_police != undefined) {
    //         if ($scope.lawyer_police.start_time != null) {
    //             startTime = $scope.lawyer_police.start_time.split("-");
    //             $scope.lawyer_police.start_time_year = startTime[0];
    //             $scope.lawyer_police.start_time_month = startTime[1];
    //         }
    //         if ($scope.lawyer_police.end_time || null) {
    //             endTime = $scope.lawyer_police.end_time.split("-");
    //             $scope.lawyer_police.end_time_year = endTime[0];
    //             $scope.lawyer_police.end_time_month = endTime[1];
    //             consoleLog(startTime[1]);
    //         }
    //     }
    //     consoleLog(data);
    //     // 传递上传头像的参数, 显示头像对象
    //     $scope.files = data.data.file;
    //
    //     $scope.lawyer_id = data.data.lawyer.id;
    //     $scope.file_id = data.data.file.file_id;
    // });

    // 加载省份和年份
    $scope.city = function () {
        city($scope, $http);
    };
    // 修改信息
    $scope.editLawyer = function (lawyer_id) {
        if ($scope.lawyer.admin_case == true) {
            $scope.lawyer.admin_case = "是";
        }
        else {
            $scope.lawyer.admin_case = "否";
        }
        var data = {
            lawyer_id: lawyer_id,
            name: $scope.lawyer.name,
            phone: $scope.lawyer.phone,
            country: "中国",
            province: $scope.lawyer.province,
            firm: $scope.lawyer.firm,
            practice_area: $scope.lawyer.practice_area,
            license_number: $scope.lawyer.license_number,
            birth: $scope.lawyer.birth,
            sex: $scope.lawyer.sex,
            city: $scope.lawyer.city,
            address: $scope.lawyer.address,
            school: $scope.lawyer.school,
            position: $scope.lawyer.position,
            admin_case: $scope.lawyer.admin_case,
            income: $scope.lawyer.income,
            team_scale: $scope.lawyer.team_scale,
            remarks: $scope.lawyer.remarks,
            is_middle: $scope.lawyer.is_middle,
            judicial_type: "没有"
        };
        if ($scope.lawyer.judicial_type == "法院") {
            // 默认值 法院
            data = {
                lawyer_id: lawyer_id,
                name: $scope.lawyer.name,
                phone: $scope.lawyer.phone,
                country: "中国",
                province: $scope.lawyer.province,
                firm: $scope.lawyer.firm,
                practice_area: $scope.lawyer.practice_area,
                license_number: $scope.lawyer.license_number,
                birth: $scope.lawyer.birth,
                sex: $scope.lawyer.sex,
                city: $scope.lawyer.city,
                address: $scope.lawyer.address,
                school: $scope.lawyer.school,
                position: $scope.lawyer.position,
                admin_case: $scope.lawyer.admin_case,
                income: $scope.lawyer.income,
                team_scale: $scope.lawyer.team_scale,
                remarks: $scope.lawyer.remarks,
                is_middle: $scope.lawyer.is_middle,
                judicial_type: "法院",

                court: $scope.court,
                case_type: $scope.case_type,
                job_duty: $scope.lawyer_court.job_duty,
                start_time: $scope.lawyer_court.start_time_year + "-" + $scope.lawyer_court.start_time_month,
                end_time: $scope.lawyer_court.end_time_year + "-" + $scope.lawyer_court.end_time_month,
                court_level: $scope.lawyer_court.court_level
            };
            consoleLog(data);
        }
        if ($scope.lawyer.judicial_type == "检察院") {
            // 检察院
            data = {
                lawyer_id: lawyer_id,
                name: $scope.lawyer.name,
                phone: $scope.lawyer.phone,
                country: "中国",
                province: $scope.lawyer.province,
                firm: $scope.lawyer.firm,
                practice_area: $scope.lawyer.practice_area,
                license_number: $scope.lawyer.license_number,
                birth: $scope.lawyer.birth,
                sex: $scope.lawyer.sex,
                city: $scope.lawyer.city,
                address: $scope.lawyer.address,
                school: $scope.lawyer.school,
                position: $scope.lawyer.position,
                admin_case: $scope.lawyer.admin_case,
                income: $scope.lawyer.income,
                team_scale: $scope.lawyer.team_scale,
                remarks: $scope.lawyer.remarks,
                is_middle: $scope.lawyer.is_middle,
                judicial_type: "检察院",

                procuratorate: $scope.lawyer_procuratorate.procuratorate,
                job_duty: $scope.lawyer_procuratorate.job_duty,
                start_time: $scope.lawyer_procuratorate.start_time_year + "-" + $scope.lawyer_procuratorate.start_time_month,
                end_time: $scope.lawyer_procuratorate.end_time_year + "-" + $scope.lawyer_procuratorate.end_time_month
            };
            consoleLog(data);
        }
        if ($scope.lawyer.judicial_type == "公安") {
            // 公安
            data = {
                lawyer_id: lawyer_id,
                name: $scope.lawyer.name,
                phone: $scope.lawyer.phone,
                country: "中国",
                province: $scope.lawyer.province,
                firm: $scope.lawyer.firm,
                practice_area: $scope.lawyer.practice_area,
                license_number: $scope.lawyer.license_number,
                birth: $scope.lawyer.birth,
                sex: $scope.lawyer.sex,
                city: $scope.lawyer.city,
                address: $scope.lawyer.address,
                school: $scope.lawyer.school,
                position: $scope.lawyer.position,
                admin_case: $scope.lawyer.admin_case,
                income: $scope.lawyer.income,
                team_scale: $scope.lawyer.team_scale,
                remarks: $scope.lawyer.remarks,
                is_middle: $scope.lawyer.is_middle,
                judicial_type: "公安",

                police: $scope.lawyer_police.police,
                start_time: $scope.lawyer_police.start_time_year + "-" + $scope.lawyer_police.start_time_month,
                end_time: $scope.lawyer_police.end_time_year + "-" + $scope.lawyer_police.end_time_month,
                level: $scope.lawyer_police.level
            };
            consoleLog(data);
        }
        if ($scope.lawyer.name == "" || $scope.lawyer.name == undefined) {
            $(".name").focus();
            return false;
        }
        if ($scope.lawyer.province == "" || $scope.lawyer.province == undefined) {
            $(".province").focus();
            return false;
        }
        if ($scope.lawyer.practice_area == "" || $scope.lawyer.practice_area == undefined) {
            $(".practice_area").focus();
            return false;
        }
        if (confirm("您确定修改吗?")) {
            queryData.postData("lawyer/lawyer_insert_or_update", data).then(function (data) {
                if (data.status == false) {
                    $("#warnMsg").text(data.message);
                    consoleLog(data);
                    return false;
                }
                else {
                    $scope.warnMessage = "";
                    consoleLog(data);
                    window.location.reload();
                }
            });

        }
    };

    /* 搜索到法院,单击赋值 */
    $scope.changeVal = function (newVal, pro) {
        $scope.searchVal = newVal;
        $scope.court = newVal;
        $scope.matchingprovince = pro;
        $(".resultList").hide();
    };
    $scope.showList = function () {
        $(".resultList").show();
        $(".search").focus();
        $scope.searchVal = "";
    };
    /* 初始化出生年份 */
    $scope.birth = "1980";

    /* 上传头像 依赖Upload服务 */
    /* 注意: 这里要获取基本信息里面的信息, 从在异步加载问 */
    $scope.uploadUser = function () {
        $scope.upload($scope.file);
    };
    $scope.upload = function (file) {
        Upload.upload({
            url: url + 'lawyer/lawyer_photo_upload',
            data: {file: file, lawyer_id: $scope.lawyer_id, file_id: $scope.file_id}
        }).progress(function (evt) {    // 进度
            $(".progress-striped").show();
        }).success(function (data, status, headers, config) { //成功的情况
            window.location.reload();
            consoleLog(data);
            //失败的情况
        }).error(function (data, status) {
            alert(status + "错误");
            return false;
            consoleLog(data);
        })
    };
    
    

    // return;
    //假数据
    $scope.files = {
        file_id: "",
        lawyer_id: "",
        url:"../common/images/male.jpg"
    };
    $scope.lawyer = {
        name: "测试",
        address: "联系地",
        admin_case: "否",
        birth: "1980",
        city: "延庆",
        country: "中国",
        create_time: "2016-07-07 14:57:01",
        firm: "乾成律师事务所",
        id: "1827",
        income: "100万以内",
        input_mode: "律师入驻",
        is_middle: "",
        judicial_type: "法院",
        license_number: "1243124124",
        phone: "13811234189",
        position: "律师",
        practice_area: "民商事",
        province: "北京",
        remarks: "sdfsfw",
        school: "",
        sex: "男",
        team_scale: "无",
    };
    $scope.lawyer_court = {
        case_type: "民商事",
        court: "千阳县人民法院",
        court_level: "最高院",
        end_time: "1955-03",
        end_time_month: "03",
        end_time_year: "1955",
        id: "895",
        job_duty: "副院长",
        lawyer_id: "1827",
        start_time: "1951-02",
        start_time_month: "02",
        start_time_year: "1951"
    };



}


// //项目列表控制器
// lawyerApp.controller('projectListCtrl', function ($scope, queryData) {
//     // 这是卸载common.js文件中, 设置有半部分高度,从而添加背景颜色的方法.
//     rightHeight();
//     $scope.items = [
//         "档案管理",
//         "项目管理"
//     ];
//
//     // 默认项目状态
//     $scope.status = "所有";
//     // 分页数据
//     $scope.totalItems = 64;
//     $scope.currentPage = 4;
//     $scope.maxSize = 5;
//     $scope.bigTotalItems = 175;
//     $scope.bigCurrentPage = 1;
//     // 单击分页
//     $scope.pageChanged = function (page) {
//
//     };
// });
//
// //个人信息控制器
// lawyerApp.controller('accountCtrl', function ($scope) {
//
// });


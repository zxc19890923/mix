var salesApp = angular.module("salesApp", ["ui.router", "ui.bootstrap", "ng.ueditor", "w5c.validator", "ngFileUpload", "mix.service", "mix.directive", "mix.filter"]);
// 配置界面公共的控制器, 比如退出登录, 查看用户信息, 修改密码 (获取数据服务, 退出登录服务, 单击标题效果服务)
salesApp.controller("commonCtrl", function ($scope, queryData, signOut) {
    $scope.signOut = function () {
        signOut.out();
    };
    $scope.selectedIndex = sessionStorage.getItem('selectedIndex');
    if($scope.selectedIndex == undefined) {
        $scope.selectedIndex = 0;
    }
    $scope.selectedItem = function (row) {
        $scope.selectedIndex = row;
        sessionStorage.setItem('selectedIndex', row);
    }
});
// 配置表单验证
salesApp.config(function (w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
        blurTrig: true,
        showError: true,
        removeError: true

    });
    w5cValidatorProvider.setRules({
        name: {
            required: "姓名不能为空"
        },
        phone: {
            required: "输入手机号码不能为空",
            number: "手机号码格式不正确"
        },
        firm: {
            required: "机构名称不能为空"
        }
    });
});
// 路由控制
salesApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/projects");
    $stateProvider
    // 项目管理
        .state("projects", {
            url: "/projects",
            templateUrl: "projects.html",
            controller: projectsListCtrl
        })
        // 项目列表
        .state("projects.list", {
            url: "/list",
            templateUrl: "projectList.html",
            controller: projectsListCtrl
        })
        .state("projects.info", {
            url: "/list/:id",
            templateUrl: "project_info.html",
            controller: projectInfoCtrl
        })
        // 进度 评估信息 项目信息 参与人员 文件 控制器
        .state("projects.info.speed", {
            url: "/speed",
            templateUrl: "speed.html",
            controller: projectSpeedCtrl
        })
        .state("projects.info.assessment", {
            url: "/assessment",
            templateUrl: "assessment.html",
            controller: projectAssessmentCtrl
        })
        .state("projects.info.project", {
            url: "/project",
            templateUrl: "project.html",
            controller: projectCtrl
        })
        .state("projects.info.person", {
            url: "/person",
            templateUrl: "person.html",
            controller: projectPersonCtrl
        })
        .state("projects.info.files", {
            url: "/files",
            templateUrl: "files.html",
            controller: filesCtrl
        })
        .state("projects.info.fileOne", {
            url: "/fileOne",
            templateUrl: "file.html",
            controller: fileCtrl
        })
        .state("projects.info.fileTwo", {
            url: "/fileTwo",
            templateUrl: "file.html",
            controller: fileCtrl
        })
        .state("projects.info.fileThree", {
            url: "/fileThree",
            templateUrl: "file.html",
            controller: fileCtrl
        })
        .state("projects.info.fileFour", {
            url: "/fileFour",
            templateUrl: "file.html",
            controller: fileCtrl
        })
        // 新建项目
        .state("projects.new", {
            url: "/new",
            templateUrl: "projectNew.html",
            controller: newOneCtrl
        })
        .state("projects.new.one", {
            url: "/one",
            templateUrl: "client_info.html",
            controller: newOneCtrl
        })
        .state("projects.new.two", {
            url: "/two",
            templateUrl: "party_info.html",
            controller: newTwoCtrl
        })
        .state("projects.new.three", {
            url: "/three",
            templateUrl: "middle_info.html",
            controller: newThreeCtrl
        })
        .state("projects.new.four", {
            url: "/four",
            templateUrl: "case_info.html",
            controller: newFourCtrl
        })
        .state("projects.new.five", {
            url: "/five",
            templateUrl: "upload_file.html",
            controller: newFiveCtrl
        })

        /* 客户管理 */
        .state("customers", {
            url: "/customers",
            templateUrl: "customers.html",
            controller: customerListCtrl       //提前加载customerListCtrl控制
        })
        .state("customers.list", {
            url: "/list",
            templateUrl: "customer_list.html",
            controller: customerListCtrl
        })
        .state("customers.info", {
            url: "/info/:id",
            templateUrl: "customer_info.html",
            controller: customerInfoCtrl
        })
        .state("customers.new", {
            url: "/new",
            templateUrl: "add_customer.html",
            controller: addCustomerCtrl
        })
        .state("customers.collect", {
            url: "/collect",
            templateUrl: "customer_list.html",
            controller: customerCollectCtrl
        })

        /* 渠道管理 */
        .state("middles", {
            url: "/middles",
            templateUrl: "middles.html",
            controller: middlesCtrl
        })
});
// 控制器
// 项目管理控制器
function projectsListCtrl($scope, $rootScope, queryData) {
    // 左边栏选中状态全局变量
    $rootScope.listStatus = "text-primary";
    $rootScope.newStatus = "";

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

    $scope.sign = {
        result: 0
    }
}
// 每个项目的基本信息控制器 (进度, 评估信息, 项目信息, 参与人员, 文件上传)
function projectInfoCtrl($scope, $rootScope, $stateParams, queryData) {
    // 这是写在common.js文件中, 设置右半部分高度,从而添加背景颜色的方法.
    $rootScope.speed = "text-primary";
    rightHeight();
}
function projectSpeedCtrl($scope, $rootScope, $state, $stateParams, queryData) {
    $rootScope.speed = "text-primary";
    $rootScope.assessment = "";
    $rootScope.person = "";
    $rootScope.project = "";
    $rootScope.files = "";

    // 控制展开合并
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;

    // 界面刷新
    // $state.forceReload();
}
function projectAssessmentCtrl($scope, $rootScope, $state, $stateParams, queryData) {
    $rootScope.speed = "";
    $rootScope.assessment = "text-primary";
    $rootScope.person = "";
    $rootScope.project = "";
    $rootScope.files = "";

    // 展开收缩配置
    // 打开一个收起其他卡片
    $scope.oneAtATime = true;
    // 配置每个卡片的打开状态
    $scope.status = {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false
    };

    // 界面刷新
    // $state.forceReload();
}
function projectPersonCtrl($scope, $rootScope, $stateParams, queryData) {
    $rootScope.speed = "";
    $rootScope.assessment = "";
    $rootScope.person = "text-primary";
    $rootScope.project = "";
    $rootScope.files = "";

    // 展开收缩配置
    // 打开一个收起其他卡片
    $scope.oneAtATime = true;
    // 配置每个卡片的打开状态
    $scope.status = {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false
    };
}
function projectCtrl($scope, $rootScope, $stateParams, queryData) {
    $rootScope.speed = "";
    $rootScope.assessment = "";
    $rootScope.person = "";
    $rootScope.project = "text-primary";
    $rootScope.files = "";
}
function filesCtrl($scope, $rootScope, $stateParams, queryData) {
    $rootScope.speed = "";
    $rootScope.assessment = "";
    $rootScope.person = "";
    $rootScope.project = "";
    $rootScope.files = "text-primary";
}
function fileCtrl($scope, $rootScope, queryData) {
    $rootScope.speed = "";
    $rootScope.assessment = "";
    $rootScope.person = "";
    $rootScope.project = "";
    $rootScope.files = "text-primary";
}
// 第一步填写客户信息
function newOneCtrl($scope, $rootScope, queryData, provinceCity) {
    // 左边栏选中状态全局变量
    $rootScope.listStatus = "";
    $rootScope.newStatus = "text-primary";

    // 全局变量, 控制选中状态, 就算界面刷新, 选中状态还是不变
    $rootScope.clientInfo = "text-primary";
    $rootScope.otherInfo = "";
    $rootScope.middleInfo = "";
    $rootScope.caseInfo = "";
    $rootScope.uploadFile = "";

    $scope.type = "个人";
    $scope.sex = "男";
    // 带配置的富文本框, ueditor插件,备注信息使用
    $scope._simpleConfig = {
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify']
        ],
        //focus时自动清空初始化时的内容
        autoClearinitialContent: true,
        //关闭字数统计
        wordCount: false,
        //关闭elementPath
        elementPathEnabled: false
    };
    // 设置初始化显示内容
    $scope.remarks = '';

    // 表单验证
    $scope.vm = {
        htmlSource: "",
        showErrorType: "1",
        showDynamicElement: true,
        dynamicName: "dynamicName",
        entity: {}
    };
    // 表单提交按钮操作事项, 表单验证成功, 界面跳转
    $scope.vm.saveEntity = function ($event) {
        window.location.href = "index.html#/projects/new/two";
    };
    // 这是写在common.js文件中, 设置右半部分高度,从而添加背景颜色的方法.
    rightHeight();
    // 初始化省份,市。
    $scope.vm = {
        entity: {
            province: "北京",
            city: "朝阳"
        }
    };
    // 使用服务获取 省市联动
    provinceCity.province().then(function (data) {
        // 首先路由加载的时候显示省份信息, 和第一个省份(北京)对应的市信息
        $scope.province = data;
        $scope.city = data[0].cities;
        // 省份改变的时候, 选择相应的市
        $scope.provinceChange = function () {
            for (var i = 0; i < data.length; i++) {
                // 判断如果配置选中的省份,然后获取对应的市的数组
                if (data[i].name == $scope.vm.entity.province) {
                    $scope.city = data[i].cities;
                    // 设置默认值, 切换省份的时候, 市级默认选择数组里面的第一个
                    $scope.vm.entity.city = data[i].cities[0];
                }
            }
        }
    });
}
// 第二步 其他当事人信息
function newTwoCtrl($rootScope, $scope, queryData) {
    // 全局变量, 控制选中状态, 就算界面刷新, 选中状态还是不变
    $rootScope.clientInfo = "";
    $rootScope.otherInfo = "text-primary";
    $rootScope.middleInfo = "";
    $rootScope.caseInfo = "";
    $rootScope.uploadFile = "";

    // 表单提交按钮操作事项, 表单验证成功, 界面跳转
    $scope.vm.saveEntity = function ($event) {
        window.location.href = "index.html#/projects/new/three";
    };
}
// 第三步 渠道信息
function newThreeCtrl($rootScope, $scope, queryData) {
    // 全局变量, 控制选中状态, 就算界面刷新, 选中状态还是不变
    $rootScope.clientInfo = "";
    $rootScope.otherInfo = "";
    $rootScope.middleInfo = "text-primary";
    $rootScope.caseInfo = "";
    $rootScope.uploadFile = "";

    // 表单验证
    $scope.vm = {
        htmlSource: "",
        showErrorType: "1",
        showDynamicElement: true,
        dynamicName: "dynamicName",
        entity: {}
    };
    $scope.vm.entity.type = "律师";
    // 表单提交按钮操作事项, 表单验证成功, 界面跳转
    $scope.vm.saveEntity = function ($event) {
        window.location.href = "index.html#/projects/new/four";
    };
}
// 第四步 案件信息
function newFourCtrl($rootScope, $scope, queryData) {
    // 全局变量, 控制选中状态, 就算界面刷新, 选中状态还是不变
    $rootScope.clientInfo = "";
    $rootScope.otherInfo = "";
    $rootScope.middleInfo = "";
    $rootScope.caseInfo = "text-primary";
    $rootScope.uploadFile = "";

    $scope.means = true;
    $scope.caseDirective = "案情描述";
    $scope.customerTarget = "客户目标";
    $scope.moneyClues = "初步财产线索";

    // 表单提交按钮操作事项, 表单验证成功, 界面跳转
    $scope.vm.saveEntity = function ($event) {
        window.location.href = "index.html#/projects/new/five";
    };
}
// 第五步 上传文件
function newFiveCtrl($rootScope, $scope, queryData, Upload) {
    // 全局变量, 控制选中状态, 就算界面刷新, 选中状态还是不变
    $rootScope.clientInfo = "";
    $rootScope.otherInfo = "";
    $rootScope.middleInfo = "";
    $rootScope.caseInfo = "";
    $rootScope.uploadFile = "text-primary";


    // upload later on form submit or something similar
    $scope.submit = function () {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    // for multiple files:
    $scope.uploadFiles = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                // 调取上传文件接口
                // Upload.upload({..., data: {file: files[i]}, ...})...;
            }
        }
    }
}
// 客户管理控制器
function customersCtrl($scope, queryData) {
    rightHeight();
}
// 客户列表
function customerListCtrl($scope, $rootScope, queryData, provinceCity) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    // 右边界面没有一屏幕时候,获取高度
    rightHeight();
    // 添加选中样式
    $rootScope.newCustomer = "";
    $rootScope.collection = "";
    $rootScope.listCustomer = "text-primary";


    $scope.vm = {
        entity: {
            province: "北京",
            city: "朝阳"
        }
    };
    // 使用服务获取 省市联动
    provinceCity.province().then(function (data) {
        // 首先路由加载的时候显示省份信息, 和第一个省份(北京)对应的市信息
        $scope.province = data;
        $scope.city = data[0].cities;
        // 省份改变的时候, 选择相应的市
        $scope.provinceChange = function () {
            for (var i = 0; i < data.length; i++) {
                // 判断如果配置选中的省份,然后获取对应的市的数组
                if (data[i].name == $scope.vm.entity.province) {
                    $scope.city = data[i].cities;
                    // 设置默认值, 切换省份的时候, 市级默认选择数组里面的第一个
                    $scope.vm.entity.city = data[i].cities[0];
                }
            }
        }
    });
}
// 客户基本信息
function customerInfoCtrl($scope, $rootScope, queryData) {
    // 带配置的富文本框, ueditor插件,备注信息使用
    $scope._simpleConfig = {
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify']
        ],
        //focus时自动清空初始化时的内容
        autoClearinitialContent: true,
        //关闭字数统计
        wordCount: false,
        //关闭elementPath
        elementPathEnabled: false
    };
    $scope.remarks = "互动详情";

}
// 添加客户
function addCustomerCtrl($scope, $rootScope, queryData) {
    // 添加选中样式
    $rootScope.newCustomer = "text-primary";
    $rootScope.collection = "";
    $rootScope.listCustomer = "";

    // 设置默认值
    $scope.type = "个人";
    $scope.sex = "男";
    $scope.level = "普通";
    // 带配置的富文本框, ueditor插件,备注信息使用
    $scope._simpleConfig = {
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify']
        ],
        //focus时自动清空初始化时的内容
        autoClearinitialContent: true,
        //关闭字数统计
        wordCount: false,
        //关闭elementPath
        elementPathEnabled: false
    };
    $scope.remarks = "备注";
}
// 收藏
function customerCollectCtrl($scope, $rootScope, queryData) {
    // 添加选中样式
    $rootScope.newCustomer = "";
    $rootScope.collection = "text-primary";
    $rootScope.listCustomer = "";
}

// 渠道管理控制器
function middlesCtrl($scope, queryData) {

}

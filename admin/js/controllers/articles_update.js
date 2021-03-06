angular.module('app').controller('UpdateControl', function($scope,$stateParams,$http,$state) {
    $scope.editorContent = "";
    $scope.editorName = "";
    $scope.authorName = "";
    $scope.editorId = "";
    $scope.editorType = "2";
    $scope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            // event.preventDefault();
            // transitionTo() promise will be rejected with
            // a 'transition prevented' error
        })
        // 	var editor = new wangEditor('textarea1');
        // 	// 配置自定义表情，在 create() 之前配置
        // editor.config.emotions = {
        //     // 支持多组表情
        //     // 第二组，id叫做'weibo'
        //     'weibo': {
        //         title: '微博表情',  // 组名称
        //         data: [  // data 还可以直接赋值为一个表情包数组
        //             // 第一个表情
        //             {
        //                 'icon': 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
        //                 'value': '[草泥马]'
        //             },
        //             // 第二个表情
        //             {
        //                 'icon': 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
        //                 'value': '[神马]'
        //             },
        //             {
        //                 'icon': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_thumb.png',
        //                 'value': '[坏笑]'
        //             }

    //             // 下面还可以继续，第三个、第四个、第N个表情。。。
    //         ]
    //     }
    //     // 下面还可以继续，第三组、第四组、、、
    // };

    //     editor.create();
    let id = $stateParams.id;
    $http.post("/api/queryContent/"+id)
      .then(function(response) {
          if (response.status === 200 ) {
              $scope.editorName = response.data.articleName;
              $scope.editorContent = response.data.articleContent;
              $scope.authorName = response.data.authorName;
              $scope.editorType = response.data.articleType
              $scope.editorId = response.data._id;
          }
        }, function(x) {
          $scope.authError = 'Server Error';
      });

      
    $scope.update = function() {
      $scope.authError = null;
      if($scope.editorName.trim() ===""||
      $('#textarea1').val() === "")return;
      $http.post('/api/updateContent', {
        articleId:$scope.editorId,
        authorName:$scope.authorName,
        articleType:$scope.editorType,
        articleName:$scope.editorName.trim(),
        articleContent:$('#content').html()})
      .then(function(response) {
        if (response.status === 200 ) {
          $state.go("app.article-list")
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
});

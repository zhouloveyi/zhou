var app=angular.module("angularDemo",[]);
		app.controller('control',function($scope,$rootScope){
			$scope.text='123';
			$rootScope.change=$scope.text;
			console.log($rootScope.change);
		});
		app.controller('control1',function($scope,$rootScope){
			$scope.text='345';
			console.log($rootScope.change);
		});
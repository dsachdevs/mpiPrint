var mpiapp = angular.module('mpiapp', ['ngRoute', 'ngResource','ngCookies']);

mpiapp.config(['$routeProvider', function($routeProvider){

	$routeProvider
	.when('/login',{
		templateUrl: 'pages/login.html',
		controller: 'loginCntrl'
	})

	.when('/newQuote',{
		templateUrl: 'pages/form.html',
		controller: 'formCntrl'
	})
}]);

mpiapp.run(['$rootScope','$location', 'maintainCookie', function ($rootScope, $location, maintainCookie) {
	$rootScope
		.$on("$routeChangeStart",function(event, next, current){
			var temp = maintainCookie.getCookie();
			console.log(temp);
			if( maintainCookie.getCookie() == null){
				if(next == null) {
					$location.path("/login");
				}
				else if(next.templateUrl != "pages/login.html"){
						$location.path("/login");
				}
			}
			else if(next == null){
				$location.path("/newQuote");
			}
			else if(next.templateUrl == "pages/login.html"){
				$location.path("/newQuote");
			}
		});
}]);

mpiapp.service('login', ['$resource','$q', function($resource,$q){
	
	this.logMeIn =  function(){
		return $resource('http://localhost:3000/api/v1/login',{}, {
			login: {
				method: 'POST',
				isArray: false,
			}
		});

	}

}]);

mpiapp.service('maintainCookie', ['$cookies', function($cookies){

	var username ="";


	return {
		setCookie: function (username) {
			let date = new Date();
			date.setTime(date.getTime() + (1*60*1000));
			$cookies.put("username", username, {"expires" : date } );
		},
		getCookie: function () {
			username = $cookies.get("username");
			// console.log(JSON.stringify(username));
            return username;
		},
		clearCookie: function () {
			username="";
			$cookies.remove("username");
		}
	}
}]);

mpiapp.controller('loginCntrl', ['$scope', '$location','login', 'maintainCookie', function($scope, $location, login, maintainCookie){

		$scope.user = "";
		$scope.pass ="";
		$scope.error = "";

		$scope.submit = function(){
			$scope.error = "";
			if($scope.user != "" && $scope.pass != ""){
				$scope.result = login.logMeIn()

				.login ( { username : $scope.user , password : $scope.pass },
					function(data){
						if(data.status == 200){
								maintainCookie.setCookie($scope.user);
								$location.path('/newQuote');
							}
							else if(data.status == 404){
								$scope.error = "Invalid Username/Password"
							}
							else if(data.status == 500){
								$scope.error = "Internal server error. Try again later"
							}
					},
					function(error){
							$scope.error = "Unknown error. Contact Tech-support"
					}	
					);
			}
			else{
				$scope.error = "Fields cannot be blank."
				console.log($scope.error);
			}
		}
}]);

mpiapp.controller('formCntrl', ['$scope', '$location','login', function($scope, $location, login){


}]);
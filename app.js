var mpiapp = angular.module('mpiapp', ['ngRoute', 'ngResource','ngCookies']);

mpiapp.run(['$rootScope','$location', 'maintainCookie', function ($rootScope, $location, maintainCookie) {
	$rootScope
		.$on("$routeChangeStart",function(event, next, current){
			var temp = maintainCookie.getCookie();
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
			};

		//softcode the domain and port depending on which the API's are hosted.
		$rootScope.domain = "http://localhost";
		$rootScope.port = "3000";

		//this url formation is used in api calls. Remove port if not required.
		$rootScope.url = $rootScope.domain + ":"+ $rootScope.port;
		});
}]);

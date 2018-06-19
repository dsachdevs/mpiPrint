var mpiapp = angular.module('mpiapp', ['ngRoute', 'ngResource','ngCookies']);

mpiapp.run(['$rootScope','$location', 'maintainCookie', function ($rootScope, $location, maintainCookie) {
	$rootScope
		.$on("$routeChangeStart",function(event, next, current){
			// var temp = maintainCookie.getCookie();
			// if( maintainCookie.getCookie() == null){
			// 	if(next == null) {
			// 		$location.path("/login");
			// 	}
			// 	else if(next.templateUrl != "pages/login.html"){
			// 			$location.path("/login");
			// 	}
			// }
			// else if(next == null){
			// 	$location.path("/newQuote");
			// }
			// else if(next.templateUrl == "pages/login.html"){
			// 	$location.path("/newQuote");
			// }

			// console.log(current);
			// console.log(next);

			// if(next.templateUrl == "pages/form.html" && current == null){
			// 	event.preventDefault();
			// 	alert("Any unsaved data will be lost");
			// }



		});
}]);

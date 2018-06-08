var mpiapp = angular.module('mpiapp', ['ngRoute', 'ngResource','ngCookies']);

// mpiapp.run(['$rootScope','$location', 'maintainCookie', function ($rootScope, $location, maintainCookie) {
// 	$rootScope
// 		.$on("$routeChangeStart",function(event, next, current){
// 			var temp = maintainCookie.getCookie();
// 			console.log(temp);
// 			if( maintainCookie.getCookie() == null){
// 				if(next == null) {
// 					$location.path("/login");
// 				}
// 				else if(next.templateUrl != "pages/login.html"){
// 						$location.path("/login");
// 				}
// 			}
// 			else if(next == null){
// 				$location.path("/newQuote");
// 			}
// 			else if(next.templateUrl == "pages/login.html"){
// 				$location.path("/newQuote");
// 			}
// 		});
// }]);

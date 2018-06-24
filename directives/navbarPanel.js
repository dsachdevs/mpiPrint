mpiapp.directive('navbarPanel', ['maintainCookie', function (maintainCookie) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/navbarPanel.html',
		replace: true,
		scope:{
		},
		link: function(scope) {
			scope.loggeduser = maintainCookie.getCookie(); 

			scope.logMeOut = function () {
				maintainCookie.clearCookie(); 
			}
		}

	}
}])
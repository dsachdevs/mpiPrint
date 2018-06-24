
mpiapp.directive('headPanel', ['maintainCookie', function (maintainCookie) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/headPanel.html',
		replace: true,
		link: function(scope) {
	 		scope.colors = [1,2,3,4,5,6,7,8];
			scope.YNopt = ['Y', 'N'];
			scope.dataStore.heading.date = new Date();
			scope.dataStore.heading.loggeduser = maintainCookie.getCookie(); 
		}
	}
}])
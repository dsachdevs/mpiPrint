mpiapp.directive('modalPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/modalPanel.html',
		replace: true,
		scope:{
			modalBody: "="
		}
	}
})
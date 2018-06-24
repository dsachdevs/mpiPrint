mpiapp.directive('printPanel', [ 'calculatePrint', function (calculatePrint) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/printPanel.html',
		replace: true,
		link: function(scope) {
			scope.calcPrtParm = function () {
		
			calculatePrint.getPrtParm(scope.quotenos, scope.dataStore.print.prt_parm_arr, scope.dataStore.quantity.qty_tot, scope.dataStore.cover.cvr_arr[0], scope.dataStore.cover.cvr_parms.cvr_mweight, scope.dataStore.text.txt_arr[0], scope.dataStore.text.txt_parms.txt_mweight);

			calculatePrint.getPrt(scope.quotenos, scope.dataStore.print.prt_arr, scope.dataStore.print.prt_user_parm, scope.dataStore.quantity.qty_tot, scope.dataStore.cover.cvr_gross, scope.dataStore.text.txt_gross, scope.dataStore.print.prt_tot)

				.then(function () {
					//trigger final total
					scope.calc_totals();
				})

			}
		}
	}
}])
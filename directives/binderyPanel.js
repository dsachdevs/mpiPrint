mpiapp.directive('binderyPanel', ['calculateBindery','calculateTotals', function (calculateBindery, calculateTotals) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/binderyPanel.html',
		replace: true,
		link: function(scope) {
			scope.calcBndParm = function () {

				calculateBindery.calculateBindery(scope.quotenos,scope.dataStore.quantity.qty_tot, scope.dataStore.bindery.bnd_arr, scope.dataStore.bindery.bnd_cutting, scope.dataStore.bindery.bnd_folding, scope.dataStore.bindery.bnd_fold_pval, scope.dataStore.bindery.bnd_stitching, scope.dataStore.bindery.bnd_arr2 )

				.then(function (result) {
					calculateTotals.verticalAddArray(result,scope.dataStore.bindery.bnd_tot )
						.then(function () {
							scope.calc_totals();
							});
				})



				
			}
		}
	}
}])
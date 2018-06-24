	mpiapp.directive('quantityPanel', ['calculateTotals', function (calculateTotals) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/quantityPanel.html',
		replace: true,
		link: function(scope) {
				scope.getTotQnty = function(){
	    //  			for(let i = 0; i<scope.quotenos; i++){
					// scope.dataStore.quantity.qty_tot[i] = (parseInt(scope.dataStore.quantity.qty_arr[0][i]) | 0) + (parseInt(scope.dataStore.quantity.qty_arr[1][i]) | 0) + (parseInt(scope.dataStore.quantity.qty_arr[2][i]) | 0); 

					calculateTotals.verticalAddArray(scope.dataStore.quantity.qty_arr, scope.dataStore.quantity.qty_tot)
					.then ( function(){
						scope.getCvrSht();
						scope.getTxtSht();
						scope.calcBndParm();
					});
					}
				}
    		}
	}
])
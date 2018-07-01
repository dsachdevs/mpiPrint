mpiapp.directive('totalPanel', ['calculateTotals', function (calculateTotals) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/totalPanel.html',
		replace: true,
		link: function(scope) {
			scope.print_converted = false;

			scope.calc_totals = function () {
				// for(let i = 0; i<scope.quotenos; i++){
				// 	let temp =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.cover.cvr_tot[i]) + scope.roundToTwo(scope.dataStore.text.txt_tot[i]) + scope.roundToTwo(scope.dataStore.print.prt_tot[i]) + scope.roundToTwo(scope.dataStore.bindery.bnd_tot[i]));
				// 	if(!isNaN(temp))
				// 		scope.dataStore.totals.total[i] = temp;
				let temp = [scope.dataStore.cover.cvr_tot, scope.dataStore.text.txt_tot,scope.dataStore.print.prt_tot, scope.dataStore.bindery.bnd_tot];
				calculateTotals.verticalAddArray(temp, scope.dataStore.totals.total)
					.then(function () {
						scope.cvt_totals();
					})

				// }
			}

			scope.cvt_totals = function () {
				scope.print_converted = false;

				calculateTotals.convertTotals(scope.dataStore.totals.ex_rate, scope.dataStore.totals.total, scope.dataStore.totals.cvt_total)
					.then(function () {
						scope.print_converted = true;
					})

				// for(let i = 0; i<scope.quotenos; i++){
				// 	if (scope.dataStore.totals.ex_rate > 0 && scope.dataStore.totals.total[i] > 0) 
				// 	{
				// 		scope.print_converted = true;
				// 		let temp = scope.dataStore.totals.total[i] * scope.dataStore.totals.ex_rate;
				// 		if(!isNaN(temp))
				// 			scope.dataStore.totals.cvt_total[i] = temp;
				// 	}
				// }
			}
		}

	}
}])
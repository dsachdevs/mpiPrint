mpiapp.directive('coverPanel', ['coverNtext', 'calculateTotals', 'roundUp',  function (coverNtext, calculateTotals,roundUp) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/coverPanel.html',
		replace: true,
		link: function(scope) {
			scope.calcUps = function () {
				coverNtext.getUPs(scope.dataStore.heading.cvrnos)
				.then(function (result) {
					scope.dataStore.cover.cvr_parms.cvr_ups =result;
					scope.getCvrSht();					
				})
			}

			scope.calcCwt = function(){
				//This will be fetched from API
				//scope.dataStore.cover.cvr_parms.cvr_cwt = 64;

				//Calculate MWeight
				coverNtext.getMWeightcvr(scope.dataStore.heading.cvrstock.grade, scope.dataStore.heading.cvrsize.sizeFactor)
				.then(function (result) {
					scope.dataStore.cover.cvr_parms.cvr_mweight = result
					//calculate net sheets
					coverNtext.getMSheets(scope.dataStore.cover.cvr_parms.cvr_cwt, scope.dataStore.cover.cvr_parms.cvr_mweight)
					.then(function (result) {
						//calculate sheets per million
						scope.dataStore.cover.cvr_parms.cvr_perMillion = result;
						if(parseInt(scope.dataStore.cover.cvr_parms.cvr_perMillion)>0){
							//trigger the cover sheet calculations
							scope.getCvrSht();
							}
					})
				})
			}


			scope.getCvrSht = function () {
				for(let i = 0; i<scope.quotenos; i++){

					if(parseInt(scope.dataStore.quantity.qty_tot[i]) > 0)
					{
						//calculating net sheets
						scope.dataStore.cover.cvr_arr[0][i] = parseInt(coverNtext.getNetSheets(scope.dataStore.quantity.qty_tot[i], scope.dataStore.cover.cvr_parms.cvr_ups));

						if(roundUp.roundToTwo(scope.dataStore.cover.cvr_arr[0][i])>0)
						{
						//calculating press spoils
							scope.dataStore.cover.cvr_arr[1][i] = coverNtext.getPressSpoils(scope.dataStore.cover.cvr_parms.cvr_ups);

						//calculating bindary overs
							scope.dataStore.cover.cvr_arr[2][i] = coverNtext.getBndOvr(scope.dataStore.quantity.qty_tot[i], scope.dataStore.cover.cvr_parms.cvr_ups);

						//Calculate totals
							scope.getTotCvr();
						}
					}
				}
			}

			scope.getTotCvr = function () {
				for(let i = 0; i<scope.quotenos; i++){
					if (roundUp.roundToTwo(scope.dataStore.cover.cvr_arr[0][i]) > 0) {
					//Calculating gross sheets						
						calculateTotals.verticalAddArray(scope.dataStore.cover.cvr_arr, scope.dataStore.cover.cvr_gross)

					//calculate the cover cost here
						.then ( function(){
						coverNtext.getCost(scope.dataStore.cover.cvr_parms.cvr_perMillion, scope.dataStore.cover.cvr_gross[i])
							.then(function (result) {
								scope.dataStore.cover.cvr_tot[i] = result;

								//calculating print parms
								scope.calcPrtParm();

								//trigger final total
								scope.calc_totals();
							}) 
					});
					}
				}
			}
		}
	}
}])

mpiapp.directive('textPanel', ['coverNtext', 'calculateTotals', 'roundUp', function (coverNtext, calculateTotals, roundUp) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/textPanel.html',
		replace: true,
		link: function(scope) {
			scope.calcUpsT = function () {
				coverNtext.getUPs(scope.dataStore.heading.txtnos)
				.then(function (result) {
					scope.dataStore.text.txt_parms.txt_ups =result;
					scope.getTxtSht();					
				})
			}

			scope.calcTCwt = function(){
				//This will be fetched from API
				//scope.dataStore.text.txt_parms.txt_cwt = 64;

				//Calculate MWeight
				coverNtext.getMWeight(scope.dataStore.heading.txtstock.grade, scope.dataStore.heading.txtsize.sizeFactor)
				.then(function (result) {
					scope.dataStore.text.txt_parms.txt_mweight = result
					//calculate net sheets
					coverNtext.getMSheets(scope.dataStore.text.txt_parms.txt_cwt, scope.dataStore.text.txt_parms.txt_mweight)
					.then(function (result) {
						//calculate sheets per million
						scope.dataStore.text.txt_parms.txt_perMillion = result;
						if(parseInt(scope.dataStore.text.txt_parms.txt_perMillion)>0){
							//trigger the text sheet calculations
							scope.getTxtSht();
						}
					})
				})
			}

			scope.getTxtSht = function () {
				for(let i = 0; i<scope.quotenos; i++){

					if(parseInt(scope.dataStore.quantity.qty_tot[i]) > 0)
					{
						//calculating net sheets
						scope.dataStore.text.txt_arr[0][i] = coverNtext.getNetSheets(scope.dataStore.quantity.qty_tot[i], scope.dataStore.text.txt_parms.txt_ups);

						if(roundUp.roundToTwo(scope.dataStore.text.txt_arr[0][i])>0)
						{
						//calculating press spoils
						scope.dataStore.text.txt_arr[1][i] = coverNtext.getPressSpoils(scope.dataStore.text.txt_parms.txt_ups);

						//calculating bindary overs
						scope.dataStore.text.txt_arr[2][i] = coverNtext.getBndOvr(scope.dataStore.quantity.qty_tot[i]);

						//Calculate totals
						scope.getTotTxt();
					}
				}
			}
		}

		scope.getTotTxt = function () {

			for(let i = 0; i<scope.quotenos; i++){
				if (roundUp.roundToTwo(scope.dataStore.text.txt_arr[0][i]) > 0) {
					//Calculating gross sheets						
					calculateTotals.verticalAddArray(scope.dataStore.text.txt_arr, scope.dataStore.text.txt_gross)

					//calculate the text cost here
					.then ( function(){
						coverNtext.getCost(scope.dataStore.text.txt_parms.txt_perMillion, scope.dataStore.text.txt_gross[i])
						.then(function (result) {
							scope.dataStore.text.txt_tot[i] = result;

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

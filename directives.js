//Directives
mpiapp.directive('navBar', ['maintainCookie', function (maintainCookie) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/navbar.html',
		replace: true,
		scope:{
			//loggeduser: "@"
		},
		link: function(scope) {
			scope.loggeduser = maintainCookie.getCookie(); 
		}

	}
}])

mpiapp.directive('titlePanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/title.html',
		replace: true,
	}
})

mpiapp.directive('headPanel', ['maintainCookie', function (maintainCookie) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/head.html',
		replace: true,
		link: function(scope) {
	 		scope.colors = [1,2,3,4,5,6,7,8];
			scope.YNopt = ['Y', 'N'];
			scope.dataStore.heading.date = new Date();
			scope.dataStore.heading.loggeduser = maintainCookie.getCookie(); 
		}
	}
}])

mpiapp.directive('quantityPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/quantity.html',
		replace: true,
		link: function(scope) {
				scope.getTotQnty = function(){
	     			for(let i = 0; i<scope.quotenos; i++){
					scope.dataStore.quantity.qty_tot[i] = (parseInt(scope.dataStore.quantity.qty_arr[0][i]) | 0) + (parseInt(scope.dataStore.quantity.qty_arr[1][i]) | 0) + (parseInt(scope.dataStore.quantity.qty_arr[2][i]) | 0); 
					scope.getCvrSht();
					scope.getTxtSht();
					// scope.calcPrtParm();	
					scope.calcBndParm();
					}
				}
    		}
	}
})

mpiapp.directive('coverPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/cover.html',
		replace: true,
		link: function(scope) {

			scope.calcUps = function () {
				scope.dataStore.cover.cvr_parms.cvr_ups = parseFloat((16/parseInt(scope.dataStore.heading.cvrnos))).toFixed(6);
				if (isNaN(scope.dataStore.cover.cvr_parms.cvr_ups)) {
					scope.dataStore.cover.cvr_parms.cvr_ups = 0;
				}
				scope.getCvrSht();
			}

			scope.calcCwt = function(){
				//This will be fetched from API
				//scope.dataStore.cover.cvr_parms.cvr_cwt = 64;

				//Calculate MWeight
				let grade = parseInt(scope.dataStore.heading.cvrstock.grade) | 0;
				let size = parseInt(scope.dataStore.heading.cvrsize.sizeFactor) | 0;

				scope.dataStore.cover.cvr_parms.cvr_mweight =  scope.roundToTwo((grade*size*2)/950);

				//Calculate $/M sheets
				scope.dataStore.cover.cvr_parms.cvr_perMillion = scope.roundToTwo(scope.dataStore.cover.cvr_parms.cvr_cwt * scope.dataStore.cover.cvr_parms.cvr_mweight / 100);

				//re-trigger cover calculations
				if(parseInt(scope.dataStore.cover.cvr_parms.cvr_perMillion)>0){
					scope.getCvrSht();
				}
			}


			scope.getCvrSht = function () {
	
				for(let i = 0; i<scope.quotenos; i++){

					if(parseInt(scope.dataStore.quantity.qty_tot[i]) > 0)
					{
						//calculating net sheets
						scope.dataStore.cover.cvr_arr[0][i] = scope.roundToTwo(parseInt(scope.dataStore.quantity.qty_tot[i])/scope.dataStore.cover.cvr_parms.cvr_ups);


						if(scope.roundToTwo(scope.dataStore.cover.cvr_arr[0][i])>0)
						{
						//calculating press spoils
							scope.dataStore.cover.cvr_arr[1][i] = parseInt(scope.roundToTwo(1/scope.dataStore.cover.cvr_parms.cvr_ups) * 500);
						//calculating bindary overs
							scope.dataStore.cover.cvr_arr[2][i] = scope.getBndOvr(scope.dataStore.quantity.qty_tot[i]);

						//Calculate totals
						scope.getTotCvr();
						}
					}
				}
			}

			scope.getTotCvr = function () {

				for(let i = 0; i<scope.quotenos; i++){
					if (scope.roundToTwo(scope.dataStore.cover.cvr_arr[0][i]) > 0) {
					//Calculating gross sheets
						scope.dataStore.cover.cvr_gross[i] = (parseInt(scope.dataStore.cover.cvr_arr[0][i]) | 0) + (parseInt(scope.dataStore.cover.cvr_arr[1][i]) | 0) + (parseInt(scope.dataStore.cover.cvr_arr[2][i]) | 0);

					//calculate the cover cost here
						scope.dataStore.cover.cvr_tot[i] = scope.roundToTwo(scope.dataStore.cover.cvr_parms.cvr_perMillion * scope.dataStore.cover.cvr_gross[i]/1000);

					//trigger final total
						scope.calc_totals();

					//calculating print parms
						scope.calcPrtParm();
					}
				}
			}
		}
	}
})

mpiapp.directive('textPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/text.html',
		replace: true,
		link: function(scope) {
			scope.calcUpsT = function () {
				scope.dataStore.text.txt_parms.txt_ups = parseFloat((16/parseInt(scope.dataStore.heading.txtnos))).toFixed(6);
				if (isNaN(scope.dataStore.text.txt_parms.txt_ups)) {
					scope.dataStore.text.txt_parms.txt_ups = 0;
				}
				scope.getTxtSht();
			}

			scope.calcTCwt = function(){
				//This will be fetched from API
				//scope.dataStore.text.txt_parms.txt_cwt = 64;

				//Calculate MWeight
				let grade = parseInt(scope.dataStore.heading.txtstock.grade) | 0;
				let size = parseInt(scope.dataStore.heading.txtsize.sizeFactor) | 0;

				scope.dataStore.text.txt_parms.txt_mweight =  scope.roundToTwo((grade*size*2)/950);

				//Calculate $/M sheets
				scope.dataStore.text.txt_parms.txt_perMillion = scope.roundToTwo(scope.dataStore.text.txt_parms.txt_cwt * scope.dataStore.text.txt_parms.txt_mweight / 100);

				//re-trigger text calculations
				if(parseInt(scope.dataStore.text.txt_parms.txt_perMillion)>0){
					scope.getTxtSht();
				}
			}

			scope.getTxtSht = function () {
				for(let i = 0; i<scope.quotenos; i++){

					if(parseInt(scope.dataStore.quantity.qty_tot[i]) > 0)
					{
						//calculating net sheets
						scope.dataStore.text.txt_arr[0][i] = scope.roundToTwo(parseInt(scope.dataStore.quantity.qty_tot[i])/scope.dataStore.text.txt_parms.txt_ups);


						if(scope.roundToTwo(scope.dataStore.text.txt_arr[0][i])>0)
						{
						//calculating press spoils
							scope.dataStore.text.txt_arr[1][i] = parseInt(scope.roundToTwo(1/scope.dataStore.text.txt_parms.txt_ups) * 500);
						//calculating bindery overs
							scope.dataStore.text.txt_arr[2][i] = scope.getBndOvr(scope.dataStore.quantity.qty_tot[i]);

						//Calculate totals
						scope.getTotTxt();
						}
					}
				}
			}

			scope.getTotTxt = function () {

				for(let i = 0; i<scope.quotenos; i++){
					if (scope.roundToTwo(scope.dataStore.text.txt_arr[0][i])>0) {
						//Calculating gross sheets
						scope.dataStore.text.txt_gross[i] = (parseInt(scope.dataStore.text.txt_arr[0][i]) | 0) + (parseInt(scope.dataStore.text.txt_arr[1][i]) | 0) + (parseInt(scope.dataStore.text.txt_arr[2][i]) | 0);

						//calculate the cover cost here
						scope.dataStore.text.txt_tot[i] = scope.roundToTwo(scope.dataStore.text.txt_parms.txt_perMillion * scope.dataStore.text.txt_gross[i]/1000);

						//trigger final total
						scope.calc_totals();

						//calculating print parms
						scope.calcPrtParm();
					}
				}
			}
		}
	}
})

mpiapp.directive('printPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/printing.html',
		replace: true,
		link: function(scope) {
			scope.calcPrtParm = function () {
		
			for(let i = 0; i<scope.quotenos; i++){

				if(parseInt(scope.dataStore.quantity.qty_tot[i]) > 0)
				{
				//calculating Fright
				scope.dataStore.print.prt_parm_arr[0][i] = scope.roundToTwo((scope.roundToTwo(scope.dataStore.cover.cvr_arr[0][i]) * scope.roundToTwo(scope.dataStore.cover.cvr_parms.cvr_mweight)) + scope.roundToTwo(scope.roundToTwo(scope.dataStore.text.txt_arr[0][i]) * scope.roundToTwo(scope.dataStore.text.txt_parms.txt_mweight))/1000);

				//Populating weight
				scope.dataStore.print.prt_parm_arr[1][i] = "lbs";

				//calculating ctns
				scope.dataStore.print.prt_parm_arr[2][i] = parseInt(scope.dataStore.print.prt_parm_arr[0][i]/35)|1;

				//calculating skids
				scope.dataStore.print.prt_parm_arr[3][i] = scope.roundToTwo(scope.dataStore.print.prt_parm_arr[2][i]/60);

				//Calculating impression 1
				scope.dataStore.print.prt_arr[0][i]= scope.roundToTwo(scope.dataStore.cover.cvr_gross[i]) + scope.roundToTwo(scope.dataStore.text.txt_gross[i]);

				//Calculating impression 2
				scope.dataStore.print.prt_arr[1][i]= scope.roundToTwo(scope.dataStore.cover.cvr_gross[i]) + scope.roundToTwo(scope.dataStore.text.txt_gross[i]);

				//calculating plates
				scope.dataStore.print.prt_arr[2][i]= scope.roundToTwo(scope.roundToTwo(scope.dataStore.print.prt_user_parm[0]) * 62.5);

				//calculating MR WT
				scope.dataStore.print.prt_arr[3][i]= scope.roundToTwo(scope.roundToTwo(scope.dataStore.print.prt_user_parm[1]) * 55); 

				//calculating running 1
				scope.dataStore.print.prt_arr[4][i]= scope.roundToTwo(scope.roundToTwo(scope.dataStore.print.prt_user_parm[2]) * scope.roundToTwo(scope.dataStore.print.prt_arr[0][i]) / 1000);

				//calculating running 2
				scope.dataStore.print.prt_arr[5][i]= scope.roundToTwo(scope.roundToTwo(scope.dataStore.print.prt_user_parm[3]) * scope.roundToTwo(scope.dataStore.print.prt_arr[1][i]) / 1000); 

				//calculating total
				scope.dataStore.print.prt_tot[i] = scope.roundToTwo(scope.roundToTwo(scope.dataStore.print.prt_arr[2][i] ) + scope.roundToTwo(scope.dataStore.print.prt_arr[3][i]) + scope.roundToTwo(scope.dataStore.print.prt_arr[4][i]) + scope.roundToTwo(scope.dataStore.print.prt_arr[5][i]));
				}
				}
				//trigger final total
				scope.calc_totals();
			}
		}
	}
})

mpiapp.directive('binderyPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/bindery.html',
		replace: true,
		link: function(scope) {
			scope.calcBndParm = function () {
				for(let i = 0; i<scope.quotenos; i++){
				if(parseInt(scope.dataStore.quantity.qty_tot[i]) > 0)
					{
					//calculating cutting
					scope.dataStore.bindery.bnd_arr[0][i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.quantity.qty_tot[i]/1000) *  scope.roundToTwo(scope.dataStore.bindery.bnd_cutting.RunM) +  scope.roundToTwo(scope.dataStore.bindery.bnd_cutting.MR));

					//calculating folding
					scope.dataStore.bindery.bnd_arr[1][i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.quantity.qty_tot[i]/1000 ) *  scope.roundToTwo(scope.dataStore.bindery.bnd_fold_pval['4pp']) *  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.RunM[0]) +  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.MR[0]));

					scope.dataStore.bindery.bnd_arr[2][i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.quantity.qty_tot[i]/1000 ) *  scope.roundToTwo(scope.dataStore.bindery.bnd_fold_pval['8pp']) *  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.RunM[1]) +  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.MR[1]));

					scope.dataStore.bindery.bnd_arr[3][i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.quantity.qty_tot[i]/1000 ) *  scope.roundToTwo(scope.dataStore.bindery.bnd_fold_pval['12/16pp']) *  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.RunM[2]) +  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.MR[2]));

					scope.dataStore.bindery.bnd_arr[4][i] =  scope.roundToTwo(scope.dataStore.quantity.qty_tot[i]/1000 ) *  scope.roundToTwo(scope.dataStore.bindery.bnd_fold_pval['24/32pp']) *  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.RunM[3]) +  scope.roundToTwo(scope.dataStore.bindery.bnd_folding.MR[3]);

					//Calculating stitching
					scope.dataStore.bindery.bnd_arr[5][i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.quantity.qty_tot[i]/1000) *  scope.roundToTwo(scope.dataStore.bindery.bnd_stitching.RunM) +  scope.roundToTwo(scope.dataStore.bindery.bnd_stitching.MR));

					scope.dataStore.bindery.bnd_tot[i] = 0;
					//Calculating totals
					for (var j = 0; j < scope.dataStore.bindery.bnd_arr.length; j++) {
						scope.dataStore.bindery.bnd_tot[i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.bindery.bnd_tot[i]) +  scope.roundToTwo(scope.dataStore.bindery.bnd_arr[j][i]));
					}

					for (var j = 0; j < scope.dataStore.bindery.bnd_arr2.length; j++) {
						scope.dataStore.bindery.bnd_tot[i] =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.bindery.bnd_tot[i]) +  scope.roundToTwo(scope.dataStore.bindery.bnd_arr2[j][i]));
					}
				}
				}
				scope.calc_totals();
			}
		}
	}
})

mpiapp.directive('totalPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/totals.html',
		replace: true,
		link: function(scope) {
			scope.print_converted = false;

			scope.calc_totals = function () {
				for(let i = 0; i<scope.quotenos; i++){
					let temp =  scope.roundToTwo(scope.roundToTwo(scope.dataStore.cover.cvr_tot[i]) + scope.roundToTwo(scope.dataStore.text.txt_tot[i]) + scope.roundToTwo(scope.dataStore.print.prt_tot[i]) + scope.roundToTwo(scope.dataStore.bindery.bnd_tot[i]));
					if(!isNaN(temp))
						scope.dataStore.totals.total[i] = temp;
				}
				scope.cvt_totals();
			}

			scope.cvt_totals = function () {
				scope.print_converted = false;
				for(let i = 0; i<scope.quotenos; i++){
					if (scope.dataStore.totals.ex_rate > 0 && scope.dataStore.totals.total[i] > 0) 
					{
						scope.print_converted = true;
						let temp = scope.dataStore.totals.total[i] * scope.dataStore.totals.ex_rate;
						if(!isNaN(temp))
							scope.dataStore.totals.cvt_total[i] = temp;
					}
				}
			}
		}

	}
})

mpiapp.directive('footerPanel', ['apiCalls',function (apiCalls) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/footer.html',
		replace: true,
		link: function(scope) {
			//message
			scope.footerMessage = "Please save the quote in order to print it.";
			//Save function
			scope.printReady = false;
			scope.save_quote = function () {
				
				if(scope.validate())
				{
					apiCalls.saveQuote().saveData ({dataStore: scope.dataStore},
						function(data){
							if(data.status == 200) {
								scope.dataStore.heading.quote = data.quoteid;
								$('.collapse').collapse('hide');
								scope.footerMessage = "Quote " +  scope.dataStore.heading.quote + " ready for print!";
								scope.printReady = true;
							}
						},
						function(error){
								scope.footerMessage = "Unknown error while saving quote. Contact Tech-support";
						}	
					);
				}
			}

			//print function
			scope.printToCart = function(data) {
			     if(data == 'd-print-none'){
			     	$('.collapse').collapse('hide');
			     }
			     else{
			     	$('.collapse').collapse('show');
			     }
			     scope.SkipPrint=data;     
			     $timeout(function(){
				 window.print();
				});

			     return false;
			}
		}
	}
}])

mpiapp.directive('formattedDate', function(dateFilter) {
  return {
    require: 'ngModel',
    scope: {
      format: "="
    },
    link: function(scope, element, attrs, ngModelController) {

      ngModelController.$formatters.push(function(data) {
        //convert data from model format to view format
        return dateFilter(data, scope.format); //converted
      });
    }
  }
});
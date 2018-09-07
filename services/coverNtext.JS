mpiapp.service('coverNtext', ['$q','roundUp', function($q, roundUp){

	return {
		//calculations for Cover and Text panel
		//nos ==> number of cover pages or text pages
		//result ==> hold the reulst
		getUPs: function (nos) {
			return  $q(function(resolve, reject) {
				let result = parseFloat(16/parseInt(nos)).toFixed(6);
				if (isNaN(result)) {result = 0;}
				resolve(result);
			});
		},
		getForms: function (nos) {
			return  $q(function(resolve, reject) {
				let result = parseFloat(parseInt(nos)/16).toFixed(3);
				if (isNaN(result)) {result = 0;}
				resolve(result);
			});
		},
		
		getMWeightcvr: function (grade, size) {
			return  $q(function(resolve, reject) {
			let result = roundUp.roundUp((parseInt(grade) * parseInt(size) ) / 425);
				resolve(result);
			});
		},
		getMWeighttxt: function (grade, size) {
			return  $q(function(resolve, reject) {
			let result = roundUp.roundUp((parseInt(grade) * parseInt(size) * 2 ) / 950);
				resolve(result);
			});
		},
		getMSheets: function (cwt, mweight) {
			return  $q(function(resolve, reject) {
			let result = roundUp.roundToTwo(cwt * mweight / 100);
				resolve(result);
			});
		},
		getNetSheets: function (qty_tot, ups) {
			let result = roundUp.roundToTwo(parseInt(qty_tot)/ups);
			return result;
		},
		getPressSpoils: function (ups) {
			let result = 500;
			if(ups < 1) {
			 result = parseInt(roundUp.roundToTwo(1/ups) * 500);
			}
			return result;
		},
		getBndOvr: function(qnty, ups) {
			let multiple = 1;
			if(ups < 1) {
			 multiple = parseInt(roundUp.roundToTwo(1/ups));
			}

			let result = 0;
			if(qnty <= 5000) {
				result = 200;
			}
			else if(qnty <= 15000) {
				result = 500;
			}
			else {
				result = parseInt(0.03* qnty);
			}
			return result * multiple;
		},
		getCost: function (perMillion, gross) {
			return  $q(function(resolve, reject) {
				let result = roundUp.roundToTwo(perMillion * gross/1000);
				resolve(result);
			});
		}
	}
}]);
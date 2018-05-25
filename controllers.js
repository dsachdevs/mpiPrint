mpiapp.controller('loginCntrl', ['$scope', '$location','login', 'maintainCookie', function($scope, $location, login, maintainCookie){

		$scope.user = "";
		$scope.pass ="";
		$scope.error = "";

		$scope.submit = function(){
			$scope.error = "";
			if($scope.user != "" && $scope.pass != ""){
				$scope.result = login.logMeIn()

				.login ( { username : $scope.user , password : $scope.pass },
					function(data){
						if(data.status == 200){
								maintainCookie.setCookie($scope.user);
								$location.path('/newQuote');
							}
							else if(data.status == 404){
								$scope.error = "Invalid Username/Password";
							}
							else if(data.status == 500){
								$scope.error = "Internal server error. Try again later";
							}
					},
					function(error){
							$scope.error = "API error. Contact Tech-support";
					}	
					);
			}
			else{
				$scope.error = "Fields cannot be blank."
			}
		}
}]);

mpiapp.controller('formCntrl', ['$scope','dataStore','apiCalls', function($scope, dataStore, apiCalls){

	$scope.number = 4;
	$scope.getNumber = function(num) {
    return [1,2,3,4];   
	};

	//header
	$scope.colors = [1,2,3,4,5,6,7,8];
	$scope.YNopt = ['Y', 'N'];
	$scope.head_data = dataStore.dataObj.heading;
	apiCalls.getGradeAndSize()
					.getData ({},
					function(data){
						if(data.grades.status == 200){
							$scope.grades = data.grades.result;
							console.log(data.grades);
							}
							else if(data.grades.status == 500){
								console.log("Server error while fetching the grades");
							}

						if(data.sizes.status == 200){
							$scope.sizes = data.sizes.result;
							console.log(data.sizes);
							}
							else if(data.sizes.status == 500){
								console.log("Server error while fetching the sizes");
							}
					},
					function(error){
							console.log("Unknown error while fetching sizes. Contact Tech-support")
					}	
					);



	//quantity
	$scope.qty_lang = dataStore.dataObj.quantity.qty_lang;
	$scope.qty_arr = dataStore.dataObj.quantity.qty_arr;
	$scope.qty_tot = dataStore.dataObj.quantity.qty_tot;

	$scope.getTotQnty = function(){
		for(let i = 0; i<4; i++){
			$scope.qty_tot[i] = (parseInt($scope.qty_arr[0][i]) | 0) + (parseInt($scope.qty_arr[1][i]) | 0) + (parseInt($scope.qty_arr[2][i]) | 0); 
			// console.log($scope.qty_tot[i]);
			$scope.getCvrSht();
			$scope.getTxtSht();
			$scope.calcPrtParm();		

		}
	}

	//cover

	$scope.cvr_lang = dataStore.dataObj.cover.cvr_lang;
	$scope.cvr_pamrs = dataStore.dataObj.cover.cvr_parms;
	$scope.cvr_arr = dataStore.dataObj.cover.cvr_arr;
	$scope.cvr_tot = dataStore.dataObj.cover.cvr_tot;
	$scope.cvr_gross = dataStore.dataObj.cover.cvr_gross;


	$scope.calcUps = function () {
		$scope.cvr_pamrs.cvr_ups = parseFloat((16/parseInt($scope.head_data.cvrnos))).toFixed(3);
		if (isNaN($scope.cvr_pamrs.cvr_ups)) {
			$scope.cvr_pamrs.cvr_ups = 0;
		}
		$scope.getCvrSht();
	}

	$scope.calcCwt = function(){
		//This will be changed later to get from API
		$scope.cvr_pamrs.cvr_cwt = 64;

		//Calculate MWeight
		let grade = parseInt($scope.head_data.cvrstock.grade) | 0;
		let size = parseInt($scope.head_data.cvrsize.sizeFactor) | 0;

		$scope.cvr_pamrs.cvr_mweight =  parseInt((grade*size*2)/950) | 0;

		//Calculate $/M sheets
		$scope.cvr_pamrs.cvr_perMillion = parseInt($scope.cvr_pamrs.cvr_cwt * $scope.cvr_pamrs.cvr_mweight / 100) | 0;

		//re-trigger cover calculations
		if(parseInt($scope.cvr_pamrs.cvr_perMillion)>0){
			$scope.getCvrSht();
		}
	}


	$scope.getCvrSht = function () {
		//chaneg this for loop with a dynamic version
		for(let i = 0; i<4; i++){

			if(parseInt($scope.qty_tot[i]) > 0)
			{
				//calculating net sheets
				$scope.cvr_arr[0][i] = parseFloat(parseInt($scope.qty_tot[i])/parseFloat($scope.cvr_pamrs.cvr_ups).toFixed(3)).toFixed(3);


				if(parseInt($scope.cvr_arr[0][i])>0)
				{
				//calculating press spoils
					$scope.cvr_arr[1][i] = parseInt(parseFloat(1/$scope.cvr_pamrs.cvr_ups).toFixed(3) * 500);
				//calculating bindary overs
					$scope.cvr_arr[2][i] = $scope.getBndOvr($scope.qty_tot[i]);

				//Calculating gross sheets
					$scope.cvr_gross[i] = (parseInt($scope.cvr_arr[0][i]) | 0) + (parseInt($scope.cvr_arr[1][i]) | 0) + (parseInt($scope.cvr_arr[2][i]) | 0);

				//calculate the cover cost here
					$scope.cvr_tot[i] = parseFloat($scope.cvr_pamrs.cvr_perMillion * $scope.cvr_gross[i]/1000).toFixed(2);
				}
			}
		}

	}


	//text

	$scope.txt_lang = dataStore.dataObj.text.txt_lang;
	$scope.txt_pamrs = dataStore.dataObj.text.txt_parms;
	$scope.txt_arr = dataStore.dataObj.text.txt_arr;
	$scope.txt_tot = dataStore.dataObj.text.txt_tot;
	$scope.txt_gross = dataStore.dataObj.text.txt_gross;


	$scope.calcUpsT = function () {
		$scope.txt_pamrs.txt_ups = parseFloat((16/parseInt($scope.head_data.txtnos))).toFixed(3);
		if (isNaN($scope.txt_pamrs.txt_ups)) {
			$scope.txt_pamrs.txt_ups = 0;
		}
		$scope.getTxtSht();
	}

	$scope.calcTCwt = function(){
		//This will be changed later to get from API
		$scope.txt_pamrs.txt_cwt = 64;

		//Calculate MWeight
		let grade = parseInt($scope.head_data.txtstock.grade) | 0;
		let size = parseInt($scope.head_data.txtsize.sizeFactor) | 0;

		$scope.txt_pamrs.txt_mweight =  parseInt((grade*size*2)/950) | 0;

		//Calculate $/M sheets
		$scope.txt_pamrs.txt_perMillion = parseInt($scope.txt_pamrs.txt_cwt * $scope.txt_pamrs.txt_mweight / 100) | 0;

		//re-trigger cover calculations
		if(parseInt($scope.txt_pamrs.txt_perMillion)>0){
			$scope.getTxtSht();
		}
	}


	$scope.getTxtSht = function () {
		for(let i = 0; i<4; i++){

			if(parseInt($scope.qty_tot[i]) > 0)
			{
				//calculating net sheets
				$scope.txt_arr[0][i] = parseFloat(parseInt($scope.qty_tot[i])/parseFloat($scope.txt_pamrs.txt_ups).toFixed(3)).toFixed(3) | 0.00;


				if(parseInt($scope.txt_arr[0][i])>0)
				{
				//calculating press spoils
					$scope.txt_arr[1][i] = parseInt(parseFloat(1/$scope.txt_pamrs.txt_ups).toFixed(3) * 500);
				//calculating bindary overs
					$scope.txt_arr[2][i] = $scope.getBndOvr($scope.qty_tot[i]);

				//Calculating gross sheets
					$scope.txt_gross[i] = (parseInt($scope.txt_arr[0][i]) | 0) + (parseInt($scope.txt_arr[1][i]) | 0) + (parseInt($scope.txt_arr[2][i]) | 0);

				//calculate the cover cost here
					$scope.txt_tot[i] = parseFloat($scope.txt_pamrs.txt_perMillion * $scope.txt_gross[i]/1000).toFixed(2);
				}
			}
		}

	}


	$scope.getBndOvr = function(qnty) {
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
		return result;
	}


	//print

	$scope.prt_lang = dataStore.dataObj.print.prt_lang;
	$scope.prt_parm_lang = dataStore.dataObj.print.prt_parm_lang;
	$scope.prt_parm_arr = dataStore.dataObj.print.prt_parm_arr;
	$scope.prt_user_parm = dataStore.dataObj.print.prt_user_parm;
	$scope.prt_arr = dataStore.dataObj.print.prt_arr;
	$scope.prt_tot = dataStore.dataObj.print.prt_tot;

	$scope.calcPrtParm = function () {
		
		//calculating fright
		for(let i = 0; i<4; i++){

			//calculating Fright
			$scope.prt_parm_arr[0][i] = parseFloat((($scope.cvr_arr[0][i] * $scope.cvr_pamrs.cvr_mweight)|0 + ($scope.txt_arr[0][i] * $scope.txt_pamrs.txt_mweight)|0)/1000).toFixed(2);

			//Populating weight
			$scope.prt_parm_arr[1][i] = "lbs";

			//calculating ctns
			$scope.prt_parm_arr[2][i] = parseInt($scope.prt_parm_arr[0][i]/35)|0;

			//calculating skids
			$scope.prt_parm_arr[3][i] = parseFloat($scope.prt_parm_arr[2][i]/60).toFixed(2);


			//Calculating impression 1
			$scope.prt_arr[0][i]= parseInt($scope.cvr_gross[i]|0) + parseInt($scope.txt_gross[i]|0);
			// console.log(parseInt($scope.cvr_gross[i]));
			// console.log(parseInt($scope.txt_gross[i]));

			//Calculating impression 2
			$scope.prt_arr[1][i]= parseInt($scope.cvr_gross[i]|0) + parseInt($scope.txt_gross[i]|0);

			//calculating plates
			$scope.prt_arr[2][i]= parseFloat(parseInt($scope.prt_user_parm[0] | 0 ) * 62.5).toFixed(2); 

			//calculating MR WT
			$scope.prt_arr[3][i]= parseFloat(parseInt($scope.prt_user_parm[1] | 0 ) * 55).toFixed(2); 

			//calculating running 1
			$scope.prt_arr[4][i]= parseFloat(parseInt($scope.prt_user_parm[2] | 0 ) * parseInt($scope.prt_arr[0][i]|0) / 1000).toFixed(2); 

			//calculating running 2
			$scope.prt_arr[5][i]= parseFloat(parseInt($scope.prt_user_parm[3] | 0 ) * parseInt($scope.prt_arr[1][i]|0) / 1000).toFixed(2); 

			//calculating total
			$scope.prt_tot[i] = parseFloat(parseFloat($scope.prt_arr[2][i] ) + parseFloat($scope.prt_arr[3][i]) + parseFloat($scope.prt_arr[4][i]) + parseFloat($scope.prt_arr[5][i])).toFixed(2);
		}

	}

	//Bindery

	$scope.bnd_cutting = dataStore.dataObj.bindery.bnd_cutting;
	$scope.bnd_fold_parm = dataStore.dataObj.bindery.bnd_fold_parm;
	$scope.bnd_fold_pval = dataStore.dataObj.bindery.bnd_fold_pval;
	$scope.bnd_folding = dataStore.dataObj.bindery.bnd_folding;
	$scope.bnd_stitching = dataStore.dataObj.bindery.bnd_stitching;
	$scope.bnd_other = dataStore.dataObj.bindery.bnd_other;
	$scope.bnd_arr = dataStore.dataObj.bindery.bnd_arr;
	$scope.bnd_arr2 = dataStore.dataObj.bindery.bnd_arr2;
	$scope.bnd_tot = dataStore.dataObj.bindery.bnd_tot;


	$scope.calcBndParm = function () {

		for(let i = 0; i<4; i++){
			//calculating cutting
			$scope.bnd_arr[0][i] = parseFloat(($scope.qty_tot[i]/1000 | 0) * parseFloat($scope.bnd_cutting.RunM|0) + parseFloat($scope.bnd_cutting.MR|0)).toFixed(2);

			//calculating folding
			$scope.bnd_arr[1][i] = parseFloat(($scope.qty_tot[i]/1000 | 0) * parseFloat($scope.bnd_fold_pval['4pp']|0) * parseFloat($scope.bnd_folding.RunM[0]|0) + parseFloat($scope.bnd_folding.MR[0]|0)).toFixed(2);

			$scope.bnd_arr[2][i] = parseFloat(($scope.qty_tot[i]/1000 | 0) * parseFloat($scope.bnd_fold_pval['8pp']|0) * parseFloat($scope.bnd_folding.RunM[1]|0) + parseFloat($scope.bnd_folding.MR[1]|0)).toFixed(2);

			$scope.bnd_arr[3][i] = parseFloat(($scope.qty_tot[i]/1000 | 0) * parseFloat($scope.bnd_fold_pval['12/16pp']|0) * parseFloat($scope.bnd_folding.RunM[2]|0) + parseFloat($scope.bnd_folding.MR[2]|0)).toFixed(2);

			$scope.bnd_arr[4][i] = parseFloat(($scope.qty_tot[i]/1000 | 0) * parseFloat($scope.bnd_fold_pval['24/32pp']|0) * parseFloat($scope.bnd_folding.RunM[3]|0) + parseFloat($scope.bnd_folding.MR[3]|0)).toFixed(2);

			//Calculating stitching
			$scope.bnd_arr[5][i] = parseFloat(($scope.qty_tot[i]/1000 | 0) * parseFloat($scope.bnd_stitching.RunM|0) + parseFloat($scope.bnd_stitching.MR|0)).toFixed(2)

			$scope.bnd_tot[i] = 0;
			//Calculating totals
			for (var j = 0; j < $scope.bnd_arr.length; j++) {
				$scope.bnd_tot[i] = parseFloat(parseFloat($scope.bnd_tot[i]|0) + parseFloat($scope.bnd_arr[j][i] | 0)).toFixed(2);
			}

			for (var j = 0; j < $scope.bnd_arr2.length; j++) {
				$scope.bnd_tot[i] = parseFloat(parseFloat($scope.bnd_tot[i]|0) + parseFloat($scope.bnd_arr2[j][i] | 0)).toFixed(2);
			}

		}

	}

}]);
mpiapp.controller('formCntrl', ['$scope','dataStore','apiCalls','$window', 'maintainQuote', function($scope, dataStore, apiCalls, $window, maintainQuote){

	
	//show the warning message if the user tries to refresh the form
	$window.onbeforeunload = function(e) {
		if($scope.dataStore.validation.quoteSaved == false)
		{
			var dialogText = 'Any unsave ddata would be lost, are you sure you want to exit?';
			e.returnValue = dialogText;
			return dialogText;
		}
	};

	// Remove thie message from window object when user leaves ther page so that it doesnt appear on other views
	$scope.$on('$destroy', function() {
		$window.onbeforeunload = undefined;

	});

	//show the warnong on the location change
	$scope.$on('$locationChangeStart', function (event) {
		console.log($scope.dataStore.validation.quoteSaved);
		if($scope.dataStore.validation.quoteSaved == false)
		{
			var answer = confirm('Any unsaved data would be lost, are you sure you want to exit?');
			if (!answer) {
				event.preventDefault();
			}
		}
	});

	//get number of quotes from the cookies
	$scope.quotenos = maintainQuote.getQuote();
	if(isNaN($scope.quotenos))
	{
		$scope.quotenos = 1;
	}

	//prepare a dummy array to be used by the directives in ng-repeat
	$scope.getNumber = function(num) {
		let temparr =[];
		for(let i = 1; i<=$scope.quotenos; i++)  {
			temparr.push(i);
		}  		
		return temparr;   
	};

	//craeting a datastaore in scope
	$scope.dataStore = angular.copy(dataStore.dataObj);

	//2 Decimal round up
	$scope.roundToTwo= function (num) { 
		if(isNaN(num)) 
			{return 0.00} 
		else   
			{return +(Math.round(num + "e+2")  + "e-2");}
	};

	//Populating Grades and Sizes by calling api

		//reset the error stack for the modal
		$scope.modalbody=["API Error!"];

	apiCalls.getGradeAndSize()
	.getData ({},
		function(data){
			if(data.grades.status == 200){
				$scope.grades = data.grades.result;
				$scope.dataStore.heading.txtstock = $scope.grades[0];
				$scope.dataStore.heading.cvrstock = $scope.grades[0];
			}
			else if(data.grades.status == 500){
				// console.log("Server error while fetching the grades");
				$scope.modalbody.push("Server error while fetching the grades");
			
			}

			if(data.sizes.status == 200){
				$scope.sizes = data.sizes.result;
				$scope.dataStore.heading.txtsize = $scope.sizes[0];
				$scope.dataStore.heading.cvrsize = $scope.sizes[0];
			}
			else if(data.sizes.status == 500){
				// console.log("Server error while fetching the sizes");
				$scope.modalbody.push("Server error while fetching the sizes");
							}

			if($scope.modalbody.length > 1) 
				$('#exampleModal').modal('show');
		},
		function(error){
			// console.log("Unknown error while fetching sizes. Contact Tech-support")
			$scope.modalbody.push("Error while fetching grades and sizes. Contact Tech-support");
			$('#exampleModal').modal('show');
		}	
		);

	apiCalls.configCWT().getData ({},
		function(data){
			if(data.status == 200){
				$scope.dataStore.validation.validCWT = true;
				$scope.dataStore.cover.cvr_parms.cvr_cwt = data.result;
				$scope.dataStore.text.txt_parms.txt_cwt = data.result; 
			}
			else if(data.status == 500){
				$scope.footerMessage = data.error;
			}
		},
		function(error){
			// $scope.footerMessage = "Error while fetching CWT. Contact Tech-support";
			$scope.modalbody.push("Error while fetching CWT from the server. Contact Tech-support");
			$scope.dataStore.validation.validCWT = false;
			$('#exampleModal').modal('show');
		}	
		);


	$scope.isValid = function (data) {
		if(data !== null && data !== '' && data !== undefined){
			return true;
		}
		return false
	};

	$scope.validate = function () {

		//client name is mandatory
		if( !$scope.isValid($scope.dataStore.heading.client) ){
			$scope.dataStore.validation.validClient = false;
			$scope.modalbody.push("Client name can not be blank!");
		}

		if( parseInt($scope.dataStore.heading.txtnos) > 0 || parseInt($scope.dataStore.heading.cvrnos) > 0 )
		{
			if (parseInt($scope.dataStore.heading.txtnos) > 0) 
			{
				if( !$scope.isValid($scope.dataStore.heading.txtstock.gradeDesc) || !$scope.isValid($scope.dataStore.heading.txtsize.sizeDesc) )
				{
					$scope.dataStore.validation.validTxtNos = false;
					$scope.dataStore.validation.validTxtStock = false;
					$scope.dataStore.validation.validTxtSize = false;
					$scope.modalbody.push("TEXT and sheet size cannot be blank for #TXT pages greater than 0!");
				}

			}
			else
			{ 
				if( $scope.isValid($scope.dataStore.heading.txtstock.gradeDesc) || $scope.isValid($scope.dataStore.heading.txtsize.sizeDesc) )
				{
					$scope.dataStore.validation.validTxtNos = false;
					$scope.dataStore.validation.validTxtStock = false;
					$scope.dataStore.validation.validTxtSize = false;
					$scope.modalbody.push("TEXT and Sheet size cannot be selected for #TXT pages = 0!");
				}
			}

			if (parseInt($scope.dataStore.heading.cvrnos) > 0) 
			{
				if( !$scope.isValid($scope.dataStore.heading.cvrstock.gradeDesc) || !$scope.isValid($scope.dataStore.heading.cvrsize.sizeDesc) )
				{
					$scope.dataStore.validation.validCvrNos = false;
					$scope.dataStore.validation.validCvrStock = false;
					$scope.dataStore.validation.validCvrSize = false;
					$scope.modalbody.push("COVER and sheet size cannot be blank for #CVR pages greater than 0!");
				}
				
			}
			else
			{ 
				if( $scope.isValid($scope.dataStore.heading.cvrstock.gradeDesc) || $scope.isValid($scope.dataStore.heading.cvrsize.sizeDesc) )
				{
					$scope.dataStore.validation.validCvrNos = false;
					$scope.dataStore.validation.validCvrStock = false;
					$scope.dataStore.validation.validCvrSize = false;
					$scope.modalbody.push("COVER and Sheet size cannot be selected for #CVR pages = 0!");
				}
			}
		}
		else
		{
			$scope.dataStore.validation.validTxtNos = false;
			$scope.dataStore.validation.validCvrNos = false;
			$scope.modalbody.push("Both #Text pages and #CVR pages can not be 0!");
		}


		// if($scope.dataStore.validation.validCWT == false) {
		// 	$scope.modalbody.push("Error while fetching CWT. Contact Tech-support");
		// }

		const result = $scope.dataStore.quantity.qty_tot.filter(element => element > 0);	
		
		if( result.length == 0)
		{
			$scope.dataStore.validation.validQuantity = false;
			$scope.modalbody.push("Not all quantities can be zero!");
		}
		else
		{
			$scope.quotenos = result.length;
		}
		
		if($scope.modalbody.length > 1)
			return false;
		else
			return true;

	};

}]);
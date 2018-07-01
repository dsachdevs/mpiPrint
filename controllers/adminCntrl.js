mpiapp.controller('adminCntrl', ['$scope', 'apiCalls', function($scope, apiCalls){


apiCalls.configCWT().getData ({},
				function(data){
					if(data.status == 200){
						$scope.cwt = data.result;
						$scope.cwterror = "";
						}
					else if(data.status == 500){
						$scope.cwterror = data.error;
						}
				},
				function(error){
						$scope.cwterror = "Error while fetching CWT. Refresh and try again. if error persists, contact Tech-support";
				}	
				);

	$scope.updateCWT = function () {
		$scope.cwterror = "";

		apiCalls.configCWT().setData ( {cwt : $scope.cwt} ,
				function(data){
						$scope.cwterror = data.error;
				},
				function(error){
						$scope.cwterror = "Error while updating CWT. Refresh and try again. if error persists, contact Tech-support";
				}	
				);
	}

}]);
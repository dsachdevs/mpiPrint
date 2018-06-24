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
								$location.path('/landing');
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
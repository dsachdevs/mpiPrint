mpiapp.service('login', ['$resource','$rootScope', function($resource, $rootScope){
	
	this.logMeIn =  function(){
		let url = $rootScope.url + '/api/v1/login';
		return $resource(url,{}, {
			login: {
				method: 'POST',
				isArray: false,
			}
		});

	}

}]);
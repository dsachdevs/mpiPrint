mpiapp.service('apiCalls', ['$resource', '$rootScope', function($resource, $rootScope){
	return {
		getGradeAndSize : function(){
			let url = $rootScope.url + '/api/v1/GradesAndSize';
			return $resource(url,{}, {
				getData: {
					method: 'GET',
					isArray: false,
					}
				});
		},
		saveQuote : function(){
			let url = $rootScope.url + '/api/v1/save_quote';
			return $resource(url,{}, {
				saveData: {
					method: 'POST',
					isArray: false,
					}
				});
		},

		configCWT : function(){
			let url = $rootScope.url + '/api/v1/configCWT';
			return $resource(url,{}, {
				setData: {
					method: 'POST',
					isArray: false,
					},

				getData: {
					method: 'GET',
					isArray: false,
					}
				});
		},

	}

}]);
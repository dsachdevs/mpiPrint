mpiapp.config(['$routeProvider', function($routeProvider){

	$routeProvider
	.when('/login',{
		templateUrl: 'pages/login.html',
		controller: 'loginCntrl'
	})

	.when('/newQuote',{
		templateUrl: 'pages/form.html',
		controller: 'formCntrl'
	})
}]);
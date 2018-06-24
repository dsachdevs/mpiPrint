mpiapp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

	$routeProvider
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'loginCntrl'
	})

	.when('/landing',{
		templateUrl: 'views/landing.html',
		controller: 'landingCntrl'
	})

	.when('/newQuote',{
		templateUrl: 'views/form.html',
		controller: 'formCntrl'
	})

	.when('/adminPanel',{
		templateUrl: 'views/admin.html',
		controller: 'adminCntrl'
	})


	//disable cache!!

	if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
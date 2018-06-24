mpiapp.controller('landingCntrl', ['$scope', 'maintainQuote', function($scope, maintainQuote){

$scope.quoteNos = 1;
 $scope.proceed = function() {
	maintainQuote.clearQuote();
	maintainQuote.setQuote($scope.quoteNos);
}

}]);
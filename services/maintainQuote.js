mpiapp.service('maintainQuote', ['$cookies', function($cookies){

	var quotenos ="";

	return {
		setQuote: function (quotenos) {
			let date = new Date();
			date.setTime(date.getTime() + (30*60*1000));
			$cookies.put("quotenos", quotenos, {"expires" : date } );
		},
		getQuote: function () {
			quotenos = $cookies.get("quotenos");
            return quotenos;
		},
		clearQuote: function () {
			quotenos="";
			$cookies.remove("quotenos");
		}
	}
}]);
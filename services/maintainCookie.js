mpiapp.service('maintainCookie', ['$cookies', function($cookies){

	var username ="";


	return {
		setCookie: function (username) {
			let date = new Date();
			date.setTime(date.getTime() + (30*60*1000));
			$cookies.put("username", username, {"expires" : date } );
		},
		getCookie: function () {
			username = $cookies.get("username");
			// console.log(JSON.stringify(username));
            return username;
		},
		clearCookie: function () {
			username="";
			$cookies.remove("username");
		}
	}
}]);
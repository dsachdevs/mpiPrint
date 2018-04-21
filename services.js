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

mpiapp.service('login', ['$resource','$q', function($resource,$q){
	
	this.logMeIn =  function(){
		return $resource('http://localhost:3000/api/v1/login',{}, {
			login: {
				method: 'POST',
				isArray: false,
			}
		});

	}

}]);

mpiapp.service('apiCalls', ['$resource', function($resource){
	
	this.getGradeAndSize =  function(){
		return $resource('http://localhost:3000/api/v1/GradesAndSize',{}, {
			getData: {
				method: 'GET',
				isArray: false,
			}
		});

	}

}]);


mpiapp.service('dataStore', ['$q', function($q){

	this.dataObj = {
		heading : {
			quote : "1234",
			date : "",
			client : "",
			specs : ["","",""],
			trimsize : "",
			txtnos : 0,
			cvrnos : 0,
			cvrstock : "",
			cvrsize: "",
			cvrcolor1 : 4,
			cvrcolor2 : 4,
			cvruv : "N",
			cvraq : "N",
			txtstock : "",
			txtsize: "",
			txtcolor1 : 4,
			txtcolor2 : 4
		},

		quantity: {
			qty_lang : ["English", "French", "Other"],
			qty_arr : [{qty_eng : []}, {qty_fren : []}, {qty_othr : []}],
			qty_tot : []
		},

		cover:{
			cvr_lang : ["Net Sheets", "Press Spoils", "Bindery Overs"],
			cvr_parms : { cvr_ups: "", cvr_cwt: "", cvr_mweight: "", cvr_perMillion:""},
			cvr_arr : [{net_sheet : []}, {press_spoils : []}, {bindery_overs : []}],
			cvr_gross : [],
			cvr_tot : []
		},

		text:{
			txt_lang : ["Net Sheets", "Press Spoils", "Bindery Overs"],
			txt_parms : { txt_ups: "", txt_cwt: "", txt_mweight: "", txt_perMillion:""},
			txt_arr : [{net_sheet : []}, {press_spoils : []}, {bindery_overs : []}],
			txt_gross : [],
			txt_tot : []
		},

		print:{
			prt_lang : ["Impression 1", "Impression 2", "Plates & MR", "M/R W+T", "Running 1", "Running 2"],
			prt_parm_lang : ["Freight", "Weight", "Ctns", "Skids"],
			prt_parm_arr : [[],[],[],[]],
			prt_user_parm : [],
			prt_arr : [{Impression1 : []}, {Impression2 : []}, {PlatesMR : []}, {MRWT : []}, {Running1 : []}, {Running2 : []} ],
			prt_tot : []
		}

	};
	
}]);
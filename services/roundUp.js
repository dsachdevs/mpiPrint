mpiapp.service('roundUp', function(){
	return {
	//2 Decimal round up
		roundToTwo: function (num) {
			if(isNaN(num)) 
				{return 0.00} 
			else   
				{return +(Math.round(num + "e+2")  + "e-2");}
		},
		//0 Decimal round up
		roundUp: function (num) {
			if(isNaN(num)) 
				{return 0.00} 
			else   
				{return +(Math.round(num + "e+0")  + "e-0");}
		}

	}
});


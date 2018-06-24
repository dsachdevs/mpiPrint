mpiapp.service('calculateTotals', ['$q', '$timeout', function($q, $timeout){

	return {
		//Add array of arrays
		//array ==> array of arrays as input
		//result ==> array that would hold the addition
		needtodelete: function (array, result) {

			let outerIter=0, innerIter = 0;
			
			//number of arrays in the array
			innerIter = array.length;

			//max of the lengthof the individual arrays
			for(let i = 0; i<innerIter; i++){
				if(array[i].length > outerIter){
					outerIter = array[i].length;
				}
			}

			//adding the columns
			for(let i = 0; i<outerIter; i++)
			{
				var sum = 0
				for(let j=0; j<innerIter; j++)
				{
					sum += parseInt(array[j][i])|0;
					result[i] = sum;
				}
			}

		},
		
		verticalAddArray: function (array, result) {

			return $timeout(function() {
				let outerIter=0, innerIter = 0;
				//number of arrays in the array
				innerIter = array.length;
				//max of the lengthof the individual arrays
				for(let i = 0; i<innerIter; i++){
					if(array[i].length > outerIter){
						outerIter = array[i].length;
					}
				}
				//adding the columns
				for(let i = 0; i<outerIter; i++)
				{
					var sum = 0
					for(let j=0; j<innerIter; j++)
					{
						sum += parseInt(array[j][i])|0;
						result[i] = sum;
					}
				}
			});

		},
		clearCookie: function () {

		}
	}
}]);
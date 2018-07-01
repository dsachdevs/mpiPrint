mpiapp.service('calculateTotals', ['$q', '$timeout', 'roundUp', function($q, $timeout, roundUp){

	return {
		//Add array of arrays
		//array ==> array of arrays as input
		//result ==> array that would hold the addition
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
					var sum = 0;
					for(let j=0; j<innerIter; j++)
					{
						sum += roundUp.roundToTwo(array[j][i]);
						result[i] = roundUp.roundToTwo(sum);
					}
				}
			});

		},
		convertTotals: function (exrate, array, result) {
			return  $q(function(resolve) {
				for(let i = 0; i<array.length; i++){
					if (exrate > 0 && array[i] > 0) 
					{
						if(!isNaN(array[i] * exrate))
							result[i] = roundUp.roundToTwo(array[i] * exrate);
						resolve();
					}
				}
				
			});
		}
	}
}]);
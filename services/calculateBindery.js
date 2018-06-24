mpiapp.service('calculateBindery', ['$q','roundUp', function($q, roundUp){

	return {

		calculateBindery: function (quotenos, qntytotal, bndArray, bndCutting, bndFolding, bndPval, bndStitch, bndArray2) {
			return  $q(function(resolve) {

				for(let i = 0; i<quotenos; i++){

				if(parseInt(qntytotal[i]) > 0)
				{
					//calculating cutting
					bndArray[0][i] =  roundUp.roundToTwo(roundUp.roundToTwo(qntytotal[i]/1000) *  roundUp.roundToTwo(bndCutting.RunM) +  roundUp.roundToTwo(bndCutting.MR));

					let j=0;
					//calculating folding
				for (let pval in bndPval){
					bndArray[j+1][i] =  roundUp.roundToTwo(roundUp.roundToTwo(qntytotal[i]/1000 ) *  roundUp.roundToTwo(bndPval[pval]) *  roundUp.roundToTwo(bndFolding.RunM[j]) +  roundUp.roundToTwo(bndFolding.MR[j]));
					j++;
				}

					//Calculating stitching
					bndArray[5][i] =  roundUp.roundToTwo(roundUp.roundToTwo(qntytotal[i]/1000) *  roundUp.roundToTwo(bndStitch.RunM) +  roundUp.roundToTwo(bndStitch.MR));

					let result = bndArray.concat(bndArray2);

					resolve(result);
				}
			}
		})
		}
		
	}
}]);
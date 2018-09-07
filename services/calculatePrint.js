mpiapp.service('calculatePrint', ['$q','roundUp', function($q, roundUp){

	return {

		getPrtParm: function (quotenos, prtparm, qntytotal, cvrNetSheets, cvrMWeight, txtNetSheets, txtMWeight) {
			return  $q(function(resolve) {

				for(let i = 0; i<quotenos; i++){

				if(parseInt(qntytotal[i]) > 0)
				{
					//calculating Fright
					prtparm[0][i] = roundUp.roundToTwo(
						(
						roundUp.roundToTwo(
							roundUp.roundToTwo(cvrNetSheets[i]) * roundUp.roundToTwo(cvrMWeight)
							)
						 + 
						roundUp.roundToTwo(
							roundUp.roundToTwo(txtNetSheets[i]) * roundUp.roundToTwo(txtMWeight)
							)
						)/1000);

					//Populating weight
					prtparm[1][i] = "lbs";

					//calculating ctns
					prtparm[2][i] = parseInt(prtparm[0][i]/35)|1;

					//calculating skids
					prtparm[3][i] = roundUp.roundToTwo(prtparm[2][i]/60);

					resolve();
				}
			}
		})
		},

		getPrtPlates: function (nos, clr1, clr2, result) {
			return  $q(function(resolve) {
				let wt1=0, wt2=0;

				//populating plates
				result[0] = (result[0] || 0 ) + parseInt(nos/16) * (clr1 + clr2);

				let leftout = nos % 16;

				if(leftout > 0) {
				wt1 = parseInt(leftout/8) * Math.max(clr1, clr2);
				let leftout2 = leftout % 8;
				if(leftout2 > 0) {
					wt2 = parseInt(leftout2/4) * Math.max(clr1, clr2);
					}
				}

				//populating w+t
				result[1] = (result[1] || 0) + parseInt(wt1 + wt2);

				//populate running parms here

				resolve();	
		})
		},

		getPrt: function (quotenos, prtarray, prtUserParm, qntytotal, cvrGross, txtGross, prtTot) {
			return  $q(function(resolve) {

				for(let i = 0; i<quotenos; i++){

				if(parseInt(qntytotal[i]) > 0)
				{
				//Calculating impression 1
				prtarray[0][i]= roundUp.roundToTwo(cvrGross[i]) + roundUp.roundToTwo(txtGross[i]);

				//Calculating impression 2
				prtarray[1][i]= roundUp.roundToTwo(cvrGross[i]) + roundUp.roundToTwo(txtGross[i]);

				//calculating plates
				prtarray[2][i]= roundUp.roundToTwo(roundUp.roundToTwo(prtUserParm[0]) * 62.5);

				//calculating MR WT
				prtarray[3][i]= roundUp.roundToTwo(roundUp.roundToTwo(prtUserParm[1]) * 55); 

				//calculating running 1
				prtarray[4][i]= roundUp.roundToTwo(roundUp.roundToTwo(prtUserParm[2]) * roundUp.roundToTwo(prtarray[0][i]) / 1000);

				//calculating running 2
				prtarray[5][i]= roundUp.roundToTwo(roundUp.roundToTwo(prtUserParm[3]) * roundUp.roundToTwo(prtarray[1][i]) / 1000); 

				//calculating total
				prtTot[i] = roundUp.roundToTwo(roundUp.roundToTwo(prtarray[2][i] ) + roundUp.roundToTwo(prtarray[3][i]) + roundUp.roundToTwo(prtarray[4][i]) + roundUp.roundToTwo(prtarray[5][i]));
				}
				}
				resolve();
			});
		}
		
	}
}]);
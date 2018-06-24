mpiapp.directive('footerPanel', ['apiCalls', '$location','$anchorScroll' ,function (apiCalls, $location,$anchorScroll) {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/footerPanel.html',
		replace: true,
		link: function(scope) {
			//message
			scope.footerMessage = "Please save the quote in order to print it.";
			//Save function
			scope.printReady = false;
			scope.save_quote = function () {
			scope.modalbody = ["Please correct the below errors before saving the form:"];
				
			if(scope.validate())
			{
				apiCalls.saveQuote().saveData ({dataStore: scope.dataStore},
					function(data){
						if(data.status == 200) {
							scope.dataStore.heading.quote = data.quoteid;
							$('.collapse').collapse('hide');
							scope.footerMessage = "Quote " +  scope.dataStore.heading.quote + " ready for print!";
							scope.printReady = true;
						}
					},
					function(error){
							scope.footerMessage = "Unknown error while saving quote. Contact Tech-support";
					}	
				);
			}
			else {

			    var old = $location.hash();
				$location.hash('header');
				$anchorScroll();
				$location.hash(old);
				$('#exampleModal').modal('show');
			}
			}

			//print function
			scope.printToCart = function(data) {
			     if(data == 'd-print-none'){
			     	$('.collapse').collapse('hide');
			     }
			     else{
			     	$('.collapse').collapse('show');
			     }
			     scope.SkipPrint=data;     
			     $timeout(function(){
				 window.print();
				});

			     return false;
			}
		}
	}
}])
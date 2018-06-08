//Directives
mpiapp.directive('navBar', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/navbar.html',
		replace: true,
		scope:{
			loggeduser: "="
		}
	}
})

mpiapp.directive('titlePanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/title.html',
		replace: true,
	}
})

mpiapp.directive('headPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/head.html',
		replace: true,
	}
})

mpiapp.directive('quantityPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/quantity.html',
		replace: true,
	}
})

mpiapp.directive('coverPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/cover.html',
		replace: true,
	}
})

mpiapp.directive('textPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/text.html',
		replace: true,
	}
})

mpiapp.directive('printPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/printing.html',
		replace: true,
	}
})

mpiapp.directive('binderyPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/bindery.html',
		replace: true,
	}
})

mpiapp.directive('totalPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/totals.html',
		replace: true,
	}
})

mpiapp.directive('footerPanel', function () {
	/* body... */
	return {
		restrict: 'E',
		templateUrl: 'directives/footer.html',
		replace: true,
	}
})

mpiapp.directive('formattedDate', function(dateFilter) {
  return {
    require: 'ngModel',
    scope: {
      format: "="
    },
    link: function(scope, element, attrs, ngModelController) {

      ngModelController.$formatters.push(function(data) {
        //convert data from model format to view format
        return dateFilter(data, scope.format); //converted
      });
    }
  }
});
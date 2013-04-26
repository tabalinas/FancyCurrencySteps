(function(app) {

    app.ctrls.CurrencyConvertCtrl = function($scope) {
        $scope.currencies = [];

        angular.forEach(app.db.Currencies, function(currency) {
            $scope.currencies.push(new app.models.Currency(currency));
        });
    };

})(app);
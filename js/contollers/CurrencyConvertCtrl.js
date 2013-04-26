(function(app) {

    var CONVERT_SERVICE_URL = "https://rate-exchange.appspot.com/currency";

    app.ctrls.CurrencyConvertCtrl = function($scope) {
        var currencies = [];

        angular.forEach(app.db.Currencies, function(currency) {
            currencies.push(new app.models.Currency(currency));
        });

        angular.extend($scope, {

            currencies: currencies,

            convert: function() {
                var self = this,
                    valueToConvert = self.value,
                    currencyTicker = self.currency;

                angular.forEach(self.currencies, function(currency) {
                    if(currency.ticker === currencyTicker) {
                        currency.rate = 1;
                        currency.value = parseFloat(valueToConvert);
                        return;
                    }

                    $.ajax({
                        type: "GET",
                        url: CONVERT_SERVICE_URL,
                        dataType: "jsonp",
                        data: {
                            from: currencyTicker,
                            to: currency.ticker,
                            q: valueToConvert
                        }
                    }).done(function(data) {
                        currency.rate = data.rate;
                        currency.value = data.v;
                        self.$apply();
                    });
                });
            }
        });
    };

})(app);
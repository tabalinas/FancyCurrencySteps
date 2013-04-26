(function(app) {
    
    app.models.Currency = function(attrs) {
        angular.extend(this, {
            name: "",
            ticker: "",
            rate: 0,
            value: 0,
        }, attrs);
    };

})(app);
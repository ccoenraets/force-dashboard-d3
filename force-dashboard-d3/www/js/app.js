(function () {

    "use strict";

    var $container = $('#container');

    accounting.settings = {
        currency: {
            symbol : "$",   // default currency symbol is '$'
            format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal : ".",  // decimal point separator
            thousand: ",",  // thousands separator
            precision : 0   // decimal places
        },
        number: {
            precision : 0,  // default precision on numbers is 0
            thousand: ",",
            decimal : "."
        }
    }

    document.addEventListener("deviceready", function () {
        FastClick.attach(document.body);
        oauth.init()
            .done(function() {
                opportunities.fetch(oauth.getClient())
                    .done(function() {
                        route();
                    });
            })
            .fail(function() {
                alert('Authentication Error!');
            });

    }, false);

// Uncomment the code below if you want to work with a fake/static version of the data
//    opportunities.fetch(oauth.getClient())
//        .done(function() {
//            route();
//        });

    // Show/hide menu toggle
    $('#btn-menu').click(function () {
        if ($container.hasClass('offset')) {
            $container.removeClass('offset');
        } else {
            $container.addClass('offset');
        }
        return false;
    });

    // Simplistic view routing
    $(window).on('hashchange', route);

    function route() {
        var hash = window.location.hash;

        if (!hash) {
            dashboards['deals-by-month'].render();
            return;
        }
        dashboards[hash.substr(1)].render();

        $container.removeClass('offset');

    }

}());
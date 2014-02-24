if (!dashboards) var dashboards = {};

dashboards['pipeline'] = (function () {

    "use strict";

    function render() {

        var html =
            '<div class="widget full-height full-width">' +
                '<div id="chart1" class="chart bubble">' +
                    '<div class="title">Sales Pipeline</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>' +
            '<div class="card tooltip">' +
                '<div class="item item-text-wrap" style="background:#fbfbfb;text-align: center;">' +
                    '<div id="name" class="title"></div>' +
                    '<div class="graph">' +
                    '<h1 id="amount" style="margin-bottom:-8px; margin-top:12px;"></h1>' +
                    '<div id="gauge"></div>' +
                    '<span id="probability"></span>' +
                    '<p id="revenue"></p>' +
                    '<span id="closeDate"></span><br/>' +
                    '<span id="owner"></span>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $("#content").html(html);

        var $name = $('#name'),
            $revenue = $('#revenue'),
            probability = $('#probability'),
            $owner = $('#owner'),
            $closeDate = $('#closeDate'),
            $amount = $('#amount'),
            w = $('#content').width(),
            h = $('#content').height(),
            g;

        var chart = new charts.OpportunityBubbles('#chart1 .graph', opportunities.getTopOpportunities(), function(event) {
            var x = event.selectedShape[0][0].cx.baseVal.value;
            var y = event.selectedShape[0][0].cy.baseVal.value;

            var opp = opportunities.getById(event.seriesValue[0]);
            $name.html(opp.Name);
            probability.html(opp.Probability + '%');
            $revenue.html(accounting.formatMoney(opp.ExpectedRevenue));
            $owner.html('Owner: ' + opp.Owner.Name);
            $closeDate.html('Close Date: ' + moment(opp.CloseDate).format('MMMM Do YYYY'));
            $amount.html(accounting.formatMoney(opp.Amount));

            if (!g) {
                g = gauge('#gauge', opp.Probability);
            } else {
                g.update(opp.Probability);
            }
            if (x > w/2) {
                x = x - $('.card').width();
            }
            if (y > h/2) {
                y = y - $('.card').height();
            }
            $('.card').css({'left': x + 'px', 'top': y + 'px',  'opacity': 1});
        });
    }

    return {
        render: render
    }

}());
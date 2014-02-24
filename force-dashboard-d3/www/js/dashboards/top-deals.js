if (!dashboards) var dashboards = {};

dashboards['top-deals'] = (function () {

    function render() {

        var html =
            '<div class="widget full-width">' +
                '<div id="chart1" class="chart">' +
                    '<div class="title">Top Deals</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>' +
            '<div class="widget one-third">' +
                '<div class="empty">Select a deal in the chart above to see the details here.<br/><i class="ion-connection-bars"></i></div>' +
                '<div class="chart hidden">' +
                    '<div id="name" class="title"></div>' +
                    '<div class="graph">' +
                        '<h2 id="amount"></h2>' +
                        '<div id="gauge"></div>' +
                        '<span id="probability"></span>' +
                        '<p id="revenue"></p>' +
                        '<span id="closeDate"></span><br/>' +
                        '<span id="owner"></span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="widget two-thirds">' +
                '<div class="empty">Select a deal in the chart above to see the top deals for the selected deal owner.<br/><i class="ion-connection-bars"></i></div>' +
                '<div id="chart3" class="chart color2 hidden">' +
                    '<div class="title">Top Deals</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>';

        $('#content').html(html);

        var $name = $('#name'),
            $revenue = $('#revenue'),
            $owner = $('#owner'),
            $closeDate = $('#closeDate'),
            $amount = $('#amount'),
            $probability = $('#probability'),
            g,

            chart1 = new charts.TopDeals('#chart1 .graph', opportunities.getTopOpportunities(10), function(event) {
                var opp = opportunities.getById(event.seriesValue[0]);
                $name.html(opp.Name);
                $probability.html(opp.Probability + '%');
                $revenue.html(accounting.formatMoney(opp.ExpectedRevenue));
                $owner.html('Owner: ' + opp.Owner.Name);
                $closeDate.html('Close Date: ' + moment(opp.CloseDate).format('MMMM Do YYYY'));
                $amount.html(accounting.formatMoney(opp.Amount));
                if (!g) {
                    g = gauge('#gauge', opp.Probability);
                } else {
                    g.update(opp.Probability);
                }
                var filteredOpportunities = opportunities.filterByOwner(opp.Owner.Name);
                $('#chart3 .title').html('Top Deals for ' + opp.Owner.Name);
                chart3.update(opportunities.getTopOpportunities(10, filteredOpportunities));
                $('.widget .empty').remove();
                $('.widget .hidden').removeClass('hidden');
            });

            chart3 = new charts.TopDeals('#chart3 .graph', opportunities.getTopOpportunities(10));

    }

    return {
        render: render
    }

}());
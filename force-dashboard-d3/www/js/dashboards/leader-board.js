if (!dashboards) var dashboards = {};

dashboards['leader-board'] = (function () {

    function render() {

        var html =
            '<div class="widget full-width">' +
                '<div id="chart1" class="chart">' +
                    '<div class="title">Leader Board</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>' +
            '<div class="widget two-thirds">' +
                '<div id="chart2" class="chart color2">' +
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
            '</div>';

        $('#content').html(html);

        var $name = $('#name'),
            $revenue = $('#revenue'),
            $owner = $('#owner'),
            $closeDate = $('#closeDate'),
            $amount = $('#amount'),
            $probability = $('#probability'),
            g;

        var chart1 = new charts.OpportunitiesByOwner('#chart1 .graph', opportunities.groupByOwner(), function(event) {
            $('#chart2 .title').html("Top Deals for " + event.yValue);
            var filteredOpportunities = opportunities.filterByOwner(event.yValue);
            chart2.update(opportunities.getTopOpportunities(10, filteredOpportunities));
        });


        top10ForOwner = opportunities.getTopOpportunities(10);

        var chart2 = new charts.TopDeals('#chart2 .graph', top10ForOwner, function(event) {
            var opp = opportunities.getById(event.seriesValue[0]);
            $name.html(opp.Name);
            $revenue.html(accounting.formatMoney(opp.ExpectedRevenue));
            $probability.html(opp.Probability + '%');
            $owner.html('Owner: ' + opp.Owner.Name);
            $closeDate.html('Close Date: ' + moment(opp.CloseDate).format('MMMM Do YYYY'));
            $amount.html(accounting.formatMoney(opp.Amount));

            if (!g) {
                g = gauge('#gauge', opp.Probability);
            } else {
                g.update(opp.Probability);
            }

            $('.widget .empty').remove();
            $('.widget .hidden').removeClass('hidden');
        });

    }

    return {
        render: render
    }

}());
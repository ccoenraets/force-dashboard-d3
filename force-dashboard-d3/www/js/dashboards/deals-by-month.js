if (!dashboards) var dashboards = {};

dashboards['deals-by-month'] = (function () {

    function render() {

        var html =
            '<div class="widget full-width">' +
                '<div id="chart1" class="chart">' +
                    '<div class="title">Deals by Month</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>' +
            '<div class="widget">' +
                '<div id="chart2" class="chart">' +
                    '<div class="title">Stage Breakdown</div>' +
                    '<div id="graph2" class="graph"></div>' +
                '</div>' +
            '</div>' +
            '<div class="widget">' +
                '<div id="chart3" class="chart color2">' +
                    '<div class="title">Owner Breakdown</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>';

        $('#content').html(html);

        var chart1 = new charts.OpportunitiesByMonth('#chart1 .graph', opportunities.groupByMonth(), function(event) {
            var month = event.xValue;
            var filteredOpportunities = opportunities.filterByMonth(month);
            $("#chart2 .title").html("Stage Breakdown for " + month);
            $("#chart3 .title").html("Owner Breakdown for " + month);
            chart2.update(opportunities.groupByStage(filteredOpportunities));
            chart3.update(opportunities.groupByOwner(filteredOpportunities));
        });

        var chart2 = new charts.PieChart('#graph2', opportunities.groupByStage());
        var chart3 = new charts.OpportunitiesByOwner('#chart3 .graph', opportunities.groupByOwner());
    }

    return {
        render: render
    }

}());
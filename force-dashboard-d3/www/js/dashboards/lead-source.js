if (!dashboards) var dashboards = {};

dashboards['lead-source'] = (function () {

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
                    '<div class="title">Source Breakdown</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>' +
            '<div class="widget">' +
                '<div id="chart3" class="chart">' +
                    '<div class="title">Industry Breakdown</div>' +
                    '<div class="graph"></div>' +
                '</div>' +
            '</div>';

        $('#content').html(html);

        var chart1 = new charts.OpportunitiesByMonth('#chart1 .graph', opportunities.groupByMonth(), function(event) {
            var month = event.xValue;
            var filteredOpportunities = opportunities.filterByMonth(month);
            $("#chart2 .title").html("Stage Breakdown for " + month);
            $("#chart3 .title").html("Owner Breakdown for " + month);
            chart2.update(opportunities.groupByLeadSource(filteredOpportunities), "temp");
            chart3.update(opportunities.groupByIndustry(filteredOpportunities), "temp");
        });

        var chart2 = new charts.PieChart('#chart2 .graph', opportunities.groupByLeadSource());
        var chart3 = new charts.PieChart('#chart3 .graph', opportunities.groupByIndustry());
    }

    return {
        render: render
    }

}());
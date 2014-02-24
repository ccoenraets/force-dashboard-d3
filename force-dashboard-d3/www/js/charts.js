var charts = (function() {

    function OpportunitiesByMonth(selector, data, selectHandler) {

        var $selector = $(selector),
            svg = dimple.newSvg(selector, '100%', $selector.height()),
            chart = new dimple.chart(svg, data),
            yAxis = chart.addMeasureAxis("y", "total"),
            xAxis = chart.addCategoryAxis("x", "month"),
            series = chart.addSeries("Deal", dimple.plot.bar);


        xAxis.addOrderRule("month");

        series.barGap = 0.4;
        series.addEventHandler("click", selectHandler);
        series.addEventHandler("mouseover", function() {
            //remove default tooltip
            return false;
        });

        chart.setMargins(60, 6, 16, 18);
        chart.draw();
        xAxis.titleShape.remove();
        yAxis.titleShape.remove();

        function update(data) {
            chart.data = data;
            chart.draw();
            xAxis.titleShape.remove();
            yAxis.titleShape.remove();
        }

        return {
            update: update
        }

    }

    function OpportunitiesByOwner(selector, data, selectHandler) {

        var $selector = $(selector);
        svg = dimple.newSvg(selector, '100%', $selector.height()),
            chart = new dimple.chart(svg, data),
            yAxis = chart.addCategoryAxis("y", "category"),
            xAxis = chart.addMeasureAxis("x", "total"),
            series = chart.addSeries("Deal", dimple.plot.bar);

        yAxis.addOrderRule("total");
        series.barGap = 0.4;
        series.addEventHandler("click", selectHandler);
        series.addEventHandler("mouseover", function() {
            //remove default tooltip
            return false;
        });

        chart.setMargins(130, 0, 16, 18);
        chart.draw();
        xAxis.titleShape.remove();
        yAxis.titleShape.remove();

        function update(data) {
            chart.data = data;
            chart.draw();
            xAxis.titleShape.remove();
            yAxis.titleShape.remove();
        }

        return {
            update: update
        }

    }


    function PieChart(selector, data, pointClick) {

        var $selector = $(selector);

        function renderChart(data) {

            $selector.empty();

            $selector.append('<div class="legend"></div>');

            $selector.append('<div class="pie" style="width:250px;height:301px;padding-left:100px;"></div>');

            var width = $selector.width() - 150,
                height = $selector.height(),
                radius = Math.min(width, height) / 2,

                color = d3.scale.ordinal()
                    .range(["#665879", "#9D4545", "#9A7846", "#7B505F", "#768255", "#557781"]),

                pie = d3.layout.pie()
                    .value(function (d) {
                        console.log(d.total);
                        return d.total;
                    })
                    .sort(null),

                arc = d3.svg.arc()
                    .innerRadius(radius - 90)
                    .outerRadius(radius - 30),

                svg = d3.select(selector + ' .pie').append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),

                path = svg.datum(data)
                    .selectAll("path")
                    .data(pie)
                    .enter()
                    .append("path")
                    .attr("fill", function (d, i) {
                        console.log(d);
                        return color(i);
                    })
                    .attr("d", arc);



            var legend = d3.select(selector + ' .legend').append("svg")
                .attr("class", "vertical-legend")
                .attr("width", 220)
                .attr("height", 150)
                .selectAll("g")
                .data(color.domain().slice())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(16, " + i * 24 + ")";
                });


            legend.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .text(function (d) {
                    return data[d].category;
                });
        }

        function update(data) {
            renderChart(data);
        }

        renderChart(data);

        return {
            update: update
        }

    }

    function OpportunityBubbles(selector, data, selectHandler) {

        var $selector = $(selector),
            svg = dimple.newSvg(selector, '100%', $selector.height()),
            chart = new dimple.chart(svg, data),
            xAxis = chart.addTimeAxis("x", "CloseDate2"),
            yAxis = chart.addCategoryAxis("y", "ProbabilityPC"),
            zAxis = chart.addMeasureAxis("z", "Amount"),
            series = chart.addSeries("Id", dimple.plot.bubble);

        xAxis.tickFormat = "%Y-%m";
        yAxis.tickFormat = '%';
        xAxis.showGridlines = true;
        yAxis.showGridlines = true;

        series.addEventHandler("click", selectHandler);
        series.addEventHandler("mouseover", function() {
            //remove default tooltip
            return false;
        });
        chart.setMargins(70, 30, 16, 80);
        chart.draw();
        xAxis.titleShape.remove();
        yAxis.titleShape.remove();
    }

    function TopDeals(selector, data, clickHandler) {

        var $selector = $(selector),
            svg = dimple.newSvg(selector, '100%', $selector.height()),
            chart = new dimple.chart(svg, data),
            yAxis = chart.addCategoryAxis("y", "UniqueName"),
            xAxis = chart.addMeasureAxis("x", "Amount"),
            series = chart.addSeries("Id", dimple.plot.bar);

        yAxis.addOrderRule("Amount");

        series.barGap = 0.4;
        series.addEventHandler("click", clickHandler);
        series.addEventHandler("mouseover", function() {
            //remove default tooltip
            return false;
        });

        chart.setMargins(270, 0, 16, 18);
        chart.draw();
        xAxis.titleShape.remove();
        yAxis.titleShape.remove();

        function update(data) {
            chart.data = data;
            chart.draw();
            xAxis.titleShape.remove();
            yAxis.titleShape.remove();
        }

        return {
            update: update
        }

    }

    return {
        OpportunitiesByMonth: OpportunitiesByMonth,
        OpportunitiesByOwner: OpportunitiesByOwner,
        PieChart: PieChart,
        OpportunityBubbles: OpportunityBubbles,
        TopDeals: TopDeals
    }

}());
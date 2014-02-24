var opportunities = (function() {

    var data;

//    function fetch() {
//
////        var promise = $.ajax({url: "data.json"})
////            .done(function(response) {
////                data = response.records;
////                for (var i=0; i<data.length; i++)
////                {
////                    var item = data[i];
////                    item.CloseDate = new Date(item.CloseDate);
////                }
////            })
////            .fail(function(error) {
////                alert("ERROR")
////            });
////
////        return promise;
//
//        var deferred = $.Deferred();
//        data = opps.records;
//        for (var i=0; i<data.length; i++)
//        {
//            var item = data[i];
//            item.CloseDate2 = item.CloseDate;
//            item.CloseDate = new Date(item.CloseDate);
//            item.ProbabilityPC = item.Probability / 100;
//        }
//        deferred.resolve();
//
//        return deferred.promise();
//
//    }


    function fetch(client) {

        var deferred = $.Deferred(),
            queryStr = "SELECT Id, Name, Account.Name, Account.Industry, Owner.Name, StageName, Probability, Amount, ExpectedRevenue, CloseDate, LeadSource, Type, ForecastCategoryName, IsWon, IsClosed, CreatedDate FROM Opportunity";

        client.query(queryStr,
            function(response) {
                data = response.records;
                for (var i=0; i<data.length; i++)
                {
                    var item = data[i];
                    item.CloseDate2 = item.CloseDate;
                    item.CloseDate = new Date(item.CloseDate);
                    item.ProbabilityPC = item.Probability / 100;
                }
                deferred.resolve();
            },
            function(error) {
                alert(JSON.stringify(error));
                deferred.reject(error);
            });
        return deferred.promise();



        return promise;

//  Uncomment the code below if you want to work with a fake/static version of the data.
//        var deferred = $.Deferred();
//        data = opps.records;
//        for (var i=0; i<data.length; i++)
//        {
//            var item = data[i];
//            item.CloseDate = new Date(item.CloseDate);
//            item.ProbabilityPC = item.Probability / 100;
//        }
//        deferred.resolve();
//
//        return deferred.promise();

    }

    function filterByMonth(month) {
        return data.filter(function(item) {
            return item.CloseDate.getFullYear() + "/" + getMonth(item.CloseDate) === month;
        });
    }

    function filterByOwner(owner) {
        return data.filter(function(item) {
            return item.Owner.Name === owner;
        });
    }

    function groupByIndustry(items) {
        var map = {},
            group = [];

        if (!items) items = data;

        for (var i=0; i<items.length; i++)
        {
            var item = items[i];
            if (map[item.Account.Industry]) {
                map[item.Account.Industry] += item.Amount;
            } else {
                map[item.Account.Industry] = item.Amount;
            }
        }

        for (var key in map) {
            group.push({"category": key, "total": map[key]});
        }
        return top5(group);
    }

    function groupByOwner(items) {
        var map = {},
            group = [];

        if (!items) items = data;

        for (var i=0; i<items.length; i++)
        {
            var item = items[i];
            if (map[item.Owner.Name]) {
                map[item.Owner.Name] += item.Amount;
            } else {
                map[item.Owner.Name] = item.Amount;
            }
        }

        for (var key in map) {
            group.push({"category": key, "total": map[key]});
        }

        return top5(group);
    }

    function groupByForecastCategory(items) {
        var map = {},
            group = [];

        if (!items) items = data;

        for (var i=0; i<items.length; i++)
        {
            var item = items[i];
            if (map[item.ForecastCategoryName]) {
                map[item.ForecastCategoryName] += item.Amount;
            } else {
                map[item.ForecastCategoryName] = item.Amount;
            }
        }

        for (var key in map) {
            group.push({"category": key, "total": map[key]});
        }

        return top5(group);
    }

    function groupByStage(items) {
        var map = {},
            group = [];

        if (!items) items = data;

        for (var i=0; i<items.length; i++)
        {
            var item = items[i];
            if (map[item.StageName]) {
                map[item.StageName] += item.Amount;
            } else {
                map[item.StageName] = item.Amount;
            }
        }

        for (var key in map) {
            group.push({"category": key, "total": map[key]});
        }

        return top5(group);
    }

    function groupByLeadSource(items) {
        var map = {},
            group = [];

        if (!items) items = data;

        for (var i=0; i<items.length; i++)
        {
            var item = items[i];
            if (map[item.LeadSource]) {
                map[item.LeadSource] += item.Amount;
            } else {
                map[item.LeadSource] = item.Amount;
            }
        }

        for (var key in map) {
            group.push({"category": key, "total": map[key]});
        }

        return top5(group);
    }

    function top5(data) {

        data.sort(function(a, b) {
            return a.Amount < b.Amount ? 1 : -1;
        });

        var top5Array = data.slice(0,5),
            totalOthers = 0;

        for (var i=0; i<data.length-5; i++) {
            console.log(data[i]);
            totalOthers += data[i].total;
        }

        if (totalOthers > 0) {
            top5Array.push({category: "Others", total: totalOthers});
        }

        return top5Array;

    }

    function groupByMonth(items) {
        var map = {},
            group = [];

        if (!items) items = data;

        for (var i=0; i<items.length; i++)
        {
            var item = items[i];
            var month =  item.CloseDate.getFullYear() + "/" + getMonth(item.CloseDate);
            if (map[month]) {
                map[month] += item.Amount;
            } else {
                map[month] = item.Amount;
            }
        }

        for (var key in map) {
            group.push({"month": key, "total": map[key]});
        }

        group.sort(function(a, b) {
            return a.month > b.month ? 1 : -1;
        });

        return group;
    }

    function getTopOpportunities(count, items) {

        if (!items) items = data;

        items.sort(function(a, b) {
            return a.Amount <= b.Amount ? 1 : -1;
        });

        var sortedList = items.slice(0, count);

        // dedupe opportunity names
        for (var i=0; i<sortedList.length; i++)
        {
            sortedList[i].UniqueName = (i + 1) + '. ' + sortedList[i].Name;
        }

        return sortedList;
    }

    function getById(id) {
        for (var i=0; i<data.length; i++) {
            if (data[i].Id === id) {
                return data[i];
            }
        }

    }

    function getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month;
    }


    return {
        fetch: fetch,
        filterByMonth: filterByMonth,
        filterByOwner: filterByOwner,
        groupByIndustry: groupByIndustry,
        groupByLeadSource: groupByLeadSource,
        groupByOwner: groupByOwner,
        groupByForecastCategory: groupByForecastCategory,
        groupByStage: groupByStage,
        groupByMonth: groupByMonth,
        getTopOpportunities: getTopOpportunities,
        getById: getById
    }

}());
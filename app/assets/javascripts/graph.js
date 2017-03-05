queue()
    .defer(d3.json, "/tweets.json")
    .defer(d3.json, "assets/us-states.json")
    .await(makeGraphs);

function makeGraphs(error, projectsJson, statesJson) {
	
	//Clean projectsJson data
	var tweets = projectsJson;
	var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S")
	/*donorschooseProjects.forEach(function(d) {
		d["created_at"] = dateFormat.parse(d["created_at"]);
		d["created_at"].setDate(1);
		d["id"] = +d["id"];
	});*/

	//Create a Crossfilter instance
	var ndx = crossfilter(tweets);

	//Define Dimensions
	var dateDim = ndx.dimension(function(d) { return d["created_at"]; });
	var sceenNameDim = ndx.dimension(function(d) { return d["screen_name"]; });
	var povertyLevelDim = ndx.dimension(function(d) { return d["id"]; });
	var stateDim = ndx.dimension(function(d) { return d["school_state"]; });
	var totalDonationsDim  = ndx.dimension(function(d) { return d["id"]; });


	//Calculate metrics
	var numProjectsByDate = dateDim.group(); 
	var numSceenName = sceenNameDim.group();
	var numProjectsByPovertyLevel = povertyLevelDim.group();
	var totalDonationsByState = stateDim.group().reduceSum(function(d) {
		return d["id"];
	});

	var all = ndx.groupAll();
	var totalDonations = ndx.groupAll().reduceSum(function(d) {return d["id"];});


	//Define values (to be used in charts)
	/*var minDate = dateDim.bottom(1)[0]["date_posted"];
	var maxDate = dateDim.top(1)[0]["date_posted"];*/

    //Charts
	//var timeChart = dc.barChart("#time-chart");
	var resourceTypeChart = dc.rowChart("#screen-name-row-chart");
	var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
	//var usChart = dc.geoChoroplethChart("#us-chart");
	var numberProjectsND = dc.numberDisplay("#number-projects-nd");
	var totalDonationsND = dc.numberDisplay("#total-donations-nd");

	numberProjectsND
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(all);

	totalDonationsND
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(totalDonations)
		.formatNumber(d3.format(".3s"));

	/*timeChart
		.width(600)
		.height(160)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(dateDim)
		.group(numProjectsByDate)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.xAxisLabel("Year")
		.yAxis().ticks(4);*/

	resourceTypeChart
        .width(300)
        .height(250)
        .dimension(sceenNameDim)
        .group(numSceenName)
        .xAxis().ticks(4);

	povertyLevelChart
		.width(300)
		.height(250)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .xAxis().ticks(4);


	/*usChart.width(1000)
		.height(330)
		.dimension(stateDim)
		.group(totalDonationsByState)
		.colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
		.colorDomain([0, max_state])
		.overlayGeoJson(statesJson["features"], "state", function (d) {
			return d.properties.name;
		})
		.projection(d3.geo.albersUsa()
    				.scale(600)
    				.translate([340, 150]))
		.title(function (p) {
			return "State: " + p["key"]
					+ "\n"
					+ "Total Donations: " + Math.round(p["value"]) + " $";
		})*/

    dc.renderAll();

};
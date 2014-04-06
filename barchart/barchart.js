
var chartWidth = 960,
    chartHeight = 600;

var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = chartWidth - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom;

var svg = d3.select("#barchart")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

var chart = svg.append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// This is asynchronous so we should wait until we get data 
// before making the chart
d3.csv("f1.csv", function(error, data) {
  // Convert strings to numbers
  data.forEach(function(d) {
    d.year = +d.year;
    d.points = +d.points;
  });

  // Compute the extents of the data
  var minPoints = 0,
      maxPoints = d3.max(data, function(d) {return d.points;}),
      minYear = d3.min(data, function(d) {return d.year;}),
      maxYear = d3.max(data, function(d) {return d.year;}),
      teams = d3.set(data.map(function(d) {return d.constructor;})).values();
  
  var yearX = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.25)
      .domain(d3.range(minYear, maxYear+1));
  var teamX = d3.scale.ordinal()
      .rangeRoundBands([0, yearX.rangeBand()], 0.1)
      .domain(teams);
  var y = d3.scale.linear()
      .range([height, 0]) // y is backwards because 0 is the top left corner
      .domain([minPoints, maxPoints]);
  /*
  var colors = d3.scale.ordinal()
      .domain(teams)
      .range(colorbrewer.Set3[teams.length]);
  */
  var colors = d3.scale.category10()
      .domain(teams);

  // Set up the axes
  var xAxis = d3.svg.axis()
      .scale(yearX)
      .orient("bottom");
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
  chart.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);
  chart.append("g")
       .attr("class", "y axis")
       .call(yAxis);
  
  // Now add the bars
  var year = chart.selectAll(".year")
       .data(data)
     .enter().append("g")
       .attr("class", "g")
       .attr("transform", function(d) {
         return "translate("+yearX(d.year)+",0)";
       }).append("rect")
         .attr("width", teamX.rangeBand())
         .attr("x", function(d) {return teamX(d.constructor);})
         .attr("y", function(d) {return y(d.points);})
         .attr("height", function(d) {return height - y(d.points);})
         .style("fill", function(d) {return colors(d.constructor);});

  // Add the legend for the colors
  var legend = svg.selectAll(".legend")
      .data(teams)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });
  legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colors);
  legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) {return d;});
});



// D3 code for the bar chart

// Step 2: set up plot size and margins
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

// Step 3: load data file
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
      teams = d3.set(data.map(function(d) {return d.constructor;})).values(),
      years = d3.range(minYear, maxYear+1);

  // Step 4: add scales
  var mainX = d3.scale.ordinal() // The between-group axis
      .rangeRoundBands([0, width], 0.25)
      .domain(years);
  var subX = d3.scale.ordinal() // The within-group axis
      .rangeRoundBands([0, mainX.rangeBand()], 0.1)
      .domain(teams);
  var y = d3.scale.linear()
      .range([height, 0]) // y is backwards because 0 is the top left corner
      .domain([minPoints, maxPoints]);

// Step 5: set up the axes
  
// Step 6: add the bars

// Step 7: color bars

// Step 8: add the legend for the colors

// Step 9: add interactivity

});

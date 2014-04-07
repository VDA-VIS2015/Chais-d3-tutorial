
// Step 1: basic chart dimensions
var chartWidth = 960,
    chartHeight = 600;

var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = chartWidth - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom;

var svg = d3.select("#scatterplot")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

var chart = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Step 2: load data
d3.csv("cars.csv", function(error, data) {

  data.forEach(function(d) {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year;
    d.origin = +d.origin;
  });

  // Step 3: add scales
  var minWeight = 0,
      maxWeight = d3.max(data, function(d) {return d.weight;}),
      minMpg = 0,
      maxMpg = d3.max(data, function(d) {return d.mpg;}),
      cylinders = d3.set(data.map(function(d) {return d.cylinders;})).values();

  // put cylinders in order
  cylinders.sort(d3.ascending);

  // Step 3: add scales
  var x = d3.scale.linear()
      .range([0, width])
      .domain([minWeight, maxWeight]);
  var y = d3.scale.linear()
      .range([height, 0])
      .domain([minMpg, maxMpg]);
  var colors = d3.scale.ordinal()
      .range(colorbrewer.Set2[cylinders.length])
      .domain(cylinders);

// Step 4: add axes
  
// Step 5: add dots

// Step 6: add legend

});

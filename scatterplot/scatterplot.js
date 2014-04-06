
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

  var minWeight = 0,
      maxWeight = d3.max(data, function(d) {return d.weight;}),
      minMpg = 0,
      maxMpg = d3.max(data, function(d) {return d.mpg;}),
      cylinders = d3.set(data.map(function(d) {return d.cylinders;})).values();

  // put cylinders in order
  cylinders.sort(d3.ascending);

  var x = d3.scale.linear()
      .range([0, width])
      .domain([minWeight, maxWeight]);
  var y = d3.scale.linear()
      .range([height, 0])
      .domain([minMpg, maxMpg]);
  var colors = d3.scale.ordinal()
      .range(colorbrewer.Set2[cylinders.length])
      .domain(cylinders);
  
  var xAxis = d3.svg.axis()
      .scale(x)
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
  
  chart.selectAll(".dot")
       .data(data)
     .enter().append("circle")
       .attr("class", "dot")
       .attr("cx", function(d) {return x(d.weight);})
       .attr("cy", function(d) {return y(d.mpg);})
       .attr("r", 5)
       .style("fill", function(d) {return colors(d.cylinders);});

  // Legend
  var legend = svg.selectAll(".legend")
        .data(cylinders)
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {return "translate(0,"+i*20+")";});
  legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colors);
  legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d;});
});


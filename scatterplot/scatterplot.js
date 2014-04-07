
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

// Step 3: add scales

// Step 4: add axes
  
// Step 5: add dots

// Step 6: add legend

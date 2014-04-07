
// Step 1: basic plot setup
var chartWidth = 960,
    chartHeight = 800;

var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = chartWidth - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom;

var svg = d3.select("#network")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

var chart = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Step 2: add data

// Step 3: add layout

// Step 4: add edges

// Step 5: add nodes

// Step 6: color edges
  
// Step 7: add drag event
  
// Step 8: add tooltips


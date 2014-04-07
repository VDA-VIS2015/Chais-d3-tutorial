
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

// Step 4: add scales

// Step 5: set up the axes
  
// Step 6: add the bars

// Step 7: color bars

// Step 8: add the legend for the colors

// Step 9: add interactivity


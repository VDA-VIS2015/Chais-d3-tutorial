
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
d3.json("ubahn.json", function(error, graph) {

  // Step 3: add layout
  var layout = d3.layout.force()
      .linkDistance(50)
      .charge(-150)
      .size([width, height])
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  // Step 4: add edges
  // Add these first so nodes are over the edges
  var link = svg.selectAll(".line")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "line");

  // Step 5: add nodes
  var node = svg.selectAll(".station")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "station")
      .attr("r", 7);

// Step 6: color edges
  
// Step 7: add drag event
  
// Step 8: add tooltips
  
  // This gets updated every time the layout iterates
  layout.on("tick", function() {
    node.attr("cx", function(d) {return d.x;})
        .attr("cy", function(d) {return d.y;});
    link.attr("x1", function(d) {return d.source.x;})
        .attr("y1", function(d) {return d.source.y;})
        .attr("x2", function(d) {return d.target.x;})
        .attr("y2", function(d) {return d.target.y;});
  });

});


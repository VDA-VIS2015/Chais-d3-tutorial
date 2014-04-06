
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

var colors = d3.scale.ordinal()
    .domain(["U1", "U2", "U3", "U4", "U6"])
    .range(["red", "purple", "orange", "green", "brown"]);

d3.json("ubahn.json", function(error, graph) {

  var layout = d3.layout.force()
      .linkDistance(50)
      .charge(-150)
      .size([width, height])
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var node = svg.selectAll(".station")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "station")
      .attr("r", 7)
      .call(layout.drag);
  
  var link = svg.selectAll(".line")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "line")
      .attr("stroke", function(d) {return colors(d.line);});

  layout.on("tick", function() {
    node.attr("cx", function(d) {return d.x;})
        .attr("cy", function(d) {return d.y;});
    link.attr("x1", function(d) {return d.source.x;})
        .attr("y1", function(d) {return d.source.y;})
        .attr("x2", function(d) {return d.target.x;})
        .attr("y2", function(d) {return d.target.y;});
  });

});



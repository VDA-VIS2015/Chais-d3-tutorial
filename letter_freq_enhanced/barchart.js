var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// here we create two scales, the mainX responsible for all letters
var mainX = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// and subX which is reponsible for the two sub bars [english, german]
var subX = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(mainX)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

// select the chart-svg-component from the HTML document, apply new width and
// height and add a group-element in which everything will be drawn (the
// variable svg now references this group element.
var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the datafile (conversion done by the function type) and create the chart
// when ready
d3.tsv("data_enhanced.tsv", type, function(error, data) {
  // mainX is responsible for all available letters
  mainX.domain(data.map(function(d) { return d.letter; }));
  // subX is for creating two bars
  subX.domain(["english", "german"])
      .rangeRoundBands([0, mainX.rangeBand()], .1);   // available width is the width of one bar from mainX-scale
  y.domain([0, d3.max(data, function(d) { return d.german; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  // create a group element for each datarow
  var groups = svg.selectAll(".bar")
      .data(data)
      .enter().append("g")
      .attr("class", "group");

  // add two rects to each group element
  groups.append("rect")
      .attr("class", "barEN")
      .attr("x", function(d) { return mainX(d.letter); })
      .attr("y", function(d) { return y(d.english); })
      .attr("width", subX.rangeBand())
      .attr("height", function(d) {return height - y(d.english); });
  groups.append("rect")
      .attr("class", "barDE")
      .attr("x", function(d) { return mainX(d.letter) + subX.rangeBand(); })
      .attr("y", function(d) { return y(d.german); })
      .attr("width", subX.rangeBand())
      .attr("height", function(d) { return height - y(d.german); })

  // add the event-listener for the radio-buttons
  d3.selectAll("input").on("change", function() 
  {
    if(this.value === "alphabet") 
    {
	// sort by alphabet
        var sorted = data.sort(function(a,b) { return d3.ascending(a.letter, b.letter) } );
        changeLayout(sorted);
    }
    else if (this.value === "frequencyEN") 
    {
        // sort english letter frequencies
        var sorted = data.sort(function(a,b) { return d3.descending(a.english, b.english) } );
        changeLayout(sorted);
    }
    else
    {
        // sort german letter frequencies
        var sorted = data.sort(function(a,b) { return d3.descending(a.german, b.german) } );
        changeLayout(sorted);
    }
  });

});

function changeLayout(data) {
  // refresh the scales
  mainX.domain(data.map(function(d) { return d.letter; }));
  subX.domain(["english", "german"]).rangeRoundBands([0, mainX.rangeBand()], .1);
  
  // select all the groups
  var groups = svg.selectAll(".group").data(data);

  // and all the bars and apply the new "data" to them
  groups.selectAll(".barEN")
      .transition()
      .attr("x", function(d) { return mainX(d.letter); })
      .attr("y", function(d) { return y(d.english); })
      .attr("width", subX.rangeBand())
      .attr("height", function(d) {return height - y(d.english); });

  groups.selectAll(".barDE")
      .transition()
      .attr("x", function(d) { return mainX(d.letter) + subX.rangeBand(); })
      .attr("y", function(d) { return y(d.german); })
      .attr("width", subX.rangeBand())
      .attr("height", function(d) {return height - y(d.german); });
  
  // also refresh the x-axis
  svg.selectAll(".x.axis")
      .transition()
      .call(xAxis);
}

function type(d) {
  d.english = +d.english;
  d.german = +d.german;
  return d;
}


var margin = { top: 0, left: 0, right: 0, bottom: 0 };
var height = 400 - margin.top - margin.bottom;
var width = 800 - margin.left - margin.right;

var svg = d3.select("svg");
    //.attr("height", height + margin.top + margin.bottom)
    //.attr("width", width + margin.left + margin.right)
    //.append("g")
    //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
//    .defer(d3.)
    .await(ready);

var path = d3.geoPath()

function ready (error, data)
{
    console.log(data);

    var states = topojson.feature(data, data.objects.states).features;
    console.log(states);

    var mesh = topojson.mesh(data, data.objects.states, function(a, b)
			     { return a != b });
    
    svg.append("g")
	.attr("class", "states")
	.selectAll("path")
	.data(states)
	.enter().append("path")
	.attr("d", path);

    svg.append("path")
	.attr("class", "state-borders")
	.attr("d", path(mesh));
   
};

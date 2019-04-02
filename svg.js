var margin = { top: 0, left: 0, right: 0, bottom: 0 };
var height = 400 - margin.top - margin.bottom;
var width = 800 - margin.left - margin.right;

var gunvio_domain = [0, 20, 40, 60, 80, 100, 120];
var gunvio_color = d3.scaleThreshold()
    .domain(gunvio_domain)
    .range(d3.schemeReds[7]);

var gunvioData = d3.map();

var svg = d3.select("svg");
    //.attr("height", height + margin.top + margin.bottom)
    //.attr("width", width + margin.left + margin.right)
    //.append("g")
    //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v2.json")
    .defer(d3.tsv, "data/data_source0.tsv")
    .await(ready);

var path = d3.geoPath()

var fill = d3.scaleLinear().domain([1,25000]).range(["blue", "red"])

function ready (error, us, murder)
{
    if (error) throw error;
    
    console.log(us);
    console.log(murder)

    var states = topojson.feature(us, us.objects.states).features;
    console.log(states);

    var mesh = topojson.mesh(us, us.objects.states, function(a, b)
			     { return a != b });

    murder.forEach(function(d)
		   {
		       if (+d.year == 2014 && +d.month == 1)
		       {
			   gunvioData.set(d.state, +d.n_killed);
		       }
		   })

    console.log(gunvioData);
    
    svg.append("g")
	.attr("class", "states")
	.selectAll("path")
	.data(states)
	.enter().append("path")
	.attr("d", path)
	.style("fill", function(e) {

	    console.log(e.properties.name);

	    return gunvio_color( e.n_killed = gunvioData.get(e.properties.name) );
	    //return fill(path.area(e));
	});

    svg.append("path")
	.attr("class", "state-borders")
	.attr("d", path(mesh));

};

var years = document.getElementById("years");
var butt = document.getElementById("butt");
console.log(years.value);

butt.addEventListener("click", function(e)
		      {
			  d3.queue()
			      .defer(d3.json, "https://d3js.org/us-10m.v2.json")
			      .defer(d3.csv, "data/data_source0.csv")
			      .await(ready);
			  
		      });

var margin = { top: 0, left: 0, right: 0, bottom: 0 };
var height = 400 - margin.top - margin.bottom;
var width = 800 - margin.left - margin.right;

var trans;

var YEAR = years.value;
var MONTH = 6;

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
    .defer(d3.csv, "data/data_source0.csv")
    .await(ready);

var path = d3.geoPath()

function ready (error, us, murder)
{
    if (error) throw error;
    
    //console.log(us);
    //console.log(murder)

    YEAR = years.value;
    
    var states = topojson.feature(us, us.objects.states).features;
    //console.log(states);
    
    var mesh = topojson.mesh(us, us.objects.states, function(a, b)
			     { return a != b });
    
    murder.forEach(function(d)
		   {
		       if (+d.year == YEAR && +d.month == MONTH)
		       {
			   gunvioData.set(d.state, +d.n_killed);
		       }
		   })
	
    //console.log(gunvioData);
    svg.selectAll("g").remove();
    
    svg.append("g")
	.attr("class", "states")
	.selectAll("path")
	.data(states)
	.enter().append("path")
	.attr("d", path)
	.style("fill", function(e)
	       {
		   
		   //console.log(e.properties.name);
		   
		   return gunvio_color( e.n_killed = gunvioData.get(e.properties.name) );
	       });
    
    svg.append("path")
	.attr("class", "state-borders")
	.attr("d", path(mesh));


};

function update(error, murder)
{
    if (error) throw error;

    YEAR = years.value;
    
    murder.forEach(function(d)
		   {
		       if (+d.year == YEAR && +d.month == MONTH)
		       {
			   gunvioData.set(d.state, +d.n_killed);
		       }
		   });

    svg.select("path").remove()
    svg.enter().append("path")
	.attr("d", path)
	.style("fill", function(e)
	       {	   
		   //console.log(e.properties.name);
		   
		   return gunvio_color( e.n_killed = gunvioData.get(e.properties.name) );
	       });
    

    
    console.log(gunvioData);
    
}

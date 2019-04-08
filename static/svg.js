var years = document.getElementById("years");
var months = document.getElementById("months")
var butt = document.getElementById("butt");
var type = document.getElementById("type");

butt.addEventListener("click", function(e)
		      {
			  d3.queue()
			      .defer(d3.json, "https://d3js.org/us-10m.v2.json")
			      .defer(d3.csv, "static/data/data_source0.csv")
			      .await(ready);

		      });

var margin = { top: 75, left: 0, right: 0, bottom: 0 };
var height = 800 - margin.top - margin.bottom;
var width = 1000 - margin.left - margin.right;

var YEAR;
var MONTH;

var gunvio_domain = [0, 20, 40, 60, 80, 100];
var gunvio_color = d3.scaleThreshold()
    .domain(gunvio_domain)
    .range(d3.schemeReds[7]);


var gunvio_injured_domain = [0, 80, 160, 240, 320, 400, 480];
var gunvio_injured_color = d3.scaleThreshold()
    .domain(gunvio_injured_domain)
    .range(d3.schemeReds[8]);

var gunvio_incidents_domain = [0, 100, 200, 300, 400, 500];
var gunvio_incidents_color = d3.scaleThreshold()
    .domain(gunvio_incidents_domain)
    .range(d3.schemeReds[7]);


var gunvioData_killed = d3.map();
var gunvioData_injured = d3.map();
var gunvioData_incidents = d3.map();

var svg = d3.select("svg")
    .attr("height", height + margin.top + margin.bottom)
    //.attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v2.json")
    .defer(d3.csv, "static/data/data_source0.csv")
    .await(ready);

var path = d3.geoPath()

function ready (error, us, murder)
{
    if (error) throw error;

    //console.log(us);
    //console.log(murder)

    YEAR = years.value;
    MONTH = months.value;

    var states = topojson.feature(us, us.objects.states).features;
    //console.log(states);

    var mesh = topojson.mesh(us, us.objects.states, function(a, b)
			     { return a != b });

    murder.forEach(function(d)
		   {
		       if (+d.year == YEAR && +d.month == MONTH)
		       {
			   gunvioData_killed.set(d.state, +d.n_killed);
			   gunvioData_injured.set(d.state, +d.n_injured);
			   gunvioData_incidents.set(d.state, +d.incidents);
		       }
		   })
    //console.log(gunvioData);
    svg.selectAll("g").remove();

    base0 = document.getElementById("title")
    
    console.log(base0)
    console.log(base0.innerHTML)

if (type.value == "killed"){
	base0.innerHTML = "Gun Violence Deaths in the States on " + MONTH + "/" + YEAR;
}
else if (type.value == "incidents"){
  base0.innerHTML = "Gun Violence Incidents in the States on " + MONTH + "/" + YEAR;
}
else if (type.value == "injuries"){
	base0.innerHTML = "Gun Violence Injuries in the States on " + MONTH + "/" + YEAR;
}


    svg.append("g")
	.attr("class", "states")
	.selectAll("path")
	.data(states)
	.enter().append("path")
	.attr("d", path)
	.on("mouseover", function(d)
	    {
		div.transition()
                    .duration(200)
                    .style("opacity", .8);
		div.html("<b style='font-size: 18px;'>" + d.properties.name +
			 "</b><table><tr><td>Killed: " + gunvioData_killed.get(d.properties.name) +
			 "</td><td>Injured: " + gunvioData_injured.get(d.properties.name) +
			 "</td></tr><tr><td>Incidents: " + gunvioData_incidents.get(d.properties.name)+"</td></tr></table>")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            })
        .on("mouseout", function(d)
	    {
		div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
	.on("mousemove", function(d)
	    {
		div.style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
	    })
	.on("click", function(d)
	    {

		window.open("https://lawcenter.giffords.org/category/" + d.properties.name.replace(" ", "-"), 'gun laws');
	    })
	.style("fill", function(e)
	       {
		   if (type.value == "killed")
		   {
		       return gunvio_color( e.n_killed = gunvioData_killed.get(e.properties.name) );
		   }
		   else if (type.value == "incidents")
		   {
		       return gunvio_incidents_color( e.incidents = gunvioData_incidents.get(e.properties.name) );
		   }
		   else
		   {
		       return gunvio_injured_color( e.n_injured = gunvioData_injured.get(e.properties.name) );
		   }
	       })

    svg.append("path")
	.attr("class", "state-borders")
	.attr("d", path(mesh));


    var legend_labels;

    if (type.value == "killed")
    {
	legend_labels = ["< 20", "20 - 40", "40 - 60", "60 - 80", "80 - 100", "> 100"];
    }
    else if (type.value == "incidents")
    {
	legend_labels = ["< 100", "100 - 200", "200 - 300", "300 - 400", "400 - 500", "> 500"];
    }
    else
    {
	legend_labels = ["< 80", "80 - 160", "160 - 240", "240 - 320", "320 - 400", "400 - 480", "> 480"];
    }

    var legend = svg.selectAll("g.legend")

    if (type.value == "killed")
    {
	legend = legend.data(gunvio_domain)
    }
    else if (type.value == "incidents")
    {
	legend = legend.data(gunvio_incidents_domain)
    }
    else
    {
	legend = legend.data(gunvio_injured_domain)
    }

    legend = legend.enter().append("g")
	.attr("class", "legend");

    var ls_w = 20, ls_h = 20;

    rect = legend.append("rect")
	.attr("x", 900)
	.attr("y", function(d, i){ return height - 200 - (i*ls_h) - 5*ls_h;})
	.attr("width", ls_w)
	.attr("height", ls_h)

    if (type.value == "killed")
    {
	rect = rect.style("fill", function(d) {
	    return gunvio_color( d );
	})
    }
    else if (type.value == "incidents")
    {
	rect = rect.style("fill", function(d) {
	    return gunvio_incidents_color( d );
	})
    }
    else
    {
	rect = rect.style("fill", function(d) {
	    return gunvio_injured_color( d );
	})
    }
	rect.style("opacity", 1);

    legend.append("text")
	.attr("x", 930)
	.attr("y", function(d, i){ return height - 200 - (i*ls_h) - 4*ls_h - 10 + 4;})
	.text(function(d, i){ return legend_labels[i]; });

};

var timer;
var playing = false;

document.getElementById("fbw").addEventListener('click', function(e) {
	playing = true;
	clearInterval(timer);
	document.getElementsByTagName('i')[2].setAttribute('class', 'fa fa-pause');
	//document.getElementById('play').select('i').attr('class', 'fa fa-pause') ;
	timer = setInterval(function(d) {
		var YEAR = parseInt(years.value);
		var MONTH = parseInt(months.value);
		if(MONTH > 1){
			months.value = (MONTH - 1) + "";
		}else{
			months.value = "12";
			if(YEAR == 2014){
				years.value = "2017";
			}else{
				years.value = (YEAR - 1) + "";
			}
		}
		d3.queue()
				.defer(d3.json, "https://d3js.org/us-10m.v2.json")
				.defer(d3.csv, "static/data/data_source0.csv")
				.await(ready);
	}, 200);
});

document.getElementById("bw").addEventListener('click', function(e) {
	playing = true;
	clearInterval(timer);
	document.getElementsByTagName('i')[2].setAttribute('class', 'fa fa-pause');
	//document.getElementById('play').select('i').attr('class', 'fa fa-pause') ;
	timer = setInterval(function(d) {
		var YEAR = parseInt(years.value);
		var MONTH = parseInt(months.value);
		if(MONTH > 1){
			months.value = (MONTH - 1) + "";
		}else{
			months.value = "12";
			if(YEAR == 2014){
				years.value = "2017";
			}else{
				years.value = (YEAR - 1) + "";
			}
		}
		d3.queue()
				.defer(d3.json, "https://d3js.org/us-10m.v2.json")
				.defer(d3.csv, "static/data/data_source0.csv")
				.await(ready);
	}, 500);
});

document.getElementById("fw").addEventListener('click', function(e) {
	playing = true;
	clearInterval(timer);
	document.getElementsByTagName('i')[2].setAttribute('class', 'fa fa-pause');
	//document.getElementById('play').select('i').attr('class', 'fa fa-pause') ;
	timer = setInterval(function(d) {
		var YEAR = parseInt(years.value);
		var MONTH = parseInt(months.value);
		if(MONTH < 12){
			months.value = (MONTH + 1) + "";
		}else{
			months.value = "1";
			if(YEAR == 2017){
				years.value = "2014";
			}else{
				years.value = (YEAR + 1) + "";
			}
		}
		d3.queue()
				.defer(d3.json, "https://d3js.org/us-10m.v2.json")
				.defer(d3.csv, "static/data/data_source0.csv")
				.await(ready);
	}, 500);
});

document.getElementById("ffw").addEventListener('click', function(e) {
	playing = true;
	clearInterval(timer);
	document.getElementsByTagName('i')[2].setAttribute('class', 'fa fa-pause');
	//document.getElementById('play').select('i').attr('class', 'fa fa-pause') ;
	timer = setInterval(function(d) {
		var YEAR = parseInt(years.value);
		var MONTH = parseInt(months.value);
		if(MONTH < 12){
			months.value = (MONTH + 1) + "";
		}else{
			months.value = "1";
			if(YEAR == 2017){
				years.value = "2014";
			}else{
				years.value = (YEAR + 1) + "";
			}
		}
		d3.queue()
				.defer(d3.json, "https://d3js.org/us-10m.v2.json")
				.defer(d3.csv, "static/data/data_source0.csv")
				.await(ready);
	}, 200);
});

document.getElementById("play").addEventListener('click', function(e) {
	if(playing) {
		clearInterval(timer);
		document.getElementsByTagName('i')[2].setAttribute('class', 'fa fa-play');
		playing = false;
	}else{
		playing = true;
		clearInterval(timer);
		document.getElementsByTagName('i')[2].setAttribute('class', 'fa fa-pause');
		timer = setInterval(function(d) {
			var YEAR = parseInt(years.value);
			var MONTH = parseInt(months.value);
			if(MONTH < 12){
				months.value = (MONTH + 1) + "";
			}else{
				months.value = "1";
				if(YEAR == 2017){
					years.value = "2014";
				}else{
					years.value = (YEAR + 1) + "";
				}
			}
			d3.queue()
					.defer(d3.json, "https://d3js.org/us-10m.v2.json")
					.defer(d3.csv, "static/data/data_source0.csv")
					.await(ready);
		}, 1000);
	}
});

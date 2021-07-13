var width = 600;
var height = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};

var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/revenues.json").then((info) => {

	console.log(info);
	var lugares = info.map((d,i) => {return (info[i].month);});

	console.log(lugares);

	var accent = d3.scaleOrdinal()
		.domain(lugares)
		.range(d3.schemeSet3);

	var x = d3.scaleBand()
		.domain(lugares)
		.range([0,400])
		.paddingInner(0.3)
		.paddingOuter(0.3);

	var y = d3.scaleLinear()
		.domain([0, 54273])
		.range([0,400]);

	var rectangles = g.selectAll("rect")
		.data(info)
		.enter()
		.append("rect")
			.attr("x", (d, i) => {return x(info[i].month);})
			.attr("y", 0)
			.attr("width", 25)
			.attr("height", (d,i) => {return y(info[i].revenue);})
			.attr("fill", "yellow");

	var bottomAxis = d3.axisBottom(x);
	g.append("g")
		.attr("class", "bottomAxis")
		.attr("transform", "translate(0, " + height+ ")")
		.call(bottomAxis)
		.selectAll("text")
		.style("text-anchor", "end")
	    .attr("x", "-5")
	    .attr("y", "10")
	    .attr("transform", "rotate(-20)");
	g.append("text")
		.attr("class", "x axis-label")
		.attr("x", width/2 + 50)
		.attr("y", height+140)
		.attr("font-size", "20px")
		.attr("text-anchor", "end")
		.style("fill", "black")
		.attr("transform", "translate(-70, -50)")
		.text("Month");

	var leftAxis = d3.axisLeft(y);
	g.append("g")
		.attr("class", "leftAxis")
		.call(leftAxis);
	g.append("text")
		.attr("class", "y axis-label")
		.attr("x", -(height/2))
		.attr("y", -40)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill", "black")
		.text("Revenue (dlls)");

});
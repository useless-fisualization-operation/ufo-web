<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	// how long transitions last (msec)
	let transitionTime = 2000;

	let longStates = {
		AL: 'Alabama',
		AK: 'Alaska',
		AZ: 'Arizona',
		AR: 'Arkansas',
		CA: 'California',
		CO: 'Colorado',
		CT: 'Connecticut',
		DE: 'Delaware',
		DC: 'District of Columbia',
		FL: 'Florida',
		GA: 'Georgia',
		HI: 'Hawaii',
		ID: 'Idaho',
		IL: 'Illinois',
		IN: 'Indiana',
		IA: 'Iowa',
		KS: 'Kansas',
		KY: 'Kentucky',
		LA: 'Louisiana',
		ME: 'Maine',
		MD: 'Maryland',
		MA: 'Massachusetts',
		MI: 'Michigan',
		MN: 'Minnesota',
		MS: 'Mississippi',
		MO: 'Missouri',
		MT: 'Montana',
		NE: 'Nevada',
		NV: 'Nebraska',
		NH: 'New Hampshire',
		NJ: 'New Jersey',
		NM: 'New Mexico',
		NY: 'New York',
		NC: 'North Carolina',
		ND: 'North Dakota',
		OH: 'Ohio',
		OK: 'Oklahoma',
		OR: 'Oregon',
		PA: 'Pennsylvania',
		RI: 'Rhode Island',
		SC: 'South Carolina',
		SD: 'South Dakota',
		TN: 'Tennessee',
		TX: 'Texas',
		UT: 'Utah',
		VT: 'Vermont',
		VA: 'Virginia',
		WA: 'Washington',
		WV: 'West Virginia',
		WI: 'Wisconsin',
		WY: 'Wyoming'
	};

	let longVars = {
		Num_Sightings: 'Number of UFO sightings',
		Rel_Very_important: 'Religion: very important',
		Rel_Somewhat_important: 'Religion: somewhat important',
		Rel_Not_too_important: 'Religion: not too important',
		Rel_Not_at_all_important: 'Religion: not at all important',
		Rel_Dont_know: "Religion: don't know how important",
		Population_Density: 'Population density'
	};

	// use Margin Convention to layout the SVG with an inner plotting region
	// and an outer region for axes, labels, etc.
	let outerWidth = 600;
	let outerHeight = 400;
	let margins = { top: 10, bottom: 60, left: 60, right: 30 };
	let innerWidth = outerWidth - margins.left - margins.right;
	let innerHeight = outerHeight - margins.top - margins.bottom;

	let scatterOuter = d3
		.select('svg#scatter-container')
		.attr('width', outerWidth)
		.attr('height', outerHeight);

	let scatterInner = scatterOuter
		.append('g')
		.attr('id', 'inner-region')
		.attr('width', innerWidth)
		.attr('height', innerHeight)
		.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

	// load data
	let url_other =
		'https://raw.githubusercontent.com/useless-fisualization-operation/ufo-web/main/dataset/scatterplot_data.csv';
	//let url_sight = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-web/main/dataset/num_sightings_per_state_per_year.csv"
	let url_sight =
		'https://raw.githubusercontent.com/useless-fisualization-operation/ufo-web/main/dataset/num_sightings_per_state_per_year.csv';
	d3.csv(url_other, cleanup_data)
		.then((d_other) => {
			d3.csv(url_sight, cleanup_data).then((d_sight) => {
				setup(d_other, d_sight);
				update(d_other, d_sight);
			});
		})
		.catch((error) => console.log(error));
	// d3.csv() reads in everything as a string.  convert all string numbers to numbers.
	function cleanup_data(d) {
		for (let k in d) {
			if (k != 'State') d[k] = +d[k];
		}
		return d;
	}

	// declare some variables that will be assigned in functions below
	let d_other_global = [];
	let d_sight_global = [];
	let d_sight_curr = [];
	let xScale, yScale;
	let xAxis, yAxis;
	let min_year = 1920,
		max_year = 2023;

	// setup() is for setting up plot elements once at the beginning
	// update() will be used for the initial draw and for redrawing upon change
	function setup(d_other, d_sight) {
		d_other_global = d_other;
		d_sight_global = d_sight;

		//State is not quantitative, so it shouldn't be selected
		//let variables = Object.keys(d_other[0]).filter(d => d != 'model')
		let variables = Object.keys(d_other[0]).filter(
			(d) => d != 'State' && (d != 'Rel_Sample_size') & (d != 'Num_Sightings')
		);

		// populate selectors
		d3.select('select.yvar')
			.on('change', () => update(d_other_global, d_sight_global)) // make sure .on() is above .selectAll()
			.selectAll('option')
			.data(variables)
			.enter()
			.append('option')
			.attr('value', (d) => d)
			.text((d) => longVars[d]);

		d3.select('#button_start_year').on('input', () => {
			update(d_other_global, d_sight_global);
		});

		d3.select('#button_end_year').on('input', () => {
			update(d_other_global, d_sight_global);
		});

		// initialize values of select elements.
		d3.select('select.yvar').property('value', 'Population_Density');
		d3.select('#button_start_year').property('value', min_year);
		d3.select('#button_end_year').property('value', max_year);

		d3.select('#button_start_year').property('min', min_year);
		d3.select('#button_start_year').property(
			'max',
			d3.select('#button_end_year').property('value')
		);
		d3.select('#button_end_year').property(
			'min',
			d3.select('#button_start_year').property('value')
		);
		d3.select('#button_end_year').property('max', max_year);

		// read current selections
		let xvar = 'Num_Sightings';
		let yvar = d3.select('select.yvar').property('value');
		let start_year = +d3.select('#button_start_year').property('value');
		let end_year = +d3.select('#button_end_year').property('value');

		//change Num_sightings in d_other s.t. they refelct the chosen year range
		d_other.map((d) => {
			//d_sight_curr = d_sight.filter(d_s => d_s["Year"] == start_year && d_s["State"]==d["State"]);
			d_sight_curr = d_sight.filter(
				(d_s) =>
					d_s['Start_Year'] == start_year &&
					d_s['Stop_Year'] == end_year &&
					d_s['State'] == d['State']
			);
			d['Num_Sightings'] = d_sight_curr[0]['Num_Sightings'];
			return;
		});

		// create scales based on selections
		// the domain will be modified when selections change
		xScale = d3
			.scaleLinear()
			.domain([0, d3.max([1, d3.max(d_other.map((d) => d[xvar]))])])
			.range([0, innerWidth]);
		xAxis = d3.axisBottom(xScale).tickSize(-innerHeight);

		yScale = d3
			.scaleLinear()
			.domain([0, d3.max(d_other.map((d) => d[yvar]))])
			.range([0, innerHeight].reverse());
		yAxis = d3.axisLeft(yScale).tickSize(-innerWidth);

		// create axes
		scatterInner
			.append('g')
			.attr('transform', 'translate(' + 0 + ', ' + innerHeight + ')')
			.attr('class', 'x axis') // note: two classes; handy!
			.call(xAxis);

		scatterInner.append('g').attr('class', 'y axis').call(yAxis);

		scatterOuter
			.append('text')
			.attr('class', 'x axis')
			.attr('x', margins.left + innerWidth / 2)
			.attr('y', outerHeight - margins.bottom / 2)
			.attr('text-anchor', 'middle')
			.text(longVars[xvar]);

		scatterOuter
			.append('text')
			.attr('class', 'y axis')
			.attr('x', margins.left / 2)
			.attr('y', margins.top + innerHeight / 2)
			.attr('text-anchor', 'middle')
			.attr('transform', `rotate(-90 ${margins.left / 2} ${margins.top + innerHeight / 2})`)
			.text(longVars[yvar]);
	}

	// update elements that get modified when selections change
	function update(d_other, d_sight) {
		let xvar = 'Num_Sightings';
		let yvar = d3.select('select.yvar').property('value');
		let start_year = +d3.select('#button_start_year').property('value');
		let end_year = +d3.select('#button_end_year').property('value');

		d3.select('#button_start_year').property('min', min_year);
		d3.select('#button_start_year').property(
			'max',
			d3.select('#button_end_year').property('value')
		);
		d3.select('#button_end_year').property(
			'min',
			d3.select('#button_start_year').property('value')
		);
		d3.select('#button_end_year').property('max', max_year);

		//change Num_sightings in d_other s.t. they refelct the chosen year range
		d_other.map((d) => {
			//d_sight_curr = d_sight.filter(d_s => d_s["Year"] == start_year && d_s["State"]==d["State"]);
			d_sight_curr = d_sight.filter(
				(d_s) =>
					d_s['Start_Year'] == start_year &&
					d_s['Stop_Year'] == end_year &&
					d_s['State'] == d['State']
			);
			d['Num_Sightings'] = d_sight_curr[0]['Num_Sightings'];
			return;
		});

		// update scales
		xScale.domain([0, d3.max([1, d3.max(d_other.map((d) => d[xvar]))])]);
		yScale.domain([0, d3.max(d_other.map((d) => d[yvar]))]);

		// update axes
		scatterInner.select('.x.axis').transition().duration(transitionTime).call(xAxis);
		scatterInner.select('.y.axis').transition().duration(transitionTime).call(yAxis);

		// main plot
		scatterInner
			.selectAll('circle')
			.data(d_other)
			.join(
				(enter) =>
					enter
						.append('circle')
						.attr('cx', (d) => xScale(d[xvar]))
						.attr('cy', (d) => yScale(d[yvar]))
						.style('fill', 'black')
						.attr('r', (d) => 4)
						.style('opacity', 0.6)
						.append('title') // TITLE APPENDED HERE
						.text(function (d) {
							return longStates[d['State']];
						}),
				(update) =>
					update
						.transition()
						.duration(transitionTime)
						.attr('cx', (d) => xScale(d[xvar]))
						.attr('cy', (d) => yScale(d[yvar])),
				(exit) => exit.transition().duration(transitionTime).remove()
			);

		// axis labels
		scatterOuter
			.selectAll('text.y.axis') // select text elements with two both classes
			.transition()
			.duration(transitionTime)
			.text(longVars[yvar]);
	}
</script>

<div class="scatterplot">
	<h1>Relationship between UFO Sightings and Other Attributes</h1>

	<div id="controls">
		<p>
			Select UFO sightings from year <input
				type="number"
				id="button_start_year"
				onKeyDown="return false"
			/>
			to <input type="number" id="button_end_year" onKeyDown="return false" />
		</p>
		<p>
			Select attribute for y axis:
			<span class="yvar">
				<select class="yvar" name="yvar" />
			</span>
		</p>
	</div>

	<svg id="scatter-container" />

	<!--
    <div id="slider-container"></div>
    <div class="main">
      <h2>Age
        <span id="slider3textmin">0</span> - <span id="slider3textmax">0</span>
      </h2>
  
      <div id="slider3" class="d3-slider d3-slider-horizontal"></div>
    -->
</div>

<style>
	.scatterplot {
		background-color: #f5f5f5;
	}
</style>

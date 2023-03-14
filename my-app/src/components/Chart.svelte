<script>
	import { loop_guard } from 'svelte/internal';
</script>

<div class="scatterplot">
	<h4 class="title">Relationship between UFO Sightings and Other Attributes</h4>

	<div id="controls">
		<p>
			Sightings from year <input type="number" id="button_start_year" onKeyDown="return false" />
			to
			<input type="number" id="button_end_year" onKeyDown="return false" />
		</p>
		<p>
			First Attribute (X axis):
			<span class="xvar">
				<select class="xvar" name="xvar" />
			</span>
		</p>
		<p>
			Second Attribute (Y axis):
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

	<script>
		function sleep(time) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, time);
			});
		}

		sleep(3000).then(() => {
			// how long transitions last (msec)
			let transitionTime = 2000;
			let state_indices =
				//changed for full rel
				[
					'AK',
					'AL',
					'AR',
					'AZ',
					'CA',
					'CO',
					'CT',
					'DC',
					'DE',
					'FL',
					'GA',
					'HI',
					'IA',
					'ID',
					'IL',
					'IN',
					'KS',
					'KY',
					'LA',
					'MA',
					'MD',
					'ME',
					'MI',
					'MN',
					'MO',
					'MS',
					'MT',
					'NC',
					'ND',
					'NE',
					'NH',
					'NJ',
					'NM',
					'NV',
					'NY',
					'OH',
					'OK',
					'OR',
					'PA',
					'RI',
					'SC',
					'SD',
					'TN',
					'TX',
					'UT',
					'VA',
					'VT',
					'WA',
					'WI',
					'WV',
					'WY'
				];

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
				Rel_Num_Sightings: 'Number of UFO sightings per resident', //changed for full rel
				Rel_Very_important: 'Religion: very important',
				Rel_Somewhat_important: 'Religion: somewhat important',
				Rel_Not_too_important: 'Religion: not too important',
				Rel_Not_at_all_important: 'Religion: not at all important',
				Rel_Dont_know: "Religion: don't know how important",
				Population_Density: 'Population density',
				Total_Resident_Population: 'Total population',
				Illicit_Drug_Use: 'Illicit Drug Use', //changed for full rel
				Marijuana_Use: 'Marijuana Use', //changed for full rel
				Illicit_Drug_Use_Other_Than_Marijuana: 'Illicit Drug Use Other Than Marijuana', //changed for full rel
				Binge_Alcohol_Use: 'Binge Alcohol Use', //changed for full rel
				Illicit_Drug_Use_Disorder: 'Illicit Drug Use Disorder', //changed for full rel
				Serious_Mental_Illness: 'Serious Mental Illness', //changed for full rel
				Any_Mental_Illness: 'Any Mental Illness' //changed for full rel
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
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/scatterplot_data_full_relative_drugsincl.csv';
			//let url_other = "https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/scatterplot_data_full_relative.csv"
			//let url_other = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-web/main/dataset/scatterplot_data.csv"
			//let url_sight = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-web/main/dataset/num_sightings_per_state_per_year.csv"
			//let url_sight = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-web/main/dataset/num_sightings_per_state_per_year.csv"
			let url_sight =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/relative_num_sightings_per_state_per_year_timespan_rows_full.csv';
			let url_sight_abs =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/num_sightings_per_state_per_year_timespan_rows_full.csv'; //changed for x axis
			d3.csv(url_other, cleanup_data, function (error, d_other) {
				if (error) {
					console.log(error);
					return;
				}
				d3.csv(url_sight, cleanup_data, function (error, d_sight) {
					if (error) {
						console.log(error);
						return;
					}
					d3.csv(url_sight_abs, cleanup_data, function (error, d_sight_abs) {
						if (error) {
							console.log(error);
							return;
						}
						setup(d_other, d_sight, d_sight_abs);
						update(d_other, d_sight, d_sight_abs);
					});
				});
			});

			// d3.csv() reads in everything as a string.  convert all string numbers to numbers.
			function cleanup_data(d) {
				for (k of Object.keys(d)) {
					if (k != 'State') d[k] = +d[k];
				}
				return d;
			}

			// declare some variables that will be assigned in functions below
			let d_other_global = [];
			let d_sight_global = [];
			let d_sight_abs_global = []; //changed for x axis
			let xScale, yScale;
			let xAxis, yAxis;
			let min_year = 1910,
				max_year = 2023;

			function get_state_year_idx(state, start_year, end_year) {
				//changed for full rel
				state_idx = state_indices.indexOf(state);
				start_year_idx = start_year - min_year;
				end_year_idx = end_year - min_year;
				return (
					state_idx * 6555 +
					(114.5 - start_year_idx / 2.0) * start_year_idx +
					end_year_idx -
					start_year_idx
				);
			}

			// setup() is for setting up plot elements once at the beginning
			// update() will be used for the initial draw and for redrawing upon change
			//function setup(d_other, d_sight) {
			function setup(d_other, d_sight, d_sight_abs) {
				//changed for x axis
				d_other_global = d_other;
				d_sight_global = d_sight;
				d_sight_abs_global = d_sight_abs; //changed for x axis

				//State is not quantitative, so it shouldn't be selected
				//let variables = Object.keys(d_other[0]).filter(d => d != 'model')
				//let variables = Object.keys(d_other[0]).filter(d => d != 'State' && d!="Rel_Sample_size" & d!="Num_Sightings")
				let variables = Object.keys(d_other[0]).filter(
					(d) =>
						d != 'State' &&
						(d != 'Rel_Sample_size') & (d != 'Num_Sightings') & (d != 'Rel_Num_Sightings')
				); //changed for full rel
				let x_variables = ['Num_Sightings', 'Rel_Num_Sightings']; //changed for x axis

				// border around plotting region
				/*scatterInner
			.append('rect')
			.attr('width', innerWidth)
			.attr('height', innerHeight)
			.attr('fill', 'transparent')
			//.attr('stroke', 'black')*/

				// populate selectors
				d3.select('select.xvar') //changed for x axis
					//.on('change', () => update(d_other_global, d_sight_global)) // make sure .on() is above .selectAll()
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global)) //changed for x axis
					.selectAll('option')
					.data(x_variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('select.yvar')
					//.on('change', () => update(d_other_global, d_sight_global)) // make sure .on() is above .selectAll()
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global)) //changed for x axis
					.selectAll('option')
					.data(variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('#button_start_year').on('input', () => {
					//update(d_other_global, d_sight_global); //changed for x axis
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				d3.select('#button_end_year').on('input', () => {
					//update(d_other_global, d_sight_global);//changed for x axis
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				// initialize values of select elements.
				d3.select('select.xvar').property('value', 'Rel_Num_Sightings'); //changed for x axis
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
				//let xvar = 'Num_Sightings'
				//let xvar = 'Rel_Num_Sightings' //changed for full rel
				let xvar = d3.select('select.xvar').property('value'); //changed for x axis
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					//d_sight_curr = d_sight.filter(d_s => d_s["Year"] == start_year && d_s["State"]==d["State"]);
					//d_sight_curr = d_sight.filter(d_s => d_s["Start_Year"] == start_year && d_s["Stop_Year"] == end_year && d_s["State"]==d["State"]);
					//d_sight_curr = [d_sight[get_state_year_idx(d["State"], start_year, end_year)]]//changed for full rel
					if (xvar == 'Num_Sightings') {
						//changed for x axis
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}

					//d["Num_Sightings"] = d_sight_curr[0]["Num_Sightings"];
					//d["Rel_Num_Sightings"] = d_sight_curr[0]["Rel_Num_Sightings"]; //changed for full rel
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar]; //changed for x axis
					return;
				});

				// create scales based on selections
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					//changed for x axis
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale = d3
					.scaleLinear()
					//.domain([0, d3.max([1, d3.max(d_other.map(d => d[xvar]))])])//changed for full rel
					//.domain([0, 1, d3.max(d_other.map(d => d[xvar]))]) //changed for x axis, evtl Fehler drin und man müsste 1 sowieso rausnehmen
					.domain([0, x_domain_max]) //changed for x axis
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

				//var slider = createD3RangeSlider(0, 10, "#slider-container");
				/*
			rangeSlider(document.querySelector('#slider-container'), {
			//orientation: 'vertical'
			// min value
			min: 1910,
			// max value
			max: 2023,
			
			// step size
			step: 1,
			});

			d3.select("div#slider3")
						.call(d3.slider().axis(true).min(0).max(10).value([2,4])
						.on("slide", function(evt,value) {
							dispatch.filter(value);
							d3.select("#slider3textmin").text(Math.floor(value[0]));
							d3.select("#slider3textmax").text(Math.floor(value[1]))
						}))*/
			}

			// update elements that get modified when selections change
			//function update(d_other, d_sight) {
			function update(d_other, d_sight, d_sight_abs) {
				//let xvar = 'Num_Sightings'
				//let xvar = 'Rel_Num_Sightings' //changed for full res
				let xvar = d3.select('select.xvar').property('value'); //changed for x axis
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
					//d_sight_curr = d_sight.filter(d_s => d_s["Start_Year"] == start_year && d_s["Stop_Year"] == end_year && d_s["State"]==d["State"]);
					//d_sight_curr = [d_sight[get_state_year_idx(d["State"], start_year, end_year)]]//changed for full rel

					if (xvar == 'Num_Sightings') {
						//changed for x axis
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}

					//d["Num_Sightings"] = d_sight_curr[0]["Num_Sightings"];
					//d["Rel_Num_Sightings"] = d_sight_curr[0]["Rel_Num_Sightings"];//changed for full res
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar]; //changed for x axis
					return;
				});

				// update scales
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					//changed for x axis
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				//xScale.domain([0, d3.max([1, d3.max(d_other.map(d => d[xvar]))])])//changed for full rel
				//xScale.domain([0, d3.max(d_other.map(d => d[xvar]))])
				xScale.domain([0, x_domain_max]); //changed for x axis
				yScale.domain([0, d3.max(d_other.map((d) => d[yvar]))]);

				// update axes
				scatterInner.select('.x.axis').transition().duration(transitionTime).call(xAxis);
				scatterInner.select('.y.axis').transition().duration(transitionTime).call(yAxis);

				// main plot
				scatterInner
					.selectAll('circle')
					.data(d_other)
					.enter()
					.append('circle')
					.attr('cx', function (d) {
						return xScale(d['Rel_Num_Sightings']);
					}) // changed for x axis
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					})
					.style('fill', 'black')
					.attr('r', 4)
					.style('opacity', 0.6)
					.append('title') // TITLE APPENDED HERE
					.text(function (d) {
						return longStates[d['State']];
					});

				scatterInner.selectAll('circle').data(d_other).exit().remove();

				scatterInner
					.selectAll('circle')
					.data(d_other)
					.transition()
					.duration(transitionTime)
					.attr('cx', function (d) {
						return xScale(d['Rel_Num_Sightings']);
					}) // changed for x axis
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					});

				// axis labels
				scatterOuter //changed for x axis
					.selectAll('text.x.axis') // select text elements with two both classes
					.transition()
					.duration(transitionTime)
					.text(longVars[xvar]);

				scatterOuter
					.selectAll('text.y.axis') // select text elements with two both classes
					.transition()
					.duration(transitionTime)
					.text(longVars[yvar]);
			}
		});
	</script>
</div>

<style lang="scss">
	.scatterplot {
		z-index: 1000;
		background-color: white;
		padding: 1em;
		border-radius: 0.3em;
		overflow: hidden;
	}

	p {
		margin: 0.2em;
	}

	// Colorful
	input {
		// text input
		background-color: #f2f2f2;
		border: none;
		color: #000000;
		padding: 0.5em;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 0.2em;
		border-radius: 0.3em;
	}

	select {
		// dropdown
		background-color: #f2f2f2;
		border: none;
		color: #000000;
		padding: 0.5em;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 0.2em;
		border-radius: 0.3em;
	}
</style>

<script>
</script>

<div class="scatterplot">
	<style>
		circle {
			fill: var(--accent);
			opacity: 0.6;
		}

		line {
			stroke-width: 1px;
			opacity: 0.6;
		}

		text {
			font-size: 0.8em;
		}
	</style>
	<h4 class="title">Relationship with Other Attributes on State Level </h4>

	<div id="controls">
		<p>
			Sightings from year <input type="number" id="button_start_year"/>
			to
			<input type="number" id="button_end_year"/>
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
				Rel_Num_Sightings: 'Number of UFO sightings per resident',
				Rel_Very_important: 'Religion: very important (in %)',
				Rel_Somewhat_important: 'Religion: somewhat important (in %)',
				Rel_Not_too_important: 'Religion: not too important (in %)',
				Rel_Not_at_all_important: 'Religion: not at all important (in %)',
				Rel_Dont_know: "Religion: don't know how important (in %)",
				Population_Density: 'Population density (population per square mile)',
				Total_Resident_Population: 'Total population',
				Illicit_Drug_Use: 'Illicit Drug Use (in %)',
				Marijuana_Use: 'Marijuana Use (in %)',
				Illicit_Drug_Use_Other_Than_Marijuana: 'Illicit Drug Use Other Than Marijuana (in %)',
				Binge_Alcohol_Use: 'Binge Alcohol Use (in %)',
				Illicit_Drug_Use_Disorder: 'Illicit Drug Use Disorder (in %)', 
				Serious_Mental_Illness: 'Serious Mental Illness (in %)', 
				Any_Mental_Illness: 'Any Mental Illness (in %)'
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
			let url_sight =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/relative_num_sightings_per_state_per_year_timespan_rows_full.csv';
			let url_sight_abs =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/num_sightings_per_state_per_year_timespan_rows_full.csv';
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

			//convert all strings that represent numbers to numbers.
			function cleanup_data(d) {
				for (k of Object.keys(d)) {
					if (k != 'State') d[k] = +d[k];
				}
				return d;
			}

			// declare some variables that will be assigned in functions below
			let d_other_global = [];
			let d_sight_global = [];
			let d_sight_abs_global = [];
			let xScale, yScale;
			let xAxis, yAxis;
			let min_year = 1910,
				max_year = 2023;

			function get_state_year_idx(state, start_year, end_year) {
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

			const f = formatValue = d3.format(".3s");

			function axis_label_format(d) {
			if (d==0) {
				return 0;
			}
			if (d >= 1000000) {
				return d/1000000 + " M.";
			}
			if (d<=0.001) {
				return f(d)
			}
			return d;
			}

			// setup() is for setting up plot elements once at the beginning
			// update() will be used for the initial draw and for redrawing upon change
			function setup(d_other, d_sight, d_sight_abs) {
				d_other_global = d_other;
				d_sight_global = d_sight;
				d_sight_abs_global = d_sight_abs;

				//State is not quantitative, so it shouldn't be selected
				let variables = Object.keys(d_other[0]).filter(
					(d) =>
						d != 'State' &&
						(d != 'Rel_Sample_size') & (d != 'Num_Sightings') & (d != 'Rel_Num_Sightings')
				);
				let x_variables = ['Num_Sightings', 'Rel_Num_Sightings'];

				// border around plotting region
				// populate selectors
				d3.select('select.xvar')
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global))
					.selectAll('option')
					.data(x_variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('select.yvar')
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global))
					.selectAll('option')
					.data(variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('#button_start_year').on('change', () => {
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				d3.select('#button_end_year').on('change', () => {
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				// initialize values of select elements.
				d3.select('select.xvar').property('value', 'Rel_Num_Sightings');
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
				let xvar = d3.select('select.xvar').property('value');
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					if (xvar == 'Num_Sightings') {
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar];
					return;
				});

				// create scales based on selections
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale = d3
					.scaleLinear()
					.domain([0, x_domain_max])
					.range([0, innerWidth]);
				xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(axis_label_format);

				yScale = d3
					.scaleLinear()
					.domain([0, d3.max(d_other.map((d) => d[yvar]))])
					.range([0, innerHeight].reverse());
				yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(axis_label_format);

				// create axes
				scatterInner
					.append('g')
					.attr('transform', 'translate(' + 0 + ', ' + innerHeight + ')')
					.attr('class', 'x axis')
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
			function update(d_other, d_sight, d_sight_abs) {
				let xvar = d3.select('select.xvar').property('value');
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				if (start_year<min_year) {
					d3.select("#button_start_year").property('value', min_year)
				}
				if (end_year>max_year) {
					d3.select("#button_end_year").property('value', max_year)
				}
				if (start_year>end_year && end_year>=min_year) {
					d3.select("#button_start_year").property('value', end_year)
				}
				if (start_year>end_year && end_year<min_year) {
					d3.select("#button_start_year").property('value', min_year)
					d3.select("#button_end_year").property('value', min_year)
				}
				start_year = +d3.select("#button_start_year").property('value')
				end_year = +d3.select("#button_end_year").property('value')

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

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					if (xvar == 'Num_Sightings') {
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar];
					return;
				});

				// update scales
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale.domain([0, x_domain_max]);
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
					})
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					})
					.attr('r', 4)
					.append('title') // display state name when hovering over point
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
					})
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					});

				// axis labels
				scatterOuter
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
		box-shadow: 0 0 0.5em 0.1em rgba(0, 0, 0, 0.2);

		& > svg {
			display: block;
			margin: 2em;
		}
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
		margin: 0.2em;
		border-radius: 0.3em;
	}
</style>

<div class="heatmap">
	<div id="my_dataviz" />
	<script>
		if (!localStorage.getItem('first_time_heatmap')) {
			// first time loaded!
			localStorage.setItem('first_time_heatmap', '1');
		} else {
			//heatmap tutorial: https://d3-graph-gallery.com/graph/heatmap_tooltip.html

			// set the dimensions and margins of the graph
			var margin = { top: 30, right: 120, bottom: 40, left: 50 },
				width = 750 - margin.left - margin.right,
				height = 450 - margin.top - margin.bottom;

			// append the svg object to the body of the page
			var svg = d3
				.select('#my_dataviz')
				.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			// Labels of row and columns
			var myGroups = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
			var months = ['Jan', 'Feb', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
			var myVars = [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
				'24',
				'25',
				'26',
				'27',
				'28',
				'29',
				'30',
				'31'
			];

			let tickLabels = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'June',
				'July',
				'Aug',
				'Sept',
				'Oct',
				'Nov',
				'Dec'
			];
			let fullmonths = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			var x = d3
				.scaleBand()
				.range([0, width - 120])
				.domain(myGroups)
				.padding(0.01);
			let xAxisGenerator = d3.axisBottom(x);
			xAxisGenerator.tickFormat((d, i) => tickLabels[i]);
			let xAxis = svg
				.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxisGenerator);

			// Build X scales and axis:
			/*   var x = d3.scaleBand()
    .range([ 0, width-120 ])
    .domain(myGroups)
    .padding(0.01);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)) */

			// Build y scales and axis:
			var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
			svg.append('g').call(d3.axisLeft(y));

			svg
				.append('text') // text label for the x axis
				.attr('x', width / 2)
				.attr('y', height + 0.8 * margin.bottom)
				.style('text-anchor', 'middle')
				.text('Month');

			svg
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', 0 - margin.left)
				.attr('x', 0 - height / 2)
				.attr('dy', '1em')
				.style('text-anchor', 'middle')
				.text('Day');

			//Read the data
			d3.csv(
				'https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoEntireData.csv',
				function (data) {
					//data preprocessing (get frequency)
					var tally = {};
					var last_Date = '';

					data.forEach(function (line) {
						var parts = line['Date'].split(' ');
						//console.log(parts[0]);//parts 0 has date, parts 1 has time
						//var datetime = formatDate.parse(parts[0]);
						//console.log(datetime);
						//var date = formatDate(datetime).split(' ')[0];
						var date = parts[0];
						var month = date.split('/')[0];
						var day = date.split('/')[1];
						date = day + '/' + month; //ignore year for now
						//console.log(date);
						tally[date] = (tally[date] || 0) + 1;
						last_Date = date;
					});

					var data_ref = [];

					for (var date in tally) {
						if (tally.hasOwnProperty(date)) {
							data_ref.push({
								month: date.split('/')[1],
								day: date.split('/')[0],
								frequency: tally[date]
							});
						}
					}

					// Build color scale
					var myColor = d3
						.scaleLinear()
						.range(['white', '#ff6f08'])
						.domain([0, d3.max(data_ref, (d) => d.frequency)]);

					var legend = d3
						.legendColor()
						.scale(myColor)
						.labelFormat(d3.format('.0f'))
						.title('Number of UFO Sightings');

					svg.append('g').attr('transform', 'translate(500,100)').call(legend);

					// create a tooltip
					var tooltip = d3
						.select('#my_dataviz')
						.append('div')
						.style('opacity', 0)
						.attr('class', 'tooltip')
						.style('background-color', 'white')
						.style('border', 'solid')
						.style('border-width', '2px')
						.style('border-radius', '5px')
						.style('padding', '5px');

					// Three function that change the tooltip when user hover / move / leave a cell
					var mouseover = function (d) {
						tooltip.style('opacity', 1);
					};
					var mousemove = function (d) {
						var day = d.day + 'th';
						if (d.day == 1 || d.day == 21 || d.day == 31) {
							day = d.day + 'st';
						}
						if (d.day == 2 || d.day == 22) {
							day = d.day + 'nd';
						}
						if (d.day == 3 || d.day == 23) {
							day = d.day + 'rd';
						}
						var month = fullmonths[d.month - 1];
						tooltip
							.html(
								'On the ' +
									day +
									' of ' +
									month +
									' there were <br>' +
									d.frequency +
									' UFO sightings in total'
							)
							.style('left', d3.mouse(this)[0] + 70 + 'px')
							.style('top', d3.mouse(this)[1] + 'px');
					};
					var mouseleave = function (d) {
						tooltip.style('opacity', 0);
					};

					// add the squares
					svg
						.selectAll()
						.data(data_ref, function (d) {
							return d.month + ':' + d.day;
						})
						.enter()
						.append('rect')
						.attr('x', function (d) {
							return x(d.month);
						})
						.attr('y', function (d) {
							return y(d.day);
						})
						.attr('width', x.bandwidth())
						.attr('height', y.bandwidth())
						.style('fill', function (d) {
							return myColor(d.frequency);
						})
						.on('mouseover', mouseover)
						.on('mousemove', mousemove)
						.on('mouseleave', mouseleave);
				}
			);
		}
	</script>
</div>

<style>
	.heatmap {
		background-color: white;
		padding: 1em;
		border-radius: 0.3em;
	}
</style>

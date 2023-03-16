<script>
</script>

<div class="heatmap">
	<h4 class="title">UFO sightings per day of the year</h4>

	<div id="my_dataviz" />
	<select class="stateDrop" name="stateDrop"></select>

	<script>
		function sleep(time) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, time);
			});
		}

		sleep(3000).then(() => {
			// set the dimensions and margins of the graph
			var margin = { top: 30, right: 120, bottom: 40, left: 50 },
				width = 750 - margin.left - margin.right,
				height = 550 - margin.top - margin.bottom;

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
					'WY',
          			'all'
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
				WY: 'Wyoming',
       			 all: 'All States'
			};
			var x = d3
				.scaleBand()
				.range([0, width - 170])
				.domain(myGroups)
				.padding(0.01);
			let xAxisGenerator = d3.axisBottom(x);
			xAxisGenerator.tickFormat((d, i) => tickLabels[i]);
			let xAxis = svg
				.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxisGenerator);


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

			let myColor
 			let legend

			// create a tooltip
			let tooltip = d3.select("#my_dataviz")
			.append("div")
			.style("opacity", 0)
			.attr("class", "tooltip")
			.style("background-color", "white")
			.style("border", "solid")
			.style("border-width", "2px")
			.style("border-radius", "5px")
			.style("padding", "5px")
  
			// Three function that change the tooltip when user hover / move / leave a cell
			let mouseover = function(d) {
				tooltip.style("opacity", 1)
				d3.select(this)
				.style("stroke", "black")
			}
			let mousemove = function(d) {
				var day=d.day+"th"
				if(d.day==1||d.day==21||d.day==31){
				day=d.day+"st"
				}
				if(d.day==2||d.day==22){
				day=d.day+"nd"
				}
				if(d.day==3||d.day==23){
				day=d.day+"rd"
				}
				var month=fullmonths[d.month-1]
				tooltip
				.html("On the "+day+" of "+month+" there were <br>" + d.frequency+" UFO sightings in total")
				.style("left", (d3.mouse(this)[0]+70) + "px")
				.style("top", (d3.mouse(this)[1]) + "px")
			}
			let mouseleave = function(d) {
				tooltip.style("opacity", 0)
				d3.select(this)
				.style("stroke", "none")
			}

			//Read the data
			d3.csv("https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoEntireData2.csv", function(data) {
    d3.select('select.stateDrop')
    .on('change', ()=>update(data))
    .selectAll('option')
    .data(state_indices)
    .enter()
    .append('option')
    .attr('value', d=>d)
    .text(d=>longStates[d])

    d3.select('select.stateDrop')
    .property('value','all')

    myColor = d3.scaleLinear()
      .range(["white", "#ff6f08"])
      .domain([0,2082])
      //.domain([0,d3.max(data_ref, d => d.frequency)])

    legend = d3.legendColor()
      .scale(myColor)
      .labelFormat(d3.format(".0f"))
      .title("Number of UFO Sightings");

    svg.append("g")
    .attr("class","legendClass")
      .attr("transform", "translate(500,100)")
      .call(legend);

    update(data)
  })

  function update(data){
    //data preprocessing (get frequency)
    var state=d3.select('select.stateDrop').property('value')
    var tally = {};
    var last_Date='';
    data.forEach(function(line) {
      if(state=='all' || line['State']==state){
        var parts = line['Date'].split(' ');
        var date=parts[0];
        var month=date.split('/')[0]
        var day=date.split('/')[1]
        date=parseInt(day)+'/'+parseInt(month)//ignore year for now
        //console.log(date);
        tally[date] = (tally[date]||0) + 1;
        last_Date=date;
      }
    });

    var data_ref = [];
    for (var date in tally) {
        if (tally.hasOwnProperty(date)) {
          if(!isNaN(date.split('/')[1])&&!isNaN(date.split('/')[1])){
            data_ref.push({
                month: date.split('/')[1],
                day: date.split('/')[0],
                frequency: tally[date]
            });
          }
        }
    }


  
    // add the squares
    svg.selectAll()
      .data(data_ref, function(d) {return d.month+':'+d.day;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.month) })
        .attr("y", function(d) { return y(d.day) })
        .attr("rx", 4)
        .attr("ry", 4)
        .style("stroke-width", 2)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.frequency)} )
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  }
		});
	</script>
</div>

<style lang="scss">
	.heatmap {
		box-shadow: 0 0 0.5em 0.1em rgba(0, 0, 0, 0.2);
		background-color: white;
		padding: 1em;
		border-radius: 0.3em;

		& > svg {
			display: block;
			margin: 0 auto;
		}
	}
</style>

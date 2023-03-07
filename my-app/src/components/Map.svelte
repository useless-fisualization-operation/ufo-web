<script>
// @ts-nocheck
    import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getAirportData, getReligionData, getUfoData} from '../routes/data.js';
	//import {scrape_NUFORC} from '../routes/scraper.mjs'; 
	import * as d3 from 'd3';
	import { zoom, select } from "d3";
	import { check_outros, debug } from 'svelte/internal';
	import Modal from './Modal.svelte';
	import ufoSVG from '/src/static/UFO_try-cropped.svg';
	let showModal = false;

	//const puppeteer = require(['puppeteer']);
	// ----------- Map: ----------- 
	let us_states =  ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	let us_states_short = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
	const path = geoPath().projection(null);

	// ----------- Data: ----------- 
	var airports = getAirportData(projection);
	var seaplane_base = getAirportData(projection, seaplane_base);
	var ufoData = [];
	let states = [];
	var religion = getReligionData();
	
	// ----------- Airports: -----------
	var airport_types = ["large_airport","medium_airport","small_airport","heliport","seaplane_base","balloonport"]; 
	const airportTypes = {
		large_airport:airports.filter(o=>o.type=="large_airport"),
		medium_airport:airports.filter(o=>o.type=="medium_airport"),
		small_airport:airports.filter(o=>o.type=="small_airport"),
		heliport:airports.filter(o=>o.type=="heliport"),
		seaplane_base:airports.filter(o=>o.type=="seaplane_base"),
		balloonport:airports.filter(o=>o.type=="balloonport")
	}
	const displayAirport = {
		large_airport:true,
		medium_airport:false,
		small_airport:false,
		heliport:false,
		seaplane_base:false,
		balloonport:false
	}
	
	// ----------- Sidebar Info: ----------- 
	let selected;
	let selectedUfo;
	let selectedAirport;

	// -----------  Legend checkmarks: ----------- 
	let displayUfos = true;
	let displayReligion = false;
	
	// ----------- Load Data: ----------- 
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json')
			.then(d => d.json())
		states = topojson.feature(us, us.objects.states).features;
		await getUfoData(projection).then(r=>ufoData=r);	
	});
	
	// ----------- Style: ----------- 
    let radialScale = d3.scaleLinear().domain([0, 1]).range(["#f7fcf5","#00441b"]);
	//.range(["#fff5eb","#7f2704"]);
	//.range(["#fff5f0","#67000d"]);
	function colorStates(name){
		let i = us_states.indexOf(name);
		let t = us_states_short[i];
		let r = religion.filter(o=>o.State==t)[0];
		if(typeof r !== "undefined") return radialScale(r["Very important"]);
		return "blue"
	}

	// ----------- Zoom and Pan: ----------- 
	let bindHandleZoom, bindInitZoom;
	let innerWidth = 0;
	let innerHeight = 0;
    $: width = innerWidth;
    $: height = innerHeight;
	$: zoomX = zoom()
    	.scaleExtent([1, 50])
    	.translateExtent([[0, 0],[width, height]])
    	.on("zoom", handleZoom);
	function handleZoom(e) {select(bindHandleZoom).attr("transform", e.transform);}
	$:if (bindInitZoom) {select(bindInitZoom).call(zoomX);}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="sidebar">
	<p class="logo">Useless Fisualization Operation</p>
	<p class="description">State</p>
	<div class="selectedName">{selected?.properties.name ?? '-'}</div>
	<p class="description">UFO: Location</p>
	<div class="selectedName">{selectedUfo?.City ?? '-'}</div>
	<p class="description">UFO: Date</p>
	<div class="selectedName">{selectedUfo?.Date ?? '-'}</div>
	<p class="description">Airport</p>
	<div class="selectedName">{selectedAirport?.name ?? '-'}</div>
	<div class="legend">
		<!--<img src="https://nuforc.org/wp-content/uploads/wpforms/624-c824613929464448a7e062112379f845/4CE93866-484F-456E-B8AA-84840A3EB6EC-2aa57680e38166928b0dc3a9df49c674.jpeg", height:1vh, width:1vw>
		--><div class="item">
			<input type=checkbox bind:checked={displayUfos}>
			<div class="ufo_legend"></div>
			<p class="desc">UFO sighting</p>
		</div>
		{#each airport_types as airport_type}
			<div class="item">
				<input type=checkbox bind:checked={displayAirport[airport_type]}>
				<div class="airport_legend"></div>
				<p class="desc">{airport_type}</p>
			</div>
		{/each}
		<div class="item">
			<input type=checkbox bind:checked={displayReligion}>
			<div class="religion_legend" style="background-color: {radialScale(0.75)}"></div>
			<p class="desc">Importance of Religion</p>
		</div>
	</div>
</div>
<div class="color_legend">
	{#if displayReligion}
	<div class="legend" style="background-color: rgba(255,255,255,0.5)">
		<section>
			{#each Array(5) as _,i}
			<div class="section_div" style="background-color:{radialScale(i/4)}">{(i/4)*100}%</div>
			{/each}
		</section>
	</div>
	{/if}
</div>

{#if ufoData.length === 0}
	<div class="loadingbg"></div>
	<div class="loadingscreen">Looking for UFOs ...</div>
{/if}

<svg bind:this={bindInitZoom} {width} {height} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
	<g bind:this={bindHandleZoom}>
		{#each states as feature}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path d={path(feature)}
				on:click={() => {
					selected = feature;
					selectedAirport = null;
					}} 
				fill="{displayReligion ? colorStates(feature.properties.name) : 'rgb(54, 57, 61)'}" 
				class="state"/>
		{/each}		
		{#if selected}
			<path d={path(selected)} on:click={()=>selected = null} class="selected" />
		{/if}
		{#if displayUfos}
			{#each ufoData as ufo}
			<!-- svelte-ignore a11y-click-events-have-key-events -->	
			<circle class="ufodot"
				cx={ufo.coordinates[0]} 
				cy={ufo.coordinates[1]} 
				r={0.4} 
				on:click={() => {
					showModal = true;
					selectedUfo = ufo;
					let i = us_states_short.indexOf(ufo.State);
					selected = states.filter(o=>o.properties.name==us_states[i])[0];
					}}/>
			{/each}
		{/if}	
		<image href="{ufoSVG}" width={10} x={selectedUfo?.coordinates[0]-5} y={selectedUfo?.coordinates[1]-9}/>
		<!--<image href="{ufoSVG}" width={10} x={selectedUfo?.coordinates[0]-10} y={selectedUfo?.coordinates[1]-17}/>
		-->{#each airport_types as airport_type, i}
			{#each airportTypes[airport_type] as airport}
				{#if displayAirport[airport_type]}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<circle class="airportdot" 
				cx={airport.coordinates[0]} 
				cy={airport.coordinates[1]} 
				r={0.6} 
				on:click={() => {
					selectedAirport = airport;
					let i = us_states_short.indexOf(airport.state);
					selected = states.filter(o=>o.properties.name==us_states[i])[0];
					}}/>
				{/if}	
			{/each}
		{/each}
	</g>
</svg>
<Modal bind:showModal>
	<h2 slot="header">
		<center>{selectedUfo?.City} - {selectedUfo?.Date}</center>  
	</h2>

	<ol>
		<li><b>Shape:</b> {selectedUfo?.Shape}</li>
		<li><b>Duration of the event:</b> {selectedUfo?.Duration}</li>
		<li><b>Summary:</b> {selectedUfo?.Summary}</li>
		{#if Array.isArray(selectedUfo?.UrlImage)}
			{#each selectedUfo?.UrlImage as img}
				<img src="{img}" alt="Ufo" width="80%"/>
			{/each}
		{:else}
			<img src="{selectedUfo?.UrlImage}" alt="Ufo" width="80%"/>
		{/if}
		
	</ol>
	
	<a href="{selectedUfo?.Url}">NUFORC Report</a>
</Modal>

<style>
	:root{
		--ufo: rgb(255, 98, 0);
		--airport: rgb(58, 230, 227);
	}

	.state:hover {
		fill: rgb(86, 92, 99);
    }

	.description {
		color: gray;
		font-size: 1.5vh;
		margin-bottom: 0.1rem;
	}
	
	.selectedName {
		font-size: 2vh;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.logo {
		font-weight: bold;
		font-size: 2vh;
		text-align: center;
	}

	.legend {
		width: 80%;
		padding: 1vh;
		border-style: solid;
		border-color: rgb(231, 231, 231);
		border-radius: 1vh;
	}

	.legend .item {
		display: flex;
		align-items: center;
	}

	.airport_legend {
		background-color: var(--airport);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.religion_legend {
		width: 1vh;
		height: 1vh;
	}

	.ufo_legend {
		background-color: var(--ufo);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.airportdot {
		fill: var(--airport);
		opacity: 0.9;
	}

	.airportdot:hover {
		fill: rgb(159, 255, 253);
		opacity: 1;
	}

	.ufodot {
		fill: var(--ufo);
		opacity: 0.9;
	}

	.ufodot:hover {
		fill: rgb(255, 170, 118);
		opacity: 1;
	}

	.desc {
		margin-left: 1vw;
	}

	.item input {
		margin-right: 1vw;
	}

	svg {
		overflow: visible;
		display: inline-block;
		position: absolute;
		top: 10vh;
		left: 8vw;
	}

	.color_legend{
		margin-bottom: 1vh;
		position: absolute;
    	bottom: 0;
		right:0;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: black;
		border-radius: 1vh;
		height: 5vh;
		min-width: 20vw;
		max-width: 20vw;
		width: 20vw;
		z-index: 10;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		color: black;
		border-radius: 1vh;
		margin: 1vw;
		padding: 2vh;
		height: 90vh;
		min-width: 20vw;
		max-width: 20vw;
		width: 20vw;
		z-index: 10;
	}

    .selected {
        fill: rgb(47, 80, 150);
    }

	.loadingbg {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(46, 46, 46);
		opacity: 0.9;
		z-index: 6;
	}

	.loadingscreen {
		font-size: 6vh;
		position: absolute;
		color: white;
		left: 40%;
		top: 40%;
		z-index: 1000;
		border-radius: 1vh;
		padding: 4vh;
	}

    path {
        stroke: white;
		stroke-width: 0.5px;
    }

	section {
    box-sizing: border-box;
    height: 100%;
	width:100%;
	}
	.section_div {
		display: inline-block;
		text-align: center;
		height: 100%;
		width: 18.4%;
	}
</style>
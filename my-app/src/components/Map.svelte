<script>
// @ts-nocheck

    import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getAirportData, getUfoData } from '../routes/data.js';
	import { zoom, select } from "d3";
	import { debug } from 'svelte/internal';
  
	var airports = getAirportData();
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
	const path = geoPath().projection(null);
	var ufoData =[];
	let states = [];
	let selected;
	let selectedAirport;
	let selectedUfoSummary;
	let selectedUfoPlace;
	let selectedUfoDate;
	let selectedUfoShape;
	let selectedUfoDuration;
	let displayAirports = false;
	let displayUfos = true;

    let innerWidth = 0;
	let innerHeight = 0;
    $: width = innerWidth;
    $: height = innerHeight;
	
		
	airports.forEach(airport => {
		airport.coordinates = projection([airport.longitude_deg, airport.latitude_deg]);
	});
	
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json')
			.then(d => d.json())
		states = topojson.feature(us, us.objects.states).features;
		await getUfoData(projection).then(r=>ufoData=r);	
		
	});

	// Zoom and Pan:
	// From the tutorial: https://visualsvelte.com/d3/api/d3-zoom
	let bindHandleZoom, bindInitZoom;

	$: zoomX = zoom()
    	.scaleExtent([1, 50])
    	.translateExtent([[0, 0],[width, height]])
    	.on("zoom", handleZoom);

	function handleZoom(e) {
    	//console.log("ev", e.transform);
    	select(bindHandleZoom).attr("transform", e.transform);
  	}

	$:if (bindInitZoom) {
    	select(bindInitZoom).call(zoomX);
  	}

	let us_states =  ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	let us_states_short = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="sidebar">
	<p class="logo">Useless Fisualization Operation</p>
	<p class="description">State</p>
	<div class="selectedName">{selected?.properties.name ?? '-'}</div>
	<p class="description">UFO: Location</p>
	<div class="selectedName">{selectedUfoPlace ?? '-'}</div>
	<p class="description">UFO: Date</p>
	<div class="selectedName">{selectedUfoDate ?? '-'}</div>
	<p class="description">UFO: Shape</p>
	<div class="selectedName">{selectedUfoShape ?? '-'}</div>
	<p class="description">UFO: Duration of the Event</p>
	<div class="selectedName">{selectedUfoDuration ?? '-'}</div>
	<p class="description">UFO: Summary of the Event</p>
	<div class="selectedName">{selectedUfoSummary ?? '-'}</div>
	<p class="description">Airport</p>
	<div class="selectedName">{selectedAirport ?? '-'}</div>
	<div class="legend">
		<div class="item">
			<input type=checkbox bind:checked={displayUfos}>
			<div class="ufo_legend"></div>
			<p class="desc">UFO sighting</p>
		</div>
		<div class="item">
			<input type=checkbox bind:checked={displayAirports}>
			<div class="airport_legend"></div>
			<p class="desc">Airport</p>
		</div>
	</div>
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
				class="state"/>
		{/each}
		
		{#if selected}
			<path d={path(selected)} class="selected" />
		{/if}

		{#if displayUfos}
			{#each ufoData as ufo}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<circle class="ufodot" 
				cx={ufo.coordinates[0]} 
				cy={ufo.coordinates[1]} 
				r={0.4} 
				on:click={() => {
					selectedUfoSummary = ufo.Summary;
					selectedUfoPlace = ufo.City;
					selectedUfoDate = ufo.Date;
					selectedUfoDuration = ufo.Duration;
					selectedUfoShape = ufo.Shape;
					let i = us_states_short.indexOf(ufo.State);
					selected = states.filter(o=>o.properties.name==us_states[i])[0];
					}}/>
			{/each}
		{/if}

		{#if displayAirports}
			{#each airports as airport}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<circle class="airportdot" 
				cx={airport.coordinates[0]} 
				cy={airport.coordinates[1]} 
				r={0.6} 
				on:click={() => {
					selectedAirport = airport.name;
					let i = us_states_short.indexOf(airport.state);
					selected = states.filter(o=>o.properties.name==us_states[i])[0];
					}}/>	
			{/each}
		{/if}
		
		<!--
		{#if ufoData}
			{#each ufoData as ufo}
				{#if (ufo.Longitude != "" && ufo.Latitude != "" && ufo.Longitude != "0" && ufo.Latitude != "0" && ufo.coordinates[0] != 0 && ufo.coordinates[1] != 0)}
					<circle class="ufodot" cx={ufo.coordinates[0]} cy={ufo.coordinates[1]} r={1} on:click={() => selectedUfoSummary = ufo.Summary}/>
				{/if}
			{/each}
		{/if}
		-->
    
	</g>
</svg>
	
<style>
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
		margin-top: 8vh;
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
		background-color: rgb(58, 230, 227);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.ufo_legend {
		background-color: rgb(255, 98, 0);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.airportdot {
		fill: rgb(58, 230, 227);
		opacity: 0.9;
	}

	.airportdot:hover {
		fill: rgb(159, 255, 253);
		opacity: 1;
	}

	.ufodot {
		fill: rgb(255, 98, 0);
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
        fill: rgb(54, 57, 61);
    }
</style>
<script>
// @ts-nocheck

    import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getAirportData } from '../routes/data.js';
	import { zoom, select } from "d3";

	var airports = getAirportData();
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
	const path = geoPath().projection(null);
	
	let states = [];
	let selected;
	let selectedAirport;
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
	})
	
	// Zoom and Pan - Jonathan:
	// From the tutorial: https://visualsvelte.com/d3/api/d3-zoom
	let bindHandleZoom, bindInitZoom;

	$: zoomX = zoom()
    	.scaleExtent([1, 50])
    	.translateExtent([[0, 0],[width, height]])
    	.on("zoom", handleZoom);

	function handleZoom(e) {
    	console.log("ev", e.transform);
    	select(bindHandleZoom).attr("transform", e.transform);
  	}

	$:if (bindInitZoom) {
    	select(bindInitZoom).call(zoomX);
  	}
</script>
<svelte:window bind:innerWidth bind:innerHeight />
<div class="sidebar">
	<p class="logo">Useless Fisualization Operation</p>
	<p class="description">State</p>
	<div class="selectedName">{selected?.properties.name ?? '-'}</div>
	<p class="description">Airport</p>
	<div class="selectedName">{selectedAirport ?? '-'}</div>
	<p> Inner Width: {innerWidth} </p>
	<p> Inner Height: {innerHeight} </p>
</div>
<svg bind:this={bindInitZoom} {width} {height}>
	<g bind:this={bindHandleZoom}>
		{#each states as feature}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path d={path(feature)} on:click={() => selected = feature} class="state"/>
		{/each}
		
		{#if selected}
		<path d={path(selected)} class="selected" />
		{/if}

		{#each airports as airport}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<circle cx={airport.coordinates[0]} cy={airport.coordinates[1]} r={1} fill="orange" on:click={() => selectedAirport = airport.name}/>
		{/each}
	</g>
</svg>
	
<style>
	:global(body) { /* this will apply to <body> */ margin: 0; padding: 0; }
	.state:hover {
		fill: rgb(86, 92, 99);
    }

	.description {
		color: gray;
		margin-bottom: 0.1rem;
	}
	
	.selectedName {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.logo {
		color: orange;
		font-weight: bold;
		font-size: 130%;
	}

	svg {
		padding: 0; 
   		margin: 0;
		position: relative;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 20%;
		background-color: white;
		color: black;
		height: 100vh;
		font-size: 1.5em;
		/*
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 20%;
		background-color: white;
		color: black;
		border-radius: 1rem;
		height: 90vh;
		margin: 1rem;
		padding: 1rem;
		z-index:10;
		position: absolute;
		*/
	}

    .selected {
        fill: rgb(40, 98, 224);
    }

    path {
        stroke: white;
		stroke-width: 0.5px;
        fill: rgb(54, 57, 61);
    }
</style>
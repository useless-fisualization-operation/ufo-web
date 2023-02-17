<script>
// @ts-nocheck

    import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getAirportData } from '../routes/data.js';

	var airports = getAirportData();
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
	const path = geoPath().projection(null);
	
	let states = [];
	let selected;
	let selectedAirport;
    
    let width = 975;
    let height = 610;

	airports.forEach(airport => {
		airport.coordinates = projection([airport.longitude_deg, airport.latitude_deg]);
	});

	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json')
			.then(d => d.json())
		states = topojson.feature(us, us.objects.states).features;
	})
</script>

<div class="sidebar">
	<p class="logo">Useless Fisualization Operation</p>
	<p class="description">State</p>
	<div class="selectedName">{selected?.properties.name ?? '-'}</div>
	<p class="description">Airport</p>
	<div class="selectedName">{selectedAirport ?? '-'}</div>
</div>

<svg {width} {height}>
	<g>
		{#each states as feature}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path d={path(feature)} on:click={() => selected = feature} class="state"/>
		{/each}
	</g>

	{#if selected}
		<path d={path(selected)} class="selected" />
	{/if}
	
	{#each airports as airport}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<circle cx={airport.coordinates[0]} cy={airport.coordinates[1]} r={1.5} fill="orange" on:click={() => selectedAirport = airport.name}/>
	{/each}
</svg>
	
<style>
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
		margin: auto;
	}

	.sidebar {
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
<script>
    import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';

	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	const path = geoPath().projection(null);
	
	let states = [];
	let selected;
    
    let width = 975;
    let height = 610;

	const points = [
		{ lat: 38.91102, long: -77.03339 },
		{ lat: 36.14674, long: -115.14811 },
	].map(p => projection([p.long, p.lat]))
	
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json')
			.then(d => d.json())
		states = topojson.feature(us, us.objects.states).features;
	})
</script>

<svg {width} {height}>
	<g>
		{#each states as feature, i}
			<path d={path(feature)} on:click={() => selected = feature} class="state"/>
		{/each}
	</g>

	{#if selected}
		<path d={path(selected)} class="selected" />
	{/if}
	
	{#each points as [cx, cy]}
		<circle {cx} {cy} r={4} fill="orange" />
	{/each}
</svg>

<div class="selectedName">{selected?.properties.name ?? ''}</div>
	
<style>
	.state:hover {
		fill: rgb(86, 92, 99);
    }
	
	.selectedName {
		text-align: center;
		margin-top: 8px;
		font-size: 1.5rem;
        font-family: Helvetica;
        color: white;
	}

    .selected {
        fill: rgb(78, 128, 185);
    }

    path {
        stroke: white;
		stroke-width: 0.5px;
        fill: rgb(54, 57, 61);
    }
</style>
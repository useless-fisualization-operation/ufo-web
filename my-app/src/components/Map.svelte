<script lang="ts">
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getUfoData, type Ufo } from './ufo_data';
	import { getAirportData, AirportTypes, type Airport, type AirportType } from './airport_data';
	import { zoom, select } from 'd3';
	import type { SharedState } from './shared';
	import {
		getReligionData,
		getStateColor,
		religionDataToStateData,
		type ReligionData
	} from './state_data';
	import { States, type State } from './states';

	export let shared_state: SharedState;

	const projection: d3.GeoProjection = geoAlbersUsa().scale(1300).translate([487.5, 305]);

	const path = geoPath().projection(null);

	// ----------- Data: -----------
	var airports = getAirportData(projection);
	var religion: ReligionData[] = getReligionData();
	var state_data = religionDataToStateData(religion);

	var ufoData: Ufo[] = [];
	let states: any[] = [];
	onMount(async () => {
		const us = await fetch(
			'https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json'
		).then((d) => d.json());

		// @ts-ignore
		states = topojson.feature(us, us.objects.states).features;
		ufoData = await getUfoData(projection);
	});

	const airports_by_type: { [key: string]: Airport[] } = {
		large_airport: airports.filter((o) => o.type == AirportTypes.large_airport),
		medium_airport: airports.filter((o) => o.type == AirportTypes.medium_airport),
		small_airport: airports.filter((o) => o.type == AirportTypes.small_airport),
		heliport: airports.filter((o) => o.type == AirportTypes.heliport),
		seaplane_base: airports.filter((o) => o.type == AirportTypes.seaplane_base),
		balloonport: airports.filter((o) => o.type == AirportTypes.balloonport),
		closed: airports.filter((o) => o.type == AirportTypes.closed)
	};

	// TODO: Move
	// [key: string]: boolean
	type DisplayOptions = { [key: string]: boolean };

	const displayOptions: DisplayOptions = {
		large_airport: false,
		medium_airport: false,
		small_airport: false,
		heliport: false,
		seaplane_base: false,
		balloonport: false,
		closed: false
	};

	function isAirportTypeDisplayed(airport_type: AirportType) {
		return displayOptions[AirportTypes[airport_type]];
	}

	// ----------- Sidebar Info: -----------
	let selected: any; // TODO
	let selectedUfo: any; // TODO
	let selectedAirport: any; // TODO

	// -----------  Legend checkmarks: -----------
	let displayUfos = false;
	let displayReligion = true;
	//let state_data: StateData[] = religionDataToStateData(religion);

	// ----------- Zoom and Pan: -----------
	let bindHandleZoom: any, bindInitZoom: any; // TODO: Fix?
	let innerWidth = 0;
	let innerHeight = 0;
	$: width = innerWidth;
	$: height = innerHeight;
	$: zoomX = zoom()
		.scaleExtent([1, 50])
		.translateExtent([
			[0, 0],
			[width, height]
		])
		.on('zoom', handleZoom);
	function handleZoom(e: any) {
		select(bindHandleZoom).attr('transform', e.transform);
	}
	$: if (bindInitZoom) {
		select(bindInitZoom).call(zoomX);
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if ufoData.length === 0}
	<div class="loadingbg" />
	<div class="loadingscreen">Looking for UFOs ...</div>
{/if}

<svg
	bind:this={bindInitZoom}
	{width}
	{height}
	viewBox="0 0 800 800"
	preserveAspectRatio="xMidYMid meet"
>
	<g bind:this={bindHandleZoom}>
		{#each states as state}
			{@const state_short = States[state.properties.name].short}

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path
				d={path(state)}
				on:click={() => {
					selected = state;
					selectedAirport = null;
				}}
				fill={getStateColor(state_data[state_short])}
				class="state"
			/>
		{/each}
		{#if selected}
			<path d={path(selected)} on:click={() => (selected = null)} class="selected" />
		{/if}
		{#if shared_state.display_options.display_ufos}
			{#each ufoData as ufo}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<circle
					class="ufodot"
					cx={ufo.projection[0]}
					cy={ufo.projection[1]}
					r={0.4}
					on:click={() => {
						// selectedUfo = ufo;
						// let i = us_states_short.indexOf(ufo.state);
						// Selected = states.filter((o) => o.properties.name == us_states[i])[0];
					}}
				/>
			{/each}
		{/if}
		{#each Object.keys(AirportTypes) as airport_type}
			{#each airports_by_type[airport_type] as airport}
				{#if displayOptions[airport_type]}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<circle
						class="airportdot"
						cx={airport.projection[0]}
						cy={airport.projection[1]}
						r={0.6}
						on:click={() => {
							// selectedAirport = airport.name;
							// let i = us_states_short.indexOf(airport.state);
							// selected = states.filter((o) => o.properties.name == us_states[i])[0];
						}}
					/>
				{/if}
			{/each}
		{/each}
	</g>
</svg>

<style lang="scss">
	:root {
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

	// map
	svg {
		overflow: visible;
		display: inline-block;
		position: absolute;
		top: 10vh;
		left: 8vw;
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
</style>

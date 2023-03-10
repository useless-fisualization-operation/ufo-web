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
	import { states } from './states';
	import { shared } from './shared';
	import LoadingScreen from './LoadingScreen.svelte';

	let shared_state: SharedState | null = null;
	shared.subscribe((v) => {
		shared_state = v;
	});

	const projection: d3.GeoProjection = geoAlbersUsa().scale(1300).translate([487.5, 305]);

	const path = geoPath().projection(null);

	// ----------- Data: -----------
	var airports = getAirportData(projection);
	var religion: ReligionData[] = getReligionData();
	var state_data = religionDataToStateData(religion);

	var ufoData: Ufo[] = [];
	let map_states: any[] = [];
	onMount(async () => {
		const us = await fetch(
			'https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json'
		).then((d) => d.json());

		// @ts-ignore
		map_states = topojson.feature(us, us.objects.states).features;
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

	function isAirportTypeDisplayed(airport_type: string) {
		return shared_state?.display_options[airport_type];
	}

	// ----------- Sidebar Info: -----------
	let selected_map_state: any; // TODO
	let selectedAirport: any; // TODO

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

<LoadingScreen display={ufoData.length === 0} />

<svg
	bind:this={bindInitZoom}
	{width}
	{height}
	viewBox="0 0 800 800"
	preserveAspectRatio="xMidYMid meet"
>
	<g bind:this={bindHandleZoom}>
		{#each map_states as map_state}
			{@const state_short = states[map_state.properties.name].short}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path
				d={path(map_state)}
				on:click={() => {
					selected_map_state = map_state;
					// write to the store
					shared.update((v) => {
						v.selected_type = 'state';
						v.selected = states[map_state.properties.name].name;
						return v;
					});
				}}
				fill={getStateColor(state_data[state_short])}
				class="state"
			/>
		{/each}
		{#if shared_state?.display_options.ufos}
			{#each ufoData as ufo}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<circle
					class="ufodot"
					cx={ufo.projection[0]}
					cy={ufo.projection[1]}
					r={0.4}
					on:click={() => {
						shared.update((v) => {
							v.selected_type = 'ufo';
							v.selected = ufo;
							return v;
						});

						selected_map_state = null;
					}}
				/>
			{/each}
		{/if}
		{#each Object.keys(AirportTypes) as airport_type}
			{#if isAirportTypeDisplayed(airport_type)}
				{#each airports_by_type[airport_type] as airport}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<circle
						class="airportdot"
						cx={airport.projection[0]}
						cy={airport.projection[1]}
						r={0.6}
						on:click={() => {
							selectedAirport = airport;
							shared.update((v) => {
								v.selected_type = 'airport';
								v.selected = airport;
								return v;
							});
							selected_map_state = null;
						}}
					/>
				{/each}
			{/if}
			{#if selected_map_state}
				<path
					d={path(selected_map_state)}
					on:click={() => (selected_map_state = null)}
					class="selected"
				/>
			{/if}
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

	path {
		stroke: white;

		stroke-width: 0.5px;
	}
</style>

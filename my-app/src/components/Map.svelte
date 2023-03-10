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
	import UfoSvg from './UfoSvg.svelte' // The svelte svg

	let clazz = '';
	export { clazz as class };

	// ----------- Shared State: -----------
	let shared_state: SharedState | null = null;
	shared.subscribe((v) => {
		shared_state = v;
	});

	// ----------- Map: -----------
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
		if (!shared_state) {
			throw new Error('Shared state is null');
		}
		ufoData = await getUfoData(projection, shared_state.start_date, shared_state.end_date);
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

	// ----------- Sidebar Info: -----------
	let selected_map_state: any; // TODO

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

<div class="loading-screen">
	<LoadingScreen display={ufoData.length === 0} />
</div>

<div class={clazz}>
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
			{#if selected_map_state}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<path
					d={path(selected_map_state)}
					on:click={() => (selected_map_state = null)}
					class="selected"
				/>
			{/if}
			{#if shared_state?.display_options.ufo}
				{#each ufoData as ufo}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<circle
						class="ufodot"
						cx={ufo.projection[0]}
						cy={ufo.projection[1]}
						r={0.4}
						on:click={() => {
							if(shared_state.selected_type=='ufo'){
								console.log("Hello this works just fine")
								console.log(shared_state.selected)
							}
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
				{#if shared_state?.display_options[airport_type]}
					{#each airports_by_type[airport_type] as airport}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<circle
							class="airportdot"
							cx={airport.projection[0]}
							cy={airport.projection[1]}
							r={0.6}
							on:click={() => {
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
			{/each}
			<!------------------  DISPLAY SELECTED UFO ---------------- -->
			{#if shared_state?.selected_type=='ufo'}
				<UfoSvg x_pos={shared_state.selected.projection[0]} y_pos={shared_state.selected.projection[1]}/>	
				<circle cx={shared_state.selected.projection[0]} cy={shared_state.selected.projection[1]} r={0.4} fill="white"/>
			{/if}
		</g>
	</svg>
</div>

<style lang="scss">
	:root {
		--ufo: rgb(255, 98, 0);
		--airport: rgb(58, 230, 227);
		--state-fill: rgb(117, 143, 169);
	}

	.loading-screen {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
	}
	.state:hover {
		fill: var(--state-fill);
	}

	.airportdot {
		fill: var(--airport);
		opacity: 0.9;
	}

	.ufodot {
		fill: var(--ufo);
	}

	svg {
		overflow: hidden;
		display: inline-block;
		position: absolute;
		top: 0vh;
		left: 0vw;
	}

	.selected {
		fill: var(--state-fill);
	}

	path {
		stroke: white;
		stroke-width: 0.1px;
	}
</style>

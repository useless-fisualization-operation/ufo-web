<script lang="ts">
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getUfoData, type Ufo } from './ufo_data';
	import { getUfoShapes, type Shape } from './ufo_shapes';
	import { getUfoData2, type Ufos, type Ufo2 } from './ufo_data2';
	import { getUfoLocations, type UfoLocation } from './ufo_locations';
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
	import UfoSvg from './UfoSvg.svelte'; // The svelte svg
	import { getCityData, type City } from './city_data';

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
	var ufoData: Ufo[] = []; // not currently used
	var ufoData2: Ufo2[] = []; // used instead of ufoData
	var ufoShapes: Shape[] = [];
	var ufoLocations: UfoLocation[] = [];
	var cities: City[] = [];
	let map_states: any[] = [];

	onMount(async () => {
		// Fetch states:
		const us = await fetch(
			'https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json'
		).then((d) => d.json());
		// @ts-ignore
		map_states = topojson.feature(us, us.objects.states).features;
		if (!shared_state) throw new Error('Shared state is null');

		ufoLocations = await getUfoLocations(projection, false); // Fetch ufo locations
		ufoData = await getUfoData(projection, false); // Fetch ufo entire data -- NOT USED
		ufoData2 = await getUfoData2(true); // Fetch ufo data
		ufoShapes = await getUfoShapes(false); // Fetch ufo shapes
		cities = await getCityData(projection, false); // Fetch cities
		$shared.shapes = ufoShapes;
	});

	function changeDateType(date: string) {
		return (
			date[6] +
			date[7] +
			date[8] +
			date[9] +
			date[7] +
			'-' +
			date[0] +
			date[1] +
			'-' +
			date[3] +
			date[4]
		);
	}
	// Contains the filtered UFO data: Based on Date, Images, Hoax and Shape
	$: filteredUfoData = ufoData2.filter((o) => {
		if (o == ufoData2[ufoData2.length - 1]) console.log('I have filtered the data');
		let option = shared_state?.display_options;
		if (o.date >= shared_state?.start_date && o.date <= shared_state?.end_date) {
			if (
				(option?.ufo_images && o.images == 'Yes') ||
				(option?.ufo_no_images && o.images != 'Yes')
			) {
				if ((option?.ufo_hoax && o.hoax == 'Yes') || (option?.ufo_non_hoax && o.hoax != 'Yes')) {
					if (
						(option?.ufo_madar && o.madar == 'Yes') ||
						(option?.ufo_non_madar && o.madar != 'Yes')
					) {
						if (shared_state?.shapes_options[ufoShapes[o.id_ref_shape]?.type]) {
							return o;
						}
					}
				}
			}
		}
	});
	// Contains the unique locations of the filtered UFO data (Lambda function):
	$: filteredUfoLocations = () => {
		let visited: number[] = [];
		let locations: UfoLocation[] = [];
		filteredUfoData.forEach((o) => {
			if (!visited.includes(o.id_ref_loc)) {
				visited.push(o.id_ref_loc);
				locations.push(ufoLocations[o.id_ref_loc]);
			}
		});
		return locations;
	};

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
	$: if (bindInitZoom) select(bindInitZoom).call(zoomX);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="loading-screen">
	<LoadingScreen display={filteredUfoLocations().length === 0} />
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
						//console.log("States:"+states[map_state.properties.name].short);
						shared.update((v) => {
							v.n_ufos_on_state.loc = filteredUfoLocations().filter(
								(o) => o.state == states[map_state.properties.name].short
							).length;
							v.n_ufos_on_state.data = filteredUfoData.filter(
								(o) => ufoLocations[o.id_ref_loc].state == states[map_state.properties.name].short
							).length;
							v.selected_type = 'state';
							v.selected = states[map_state.properties.name].name;
							v.selected_state_population =
								state_data[states[map_state.properties.name].short].value;
							v.selected_state_religion = state_data[states[map_state.properties.name].short].value;
							return v;
						});
					}}
					fill={shared_state?.display_options.religion
						? getStateColor(state_data[state_short])
						: 'rgb(54, 57, 61)'}
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
			<!------------------  DISPLAY THE NAME OF THE CITIES  ---------------- -->
			{#if shared_state?.display_options.cities}
				{#each cities as city}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<circle
						class="citydot"
						cx={city.projection[0]}
						cy={city.projection[1]}
						r={4}
						on:click={() => {
							shared.update((v) => {
								v.selected_type = 'city';
								v.selected = {
									name: city.name,
									state: city.state,
									projection: city.projection
								};
								return v;
							});
							selected_map_state = null;
						}}
					/>
				{/each}
			{/if}
			<!------------------  DISPLAY AIRPORTS  ---------------- -->
			{#if shared_state?.display_options.airport}
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
			{/if}
			<!------------------  DISPLAY UFOS  ---------------- -->
			{#if shared_state?.display_options.ufo}
				{#each filteredUfoLocations() as ufo}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<circle
						class="ufodot"
						cx={ufo.projection[0]}
						cy={ufo.projection[1]}
						r={0.4}
						on:click={() => {
							let ufo_on_location = filteredUfoData.filter((o) => o.id_ref_loc == ufo.id);
							console.log(ufo_on_location);
							if (ufo_on_location.length > 0) {
								shared.update((v) => {
									v.selected_type = 'ufos';
									v.selected = {
										ufos: ufo_on_location,
										location: ufo.city,
										state: ufo.state,
										projection: ufo.projection,
										tot: ufo_on_location.length
									};
									return v;
								});
							} else {
								console.log('ERROR from split file!');
							}
							selected_map_state = null;
						}}
					/>
				{/each}
			{/if}

			<!------------------  DISPLAY SELECTED UFO ---------------- -->
			{#if shared_state?.selected_type == 'ufos'}
				<UfoSvg
					x_pos={shared_state?.selected?.projection[0]}
					y_pos={shared_state?.selected?.projection[1]}
				/>
				<circle
					cx={shared_state?.selected?.projection[0]}
					cy={shared_state?.selected?.projection[1]}
					r={0.4}
					fill="white"
				/>
			{/if}
		</g>
	</svg>
</div>

<style lang="scss">
	:root {
		--ufo: #a459ac;
		--airport: rgb(58, 230, 227);
		--state-fill: rgb(178, 171, 199);
		--city: rgb(255, 230, 132);
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
	}

	.ufodot {
		fill: var(--ufo);
	}

	.citydot {
		fill: var(--city);
	}

	.airportdot:hover,
	.ufodot:hover,
	.citydot:hover {
		filter: brightness(150%);
	}

	svg {
		overflow: visible;
		display: inline-block;
		position: absolute;
		width: 90%;
		top: 7.5em;
		left: -3em;
	}

	.selected {
		fill: var(--state-fill);
	}

	path {
		stroke: white;
		stroke-width: 0.5px;
	}
</style>

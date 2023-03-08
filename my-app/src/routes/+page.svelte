<script lang="ts">
	import Map from '../components/Map.svelte';
	import Header from '../components/Header.svelte';
	import Details from '../components/Details.svelte';
	import DisplayOptions from '../components/DisplayOptions.svelte';
	import TimeSlider from '../components/TimeSlider.svelte';
	import Footer from '../components/Footer.svelte';
	import type { SharedState } from '../components/shared';

	const shared_state: SharedState = {
		display_options: {
			display_large_airports: false,
			display_medium_airports: false,
			display_small_airports: false,
			display_heliports: false,
			display_seaplane_bases: false,
			display_balloonports: false,
			display_closed_airports: false,
			display_ufos: true,
			display_religion: true
		},
		selected: null,
		selected_type: 'none'
	};
</script>

<div>
	<Header {shared_state} />
</div>

<main>
	<Map {shared_state} />
	<Details {shared_state} />
	<DisplayOptions {shared_state} />
	<TimeSlider {shared_state} />
	<Footer {shared_state} />
</main>

<style lang="scss">
	main {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	:global(body, html) {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		background-color: rgb(124, 128, 132);
		font-size: 1.2vh;
		font-family: Helvetica, sans-serif;
		color: rgb(30, 30, 30);
		overflow: hidden;
	}
</style>

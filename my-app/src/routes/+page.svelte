<script lang="ts">
	import Map from '../components/Map.svelte';
	import Header from '../components/Header.svelte';
	import Details from '../components/Details.svelte';
	import DisplayOptions from '../components/DisplayOptions.svelte';
	import TimeSlider from '../components/TimeSlider.svelte';
	import Footer from '../components/Footer.svelte';
	import type { SharedState } from '../components/shared';
	import Legend from '../components/Legend.svelte';

	const shared_state: SharedState = {
		display_options: {
			large_airports: false,
			medium_airports: false,
			small_airports: false,
			heliports: false,
			seaplane_bases: false,
			balloonports: false,
			closed_airports: false,
			ufos: false,
			religion: true
		},
		selected: null,
		selected_type: 'none'
	};
</script>

<main>
	<Header {shared_state} />
	<Map {shared_state} />
	<Details {shared_state} />
	<DisplayOptions {shared_state} />
	<TimeSlider {shared_state} />
	<Footer {shared_state} />
	<Legend {shared_state} />
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

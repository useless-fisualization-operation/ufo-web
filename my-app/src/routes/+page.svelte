<script lang="ts">
	import Map from '../components/Map.svelte';
	import Header from '../components/Header.svelte';
	import Details from '../components/Details.svelte';
	import DisplayOptions from '../components/DisplayOptions.svelte';
	import TimeSlider from '../components/TimeSlider.svelte';
	import Footer from '../components/Footer.svelte';
	import type { SharedState } from '../components/shared';
	import Legend from '../components/Legend.svelte';
</script>

<main>
	<Header class="header" />
	<Map class="map" />
	<Details class="details" />
	<DisplayOptions class="display_options" />
	<TimeSlider class="time_slider" />
	<Footer class="footer" />
	<Legend class="legend" />
</main>

<style lang="scss">
	main {
		display: grid;

		align-items: center;
		height: 100%;
		width: 100%;
		grid-template-areas:
			'header header header header header'
			'details display_options map time_slider legend'
			'footer footer footer footer footer';
	}

	:global(.header) {
		grid-area: header;
		height: 20px;
		background-color: red;
	}

	:global(.map) {
		grid-area: map;
	}

	:global(.details) {
		grid-area: details;
	}

	:global(.display_options) {
		grid-area: display_options;
	}

	:global(.time_slider) {
		grid-area: time_slider;
	}

	:global(.footer) {
		grid-area: footer;
		height: 20px;
		background-color: blue;
	}

	:global(.legend) {
		grid-area: legend;
	}

	:global(body, html) {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		font-size: 1.2vh;
		font-family: 'Roboto', sans-serif;
		overflow: hidden;
	}
</style>

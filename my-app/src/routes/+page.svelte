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
	<div class="header">
		<Header />
	</div>
	<div class="details">
		<Details />
	</div>
	<div class="display_options">
		<DisplayOptions />
	</div>
	<div class="time_slider">
		<TimeSlider />
	</div>
	<div class="footer">
		<Footer />
	</div>
	<div class="legend">
		<Legend />
	</div>
	<div class="map">
		<Map />
	</div>
</main>

<style lang="scss">
	main {
		height: 100vh;
		width: 100vw;
		display: grid;

		align-items: center;
		grid-template-areas:
			'header  			header 		header 		header'
			'details 			map 		map 		time_slider'
			'display_options 	map 		map 		legend'
			'footer 			footer 		footer 		footer';

		grid-template-rows: 20px 2fr 1fr 20px;
		grid-template-columns: 1fr 2fr 2fr 1fr;

		& > div {
			z-index: 10;
		}
	}

	.header {
		grid-area: header;
		height: 20px;
	}

	.map {
		z-index: 1;
		grid-area: map;
	}

	.details {
		padding: 20px;
		grid-area: details;
	}

	.display_options {
		padding: 20px;
		grid-area: display_options;
	}

	.time_slider {
		padding: 20px;
		grid-area: time_slider;
	}

	.footer {
		grid-area: footer;
		height: 20px;
	}

	.legend {
		padding: 20px;
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

	:global(:root) {
		--surface-0: #f7fcf5;
		--surface-1: #e5f5e0;
		--accent: #00441b;
	}
</style>

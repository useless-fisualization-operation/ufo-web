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
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

	main {
		height: 100vh;
		width: 100vw;
		display: grid;
		background-color: var(--surface-0);

		grid-template-areas:
			'header  			header 			header 			header'
			'details 			map 			map 			display_options'
			'details            map				map 			display_options'
			'details          	time_slider		time_slider		legend'
			'footer 			footer 			footer 			footer';

		grid-template-rows: 20px 20% 40% auto 20px;
		grid-template-columns: 1fr 2fr 2fr 1fr;
		align-items: center;

		& > div {
			z-index: 10;
		}

		font-family: 'Open Sans', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Sans Unicode', sans-serif;
		font-size: 1.4vh;
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
		align-self: flex-start;
	}

	.display_options {
		padding: 20px;
		grid-area: display_options;
		align-self: flex-start;
	}

	.time_slider {
		padding: 20px;
		grid-area: time_slider;
		justify-self: center;
		align-self: flex-end;
	}

	.footer {
		height: 20px;
		grid-area: footer;
	}

	.legend {
		padding: 20px;
		grid-area: legend;
		align-self: flex-end;
	}

	:global(html) {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	:global(.card) {
		background-color: var(--surface-1);
		padding: 7%;
		border-radius: 0.5em;
	}

	:global(:root) {
		--surface-0: #ffffff;
		--surface-1: #e1f4dc;
		--accent: #00441b;
		--button-0: #6f8968;
		--button-0-hover: #566a50;
	}
</style>

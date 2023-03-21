<script lang="ts">
	import * as d3 from 'd3';
	import type { SharedState } from './shared';
	import type { State } from './states';
	import { shared } from './shared';

	let clazz = '';
	export { clazz as class };

	// @ts-ignore
	let radialScale = d3.scaleLinear().domain([0, 1]).range(['#aaaaaa', '#222222']); // FIX: not sure this is working

	// interpolate the colors at 44%
	let color_at_50 = d3.interpolateRgb('#aaaaaa', '#222222')(0.5);
	let color_at_0 = d3.interpolateRgb('#aaaaaa', '#222222')(0);
	let color_at_100 = d3.interpolateRgb('#aaaaaa', '#222222')(0.44);

	let shared_state: SharedState | null = null;
	shared.subscribe((v) => {
		shared_state = v;
	});
</script>

<div class="{clazz} legend card">
	{#if shared_state?.display_options.population}
		<div style="background-color:{radialScale(0)}">Min: 0.6 people/mi<sub>2</sub></div>
		<div style="background-color:{radialScale(1)}; color:#adf0dd">
			Max: 833 people/mi<sub>2</sub>
		</div>
	{/if}
	{#if shared_state?.display_options.religion}
		<div style="background-color:{radialScale(0)}">Min: 9.03%</div>
		<div style="background-color:{radialScale(0.5)}; color:#ffffff">16.98%</div>
		<div style="background-color:{radialScale(1)}; color:#ffffff">Max: 24.93%</div>
	{/if}
	{#if shared_state?.display_options.drugs}
		<div style="background-color:{radialScale(0)}">Min: 32%</div>
		<div style="background-color:{radialScale(0.5)}; color:#ffffff">54.5%</div>
		<div style="background-color:{radialScale(1)}; color:#ffffff">Max: 77%</div>
	{/if}
	{#if shared_state?.display_options.marijuana}
		<div style="background-color:{radialScale(0)}">Min: 7.77%</div>
		<div style="background-color:{radialScale(0.5)}; color:#ffffff">15.52%</div>
		<div style="background-color:{radialScale(1)}; color:#ffffff">Max: 23.27%</div>
	{/if}
</div>

<style lang="scss">
	.legend {
		display: flex;
		box-shadow: 0 0 0.5em 0.1em rgba(0, 0, 0, 0.1);

		padding: 1px;

		& > div {
			font-size: 0.8em;
			width: 50%;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>

<script lang="ts">
	import * as d3 from 'd3';
	import type { SharedState } from './shared';
	import type { State } from './states';
	import { getStateColor } from './state_data';
	import { shared } from './shared';

	let clazz = '';
	export { clazz as class };

	// @ts-ignore
	let radialScale = d3.scaleLinear().domain([0, 1]).range(['#f7fcf5', '#00441b']); // FIX: not sure this is working

	let shared_state: SharedState | null = null;
	shared.subscribe((v) => {
		shared_state = v;
	});
</script>

<div class="{clazz} legend card">
	{#if shared_state?.display_options.religion}
	{#each Array(5) as _, i}
		<div style="background-color:{radialScale(i / 4)}">{(i / 4) * 100}%</div>
	{/each}
	{/if}
</div>

<style lang="scss">
	.legend {
		display: flex;

		& > div {
			font-size: 0.8em;
			width: 20%;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>

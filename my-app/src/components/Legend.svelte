<script lang="ts">
	import * as d3 from 'd3';
	import type { SharedState } from './shared';
	import type { State } from './states';
	import { getStateColor } from './state_data';

	export let shared_state: SharedState;

	let selected = shared_state.selected;

	// @ts-ignore
	let radialScale = d3.scaleLinear().domain([0, 1]).range(['#f7fcf5', '#00441b']); // FIX: not sure this is working
</script>

<div class="legend">
	{#if shared_state.display_options.religion}
		{#each Array(5) as _, i}
			<div style="background-color:{radialScale(i / 4)}">{(i / 4) * 100}%</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.legend {
		z-index: 1;
	}
</style>

<script lang="ts">
	import type { SharedState } from './shared';
	import { shared } from './shared';

	let clazz = '';
	export { clazz as class };

	$: start = null;
	$: end = null;

	function update_data() {
		shared.update((v) => {
			v.start_date = start;
			v.end_date = end;
			return v;
		});
	}
</script>

<div class="{clazz} card timeslider">
	<center><h4>Date &#128467</h4></center>
	<input type="date" bind:value={start} on:change={update_data} />
	<input type="date" bind:value={end} on:change={update_data} />
</div>

<style lang="scss">
	.timeslider {
		display: flex;
		flex-direction: column;
	}

	h4 {
		font-weight: bold;
		font-size: 120%;
	}

	input[type=date] {
		border: none;
		margin: 0.5em;
		padding: 0.5em;
		border-radius: 0.5em;
		font-family: inherit;
	}
</style>

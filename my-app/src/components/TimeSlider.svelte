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

<div class="{clazz} time card">
	{#if start == null && end == null}
		<center><p>&#128161 Select a date range to filter the data</p></center>
	{/if}
	<div class="dates">
		<input type="date" bind:value={start} on:change={update_data} />
		<input type="date" bind:value={end} on:change={update_data} />
	</div>
</div>

<style lang="scss">
	.time {
		display: flex;
		flex-direction: column;
		background-color: var(--surface-1);
		border-radius: 0.5em;
		padding: 0.4em;
	}

	.dates {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	h4 {
		font-weight: bold;
		font-size: 120%;
	}

	input[type='date'] {
		border: none;
		margin: 0.5em;
		padding: 0.5em;
		border-radius: 0.5em;
		font-family: inherit;
	}
</style>

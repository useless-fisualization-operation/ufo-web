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

<div class={clazz}>
	<input type="date" bind:value={start} on:change={update_data} />
	<input type="date" bind:value={end} on:change={update_data} />
</div>

<style lang="scss">
</style>

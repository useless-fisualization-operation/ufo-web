<script lang="ts">
	import { AirportTypes } from './airport_data';
	import type { SharedState } from './shared';

	export let shared_state: SharedState;

	const display_options = Object.entries(shared_state.display_options);
</script>

<div>
	{#each display_options as [key, value]}
		<input type="checkbox" bind:checked={value} />
	{/each}
</div>

<style lang="scss">
</style>

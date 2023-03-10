<script lang="ts">
	import type { Airport } from './airport_data';
	import type { SharedState } from './shared';
	import type { State } from './states';
	import type { Ufo } from './ufo_data';

	import { shared } from './shared';

	let clazz = '';
	export { clazz as class };

	let shared_state: SharedState | null;
	let selected_type: 'state' | 'airport' | 'ufo' | 'none';
	let selected_state: State | null;
	let selected_airport: Airport | null;
	let selected_ufo: Ufo | null;

	shared.subscribe((v) => {
		shared_state = v;
		selected_type = v.selected_type;
		selected_state = v.selected_type == 'state' ? (v.selected as State) : null;
		selected_airport = v.selected_type == 'airport' ? (v.selected as Airport) : null;
		selected_ufo = v.selected_type == 'ufo' ? (v.selected as Ufo) : null;
	});
</script>

<div class="{clazz} details">
	{#if selected_type == 'none'}
		<p class="description">Click on a state, airport, or UFO to see more information.</p>
	{:else if selected_type == 'state'}
		<p class="description">State: {selected_state}</p>
		<p class="description">Population: TODO</p>
		<p class="description">Religion: TODO</p>
	{:else if selected_type == 'ufo'}
		<p class="description">UFO: Location: {selected_ufo?.city}, {selected_ufo?.state}</p>
		<p class="description">UFO: Date: {selected_ufo?.date}</p>
		<p class="description">UFO: Shape: {selected_ufo?.shape}</p>
		<p class="description">UFO: Duration of the Event: {selected_ufo?.duration}</p>
		<p class="description">UFO: Summary of the Event: {selected_ufo?.summary}</p>
	{:else if selected_type == 'airport'}
		<p class="description">Airport: {selected_airport?.name}</p>
	{/if}
</div>

<style lang="scss">
	.details {
		z-index: 1;
	}
</style>

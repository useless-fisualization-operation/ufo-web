<script lang="ts">
	import type { SharedState } from './shared';

	export let shared_state: SharedState;

	const display_options = Object.entries(shared_state.display_options);
</script>

<div class="display_options">
	<input type="checkbox" bind:checked={shared_state.display_options.display_large_airports} />
	<label for="display_large_airports">Large Airports</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_medium_airports} />
	<label for="display_medium_airports">Medium Airports</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_small_airports} />
	<label for="display_small_airports">Small Airports</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_heliports} />
	<label for="display_heliports">Heliports</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_seaplane_bases} />
	<label for="display_seaplane_bases">Seaplane Bases</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_balloonports} />
	<label for="display_balloonports">Balloonports</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_closed_airports} />
	<label for="display_closed_airports">Closed Airports</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_ufos} />
	<label for="display_ufos">UFOs</label>
	<input type="checkbox" bind:checked={shared_state.display_options.display_religion} />
	<label for="display_religion">Religion</label>
</div>

<style lang="scss">
	.display_options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		z-index: 1;
	}
</style>

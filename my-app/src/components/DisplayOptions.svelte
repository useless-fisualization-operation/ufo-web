<script lang="ts">
	import type { SharedState } from './shared';
	import { shared } from './shared';

	let clazz = '';
	export { clazz as class };

	let display_options: SharedState['display_options'];
	shared.subscribe((v) => {
		display_options = v.display_options;
	});
</script>

<div class="{clazz} display_options">
	<input type="checkbox" bind:checked={display_options.large_airport} />
	<label for="display_large_airports">Large Airports</label>
	<input type="checkbox" bind:checked={display_options.medium_airport} />
	<label for="display_medium_airports">Medium Airports</label>
	<input type="checkbox" bind:checked={display_options.small_airport} />
	<label for="display_small_airports">Small Airports</label>
	<input type="checkbox" bind:checked={display_options.heliport} />
	<label for="display_heliports">Heliports</label>
	<input type="checkbox" bind:checked={display_options.seaplane_base} />
	<label for="display_seaplane_bases">Seaplane Bases</label>
	<input type="checkbox" bind:checked={display_options.balloonport} />
	<label for="display_balloonports">Balloonports</label>
	<input type="checkbox" bind:checked={display_options.closed_airport} />
	<label for="display_closed_airports">Closed Airports</label>
	<input type="checkbox" bind:checked={display_options.ufo} />
	<label for="display_ufos">UFOs</label>
	<input type="checkbox" bind:checked={display_options.religion} />
	<label for="display_religion">Religion</label>
</div>

<style lang="scss">
	.display_options {
		display: grid;
		grid-template-columns: 20px 1fr;
	}
</style>

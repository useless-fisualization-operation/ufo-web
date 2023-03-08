<script lang="ts">
	import type { SharedState } from './shared';

	export let shared_state: SharedState;

	let selected = shared_state.selected;
</script>

<div class="details">
	<p class="description">State</p>
	<p class="description">UFO: Location</p>
	<p class="description">UFO: Date</p>
	<p class="description">UFO: Shape</p>
	<p class="description">UFO: Duration of the Event</p>
	<p class="description">UFO: Summary of the Event</p>
	<p class="description">Airport</p>
</div>

<style lang="scss">
	.details {
	}
</style>

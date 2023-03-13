<script lang="ts">
	import { shared, type SharedState } from './shared';
	let clazz = '';
	export { clazz as class };

	let page: SharedState['page'];
	shared.subscribe((v) => {
		page = v.page;
	});
</script>

<div class="header {clazz}">
	<h1>UFO Sightings</h1>
	<div class="menu">
		<button
			class="menu-button"
			on:click={() =>
				shared.update((v) => {
					v.page = 'map';
					return v;
				})}>Map</button
		>
		<!-- chart -->
		<button
			class="menu-button"
			on:click={() =>
				shared.update((v) => {
					v.page = 'chart';
					return v;
				})}>Chart</button
		>
		<!-- about -->
		<button
			class="menu-button"
			on:click={() =>
				shared.update((v) => {
					v.page = 'about';
					return v;
				})}>About</button
		>
		<!-- heatmap -->
		<button
			class="menu-button"
			on:click={() =>
				shared.update((v) => {
					v.page = 'heatmap';
					return v;
				})}>Heatmap</button
		>
	</div>
</div>

<style lang="scss">
	.header {
		background-color: var(--surface-1);
		height: 20px;
		display: flex;
	}
</style>

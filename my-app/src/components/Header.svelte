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
	<h1>Useless Fisualization Operation</h1>
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
				})}>Relations</button
		>
		<!-- heatmap -->
		<button
			class="menu-button"
			on:click={() =>
				shared.update((v) => {
					v.page = 'heatmap';
					return v;
				})}
			>Days of the year
		</button>
		<!-- about -->
		<button
			class="menu-button"
			on:click={() =>
				shared.update((v) => {
					v.page = 'about';
					return v;
				})}>About us</button
		>
	</div>
</div>

<style lang="scss">
	.header {
		box-shadow: 0 0 0.5em 0.1em rgba(0, 0, 0, 0.1);
		background-color: var(--surface-1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 4em;
		align-items: center;

		h1 {
			margin-left: 2em;
			font-size: 140%;
			font-weight: bold;
			color: var(--accent);
		}
	}

	.menu {
		display: flex;
		flex-direction: row;
		margin-right: 2em;
		justify-content: space-between;
		gap: 1em;

		button {
			background-color: var(--button-1);
			border: none;
			padding: 0.5em 1em 0.5em 1em;
			border-radius: 0.3em;
			color: var(--accent);
		}

		button:hover {
			background-color: var(--button-1-hover);
			color: white;
		}
	}
</style>

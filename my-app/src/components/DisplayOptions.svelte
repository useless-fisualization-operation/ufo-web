<script lang="ts">
	import type { SharedState } from './shared';
	import { shared } from './shared';
	import { allShapes } from './ufo_shapes';
	import { AirportTypes } from './airport_data';

	let clazz = '';
	export { clazz as class };
	/*
	let display_options: SharedState['display_options'];
	shared.subscribe((v) => {
		display_options = v.display_options;
	});*/
	let filterAirports = false;
	let filterUfo = false;
	let filterUfoImages = false;
	let filterUfoShapes = false;
</script>

<div class={clazz}>
	<div class="legend card">
		<center><h4>Filter</h4></center>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="item" on:click={() => (filterUfo = !filterUfo)}>
			<input type="checkbox" bind:checked={$shared.display_options.ufo} />
			<div class="ufo_legend" />
			<p class="desc">
				{filterUfo ? '▼' : '▶'}
				UFO sighting
			</p>
		</div>
		{#if filterUfo}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={() => (filterUfoImages = !filterUfoImages)}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoImages ? '▼' : '▶'}Filter Images</p>
			</div>
			{#if filterUfoImages}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_images} />
					<div class="ufo_legend" />
					<p class="desc">With fig.</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_no_images} />
					<div class="ufo_legend" />
					<p class="desc">With fig.</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_hoax} />
					<div class="ufo_legend" />
					<p class="desc">Hoaxes</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.madar} />
					<div class="ufo_legend" />
					<p class="desc">Madar</p>
				</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={() => (filterUfoShapes = !filterUfoShapes)}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoShapes ? '▼' : '▶'}Filter Shapes</p>
			</div>
			{#if filterUfoShapes}
				{#each Object.keys($shared.display_options.shapes) as shape}
					<div class="item">
						<p>&nbsp&nbsp&nbsp&nbsp</p>
						<input type="checkbox" bind:checked={$shared.display_options.shapes[shape]} />
						<div class="ufo_legend" />
						<p class="desc">{shape}</p>
					</div>
				{/each}
			{/if}
		{/if}
		<div class="item" on:click={() => (filterAirports = !filterAirports)}>
			<input type="checkbox" bind:checked={$shared.display_options.airports} />
			<div class="airport_legend" />
			<p class="desc">
				{filterAirports ? '▼' : '▶'}
				Airports
			</p>
		</div>
		{#if filterAirports}
			{#each Object.keys(AirportTypes) as airport_type}
				<div class="item">
					<p>&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options[airport_type]} />
					<div class="airport_legend" />
					<p class="desc">{AirportTypes[airport_type]}</p>
				</div>
			{/each}
		{/if}
		<div class="item">
			<input type="checkbox" bind:checked={$shared.display_options.religion} />
			<div class="religion_legend" style="background-color: green" />
			<p class="desc">Importance of Religion</p>
		</div>
	</div>
</div>

<style>
	.legend {
		padding: 1vh;
		background-color: var(--surface-1);
		border-radius: 1vh;
	}

	h4 {
		font-weight: bold;
		font-size: 120%;
		margin: 0.5em;
	}

	.legend .item {
		display: flex;
		align-items: center;
	}

	.airport_legend {
		background-color: var(--airport);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.religion_legend {
		width: 1vh;
		height: 1vh;
	}

	.ufo_legend {
		background-color: var(--ufo);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.desc {
		margin-left: 1vw;
	}

	.item input {
		margin-right: 1vw;
	}
	.item {
		height: 2vh;
	}
</style>

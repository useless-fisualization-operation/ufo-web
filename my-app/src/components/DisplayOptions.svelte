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
	let filterUfoHoax = false;
	let filterUfoMadar = false;
</script>

<div class="card {clazz}">
	<div class="legend">
		<center><h4 class="title">Filter</h4></center>
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
				<p class="desc">{filterUfoImages ? '▼' : '▶'} Filter Images</p>
			</div>
			{#if filterUfoImages}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_images} />
					<div class="ufo_legend" />
					<p class="desc">With image</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_no_images} />
					<div class="ufo_legend" />
					<p class="desc">Without image</p>
				</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={() => (filterUfoHoax = !filterUfoHoax)}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoHoax ? '▼' : '▶'} Filter Hoax</p>
			</div>
			{#if filterUfoHoax}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_hoax} />
					<div class="ufo_legend" />
					<p class="desc">Hoax</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type="checkbox" bind:checked={$shared.display_options.ufo_non_hoax} />
					<div class="ufo_legend" />
					<p class="desc">Non Hoax</p>
				</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!--
			<div class="item" on:click={()=>filterUfoMadar=!filterUfoMadar}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoMadar ? '▼' : '▶'}Filter MADAR</p>
			</div>
			{#if filterUfoMadar}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={$shared.display_options.ufo_madar}>
					<div class="ufo_legend"></div>
					<p class="desc">MADAR NODE</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={$shared.display_options.ufo_non_madar}>
					<div class="ufo_legend"></div>
					<p class="desc">Non MADAR</p>
				</div>
			{/if}
			-->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={() => (filterUfoShapes = !filterUfoShapes)}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoShapes ? '▼' : '▶'} Filter Shapes</p>
			</div>
			{#if filterUfoShapes}
				{#each Object.keys($shared.shapes_options) as shape}
					<div class="item">
						<p>&nbsp&nbsp&nbsp&nbsp</p>
						<input type="checkbox" bind:checked={$shared.shapes_options[shape]} />
						<div class="ufo_legend" />
						<p class="desc">{shape}</p>
					</div>
				{/each}
			{/if}
		{/if}
		<div class="item" on:click={() => (filterAirports = !filterAirports)}>
			<input type="checkbox" bind:checked={$shared.display_options.airport} />
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
			<div class="religion_legend" />
			<p class="desc">Importance of Religion</p>
		</div>
		<div class="item">
			<input type="checkbox" bind:checked={$shared.display_options.cities} />
			<div class="city_legend" />
			<p class="desc">Cities</p>
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
		background-color: #306153;
		width: 1vh;
		height: 1vh;
	}

	.ufo_legend {
		background-color: var(--ufo);
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
	}

	.city_legend {
		width: 1vh;
		height: 1vh;
		border-radius: 100%;
		background-color: rgb(255, 230, 132);
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

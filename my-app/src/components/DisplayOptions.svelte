<script lang="ts">
	import type { SharedState } from './shared';
	import { shared } from './shared';
	import { allShapes } from './ufo_shapes';
	import {AirportTypes} from './airport_data';

	let clazz = '';
	export { clazz as class };

	let display_options: SharedState['display_options'];
	shared.subscribe((v) => {
		display_options = v.display_options;
	});
	let filterAirports = false;
	let filterUfo = false;
	let filterUfoImages = false;
	let filterUfoShapes = false;
</script>
<!--
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
	<input type="checkbox" bind:checked={display_options.ufo_images} />
	<label for="display_ufos">UFOs Images</label>
	<input type="checkbox" bind:checked={display_options.ufo_no_images} />
	<label for="display_ufos">UFOs No Images</label>
	<input type="checkbox" bind:checked={display_options.religion} />
	<label for="display_religion">Religion</label>
	{#each Object.keys(display_options.shapes) as shape}
		<input type="checkbox" bind:checked={display_options.shapes[shape]} />
		<label for="display_religion">{shape}</label>	
	{/each}
</div>

<style lang="scss">
	.display_options {
		display: grid;
		grid-template-columns: 20px 1fr;
	}
</style>
-->
<div class="{clazz} sidebar2">
	<div class="legend">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="item" on:click={()=>filterUfo=!filterUfo}>
			<input type=checkbox bind:checked={display_options.ufo}>
			<div class="ufo_legend"></div>
			<p class="desc">
				{filterUfo ? '▼' : '▶'}
				UFO sighting
			</p>
		</div>
		{#if filterUfo}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={()=>filterUfoImages=!filterUfoImages}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoImages ? '▼' : '▶'}Filter Images</p>
			</div>
			{#if filterUfoImages}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={display_options.ufo_images}>
					<div class="ufo_legend"></div>
					<p class="desc">With fig.</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={display_options.ufo_no_images}>
					<div class="ufo_legend"></div>
					<p class="desc">With no fig.</p>
				</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={()=>filterUfoShapes=!filterUfoShapes}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoShapes ? '▼' : '▶'}Filter Shapes</p>
			</div>
			{#if filterUfoShapes}
				{#each Object.keys(display_options.shapes) as shape}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={display_options.shapes[shape]}>
					<div class="ufo_legend"></div>
					<p class="desc">{shape}</p>
				</div>
				{/each}
			{/if}
		{/if}
		<div class="item" on:click={()=>filterAirports=!filterAirports}>
			<input type=checkbox bind:checked={display_options.airports}>
			<div class="airport_legend"></div>
			<p class="desc">
				{filterAirports ? '▼' : '▶'}
				Airports
			</p>
		</div>
		{#if filterAirports}
			{#each Object.values(AirportTypes) as airport_type}
				<div class="item">
					<p>&nbsp&nbsp</p>
					<input type=checkbox bind:checked={display_options[airport_type]}>
					<div class="airport_legend"></div>
					<p class="desc">{airport_type}</p>
				</div>
			{/each}
		{/if}
		<div class="item">
			<input type=checkbox bind:checked={display_options.religion}>
			<div class="religion_legend" style="background-color: green"></div>
			<p class="desc">Importance of Religion</p>
		</div>
		
	</div>
</div>

<style>
	.legend {
		width: 80%;
		padding: 1vh;
		border-style: solid;
		background-color: rgba(255,255,255,0.5);
		border-color: rgb(231, 231, 231);
		border-radius: 1vh;
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

	.sidebar2 {
		display: flex;
		position: absolute;
		right:0;
		top:0;
		flex-direction: column;
		align-items: center;
		color: black;
		border-radius: 1vh;
		margin: 1vw;
		padding: 2vh;
		min-width: 20vw;
		max-width: 20vw;
		width: 20vw;
		z-index: 10;
	}

</style>
<script>
    export let ufoObject;
	export let airportTypes;
	export let displayUfos;
	export let displayReligion;
	export let displayAirports

	let filterAirports = false;
	let filterUfo = false;
	let filterUfoImages = false;
	let filterUfoShapes = false;
</script>
<div class="sidebar2">
	<div class="legend">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="item" on:click={()=>filterUfo=!filterUfo}>
			<input type=checkbox bind:checked={displayUfos}>
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
					<input type=checkbox bind:checked={ufoObject.yes_pic}>
					<div class="ufo_legend"></div>
					<p class="desc">Reports with pictures</p>
				</div>
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={ufoObject.no_pic}>
					<div class="ufo_legend"></div>
					<p class="desc">Reports without pictures</p>
				</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="item" on:click={()=>filterUfoShapes=!filterUfoShapes}>
				<p>&nbsp&nbsp</p>
				<p class="desc">{filterUfoShapes ? '▼' : '▶'}Filter Shapes</p>
			</div>
			{#if filterUfoShapes}
				{#each Object.values(ufoObject.shape) as shape}
				<div class="item">
					<p>&nbsp&nbsp&nbsp&nbsp</p>
					<input type=checkbox bind:checked={shape.on}>
					<div class="ufo_legend"></div>
					<p class="desc">{shape.name} Shape</p>
				</div>
				{/each}
			{/if}
		{/if}
		<div class="item" on:click={()=>filterAirports=!filterAirports}>
			<input type=checkbox bind:checked={displayAirports}>
			<div class="airport_legend"></div>
			<p class="desc">
				{filterAirports ? '▼' : '▶'}
				Airports
			</p>
		</div>
		{#if filterAirports}
			{#each Object.values(airportTypes) as air}
				<div class="item">
					<p>&nbsp&nbsp</p>
					<input type=checkbox bind:checked={air.on}>
					<div class="airport_legend"></div>
					<p class="desc">{air.name}</p>
				</div>
			{/each}
		{/if}
		<div class="item">
			<input type=checkbox bind:checked={displayReligion}>
			<div class="religion_legend" style="background-color: red"></div>
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
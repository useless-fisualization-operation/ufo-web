<script lang="ts">
	import type { Airport } from './airport_data';
	import type { SharedState } from './shared';
	import type { State } from './states';
	import type { Ufos, Ufo2 } from './ufo_data2';
	import type { City } from './city_data';
	import type { Shape } from './ufo_shapes';

	import { shared } from './shared';

	import Modal from './Modal.svelte';
	let showModal = false;

	let clazz = '';
	export { clazz as class };

	let shared_state: SharedState | null;
	let selected_type: 'city' | 'state' | 'airport' | 'ufos' | 'none';
	let selected_state: State | null;
	let selected_airport: Airport | null;
	let selected_ufos: Ufos | null;
	let selected_city: City | null;
	let n_ufos: {data:number,loc:number} | null;
	let shapes: Shape[] | null;
	let counter = 0;


	shared.subscribe((v) => {
		shared_state = v;
		selected_type = v.selected_type;
		selected_state = v.selected_type == 'state' ? (v.selected as State) : null;
		selected_airport = v.selected_type == 'airport' ? (v.selected as Airport) : null;
		selected_ufos = v.selected_type == 'ufos' ? (v.selected as Ufos) : null;
		selected_city = v.selected_type == 'city' ? (v.selected as City) : null;
		shapes = v.selected_type == 'ufos' ? (v.shapes as Shape[]) : null;
		n_ufos = v.selected_type == 'state' ? v.n_ufos_on_state : null;
		counter = 0;
	});
</script>

<div class="{clazz} details card">
	{#if selected_type == 'none'}
		<center><p class="description">&#128161 Click on a state, airport, or UFO to see more information.</p></center>
	{:else if selected_type == 'state'}
		<center><h4>State &#128205</h4></center>
		<b>Name</b><p class="description">{selected_state}</p>
		<b>#ufos (#locations)</b><p class="description">{$shared.n_ufos_on_state.data}({$shared.n_ufos_on_state.loc})</p>
		<b>Population</b><p class="description">TODO</p>
		<b>Religion</b><p class="description">TODO</p>
	{:else if selected_type == 'ufos' && selected_ufos !== null}
		<center><h4>UFO Sighting &#128760</h4></center>
		{#if selected_ufos?.tot > 1}
			<div class="ufobrowse">
				<p class="num">{counter+1} / {selected_ufos?.tot}</p>
				<button class="next" on:click={()=>counter=((counter+1)%selected_ufos?.tot)}>Next</button>
			</div>
		{/if}
		<b>Description</b><p class="description">{selected_ufos?.ufos[counter].summary}...</p>
		<p class="description"><a href="{selected_ufos?.ufos[counter].url}">Read NUFORC Report</a></p>
		<b>Location</b><p class="description">{selected_ufos?.location}</p>
		{#if shapes !== null}<b>Shape</b><p class="description">{shapes[selected_ufos?.ufos[counter].id_ref_shape].type}</p>{/if}
		<b>Date</b><p class="description"> {selected_ufos?.ufos[counter].date}</p>
		<b>Duration</b><p class="description">{selected_ufos?.ufos[counter].duration}</p>
		{#if selected_ufos?.ufos[counter].urlImage}
			<p class="description"><b>Image:</b> </p>
			<div style="max-height:60vh; max-width:95%">
			<center>
			<img src="{selected_ufos?.ufos[counter].urlImage}" alt="Ufo" width="100%" on:click={()=>showModal = true}/>
			</center>
			</div>
		{/if}
	{:else if selected_type == 'airport'}
	<center><h4>Airport &#128747</h4></center>
	<b>Name</b><p class="description"> {selected_airport?.name}</p>
	{:else if selected_type == 'city'}
	<center><h4>City &#127961</h4></center>
	<b>Name</b><p class="description"> {selected_city?.name}</p>
	{/if}
</div>

<Modal bind:showModal>
	{#if selected_ufos?.ufos[counter].urlImage}
		<img src="{selected_ufos?.ufos[counter].urlImage}" alt="Ufo" width="100%"/>
	{/if}
</Modal>

<style lang="scss">
	.description {
		margin-bottom: 0.5em;
		
		a {
			font-style: italic;
		}
	}

	.details {
		z-index: 1;
		min-width: 100%;
		height: 100%;

		p {
			font-size: 110%;
		}

		h4 {
			font-size: 120%;
			margin-bottom: 0.5em;
			font-weight: bold;
		}

		b {
			font-weight: bold;
		}
	}

	.ufobrowse {
		margin: 1em 0;
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
		justify-content: space-between;

		.num {
		color: gray;
		display: block;
		}

		.next {
			background-color: var(--button-0);
			color: white;
			padding: 0.2em 0.6em 0.2em 0.6em;
			font-size: 100%;
			border-radius: 0.5em;
			border: none;
			display: block;
		}

		.next:hover {
		background-color: var(--button-0-hover);
		}
	}
</style>

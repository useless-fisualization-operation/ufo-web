<script lang="ts">
	import type { Airport } from './airport_data';
	import type { SharedState } from './shared';
	import type { State } from './states';
	import type { Ufos, Ufo2 } from './ufo_data2';

	import { shared } from './shared';

	import Modal from './Modal.svelte';
	let showModal = false;

	let clazz = '';
	export { clazz as class };

	let shared_state: SharedState | null;
	let selected_type: 'state' | 'airport' | 'ufos' | 'none';
	let selected_state: State | null;
	let selected_airport: Airport | null;
	let selected_ufos: Ufos | null;
	let counter = 0;


	shared.subscribe((v) => {
		shared_state = v;
		selected_type = v.selected_type;
		selected_state = v.selected_type == 'state' ? (v.selected as State) : null;
		selected_airport = v.selected_type == 'airport' ? (v.selected as Airport) : null;
		selected_ufos = v.selected_type == 'ufos' ? (v.selected as Ufos) : null;
		counter = 0;
	});
</script>

<div class="{clazz} details">
	{#if selected_type == 'none'}
		<p class="description">Click on a state, airport, or UFO to see more information.</p>
	{:else if selected_type == 'state'}
		<p class="description">State: {selected_state}</p>
		<p class="description">Population: TODO</p>
		<p class="description">Religion: TODO</p>
	{:else if selected_type == 'ufos' && selected_ufos !== null}
		<center><h4>UFO</h4></center>
		<p> {counter+1}/{selected_ufos?.tot}</p>
		<p class="description"><b>Summary of the Event:</b> {selected_ufos?.ufos[counter].summary}</p>
		<p class="description"><b>Location:</b> {selected_ufos?.location}</p>
		<p class="description"><b>Date:</b> {selected_ufos?.ufos[counter].date}</p>
		<p class="description"><b>Duration of the Event:</b> {selected_ufos?.ufos[counter].duration}</p>
		<p class="description"><b>Summary of the Event:</b> {selected_ufos?.ufos[counter].summary}</p>
		<p class="description"><b>NUFORC Report:</b> <a href="{selected_ufos?.ufos[counter].url}">Link</a></p>
		{#if selected_ufos?.ufos[counter].urlImage}
			<p class="description"><b>Image:</b> </p>
			<div style="max-height:60vh; max-width:95%">
			<center>
			<img src="{selected_ufos?.ufos[counter].urlImage}" alt="Ufo" width="100%" on:click={()=>showModal = true}/>
			</center>
			</div>
		{/if}
		<button on:click={()=>counter=((counter+1)%selected_ufos?.tot)}></button>
		
	{:else if selected_type == 'airport'}
		<p class="description">Airport: {selected_airport?.name}</p>
	{/if}
</div>

<Modal bind:showModal>
	{#if selected_ufos?.ufos[counter].urlImage}
		<img src="{selected_ufos?.ufos[counter].urlImage}" alt="Ufo" width="100%"/>
	{/if}
</Modal>

<style lang="scss">
	.details {
		z-index: 1;
		background-color: var(--surface-1);
		min-width: 100%;
		height: 100%;
	}
</style>

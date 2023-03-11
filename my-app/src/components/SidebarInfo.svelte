<script>
	import Modal from './Modal.svelte';
    export let state;
    export let airport;
    export let ufo;
	let showModal = false;
</script>

<div class="sidebar">
	<div style="width:90%; background-color:rgba(255,255,255,0.7); padding:1vh; border-radius:2vh 2vh 0vh 0vh">
		<p class="logo">Useless Fisualization Operation</p>
	
	</div>
	<div style="width:90%; background-color:rgba(184,189,193,0.7); padding:1vh">
		<center><h3>MISCELLANEOUS</h3></center>
		<p class="description"><b>State:</b> {state ?? '-'}</p>
		<p class="description"><b>Airport:</b> {airport?.name ?? '-'}</p>
	</div>
	<div style="width:90%; background-color:rgba(235,94,6,0.7); padding:1vh; border-radius:0vh 0vh 2vh 2vh">
		<center><h3>UFO</h3></center>
	<p class="description"><b>Location:</b> {ufo?.City ?? '-'}</p>
	<p class="description"><b>Date:</b> {ufo?.Date ?? '-'}</p>
	<p class="description"><b>Shape:</b> {ufo?.Shape ?? '-'}</p>
	<p class="description"><b>Duration:</b> {ufo?.Duration ?? '-'}</p>
	<p class="description"><b>Summary:</b> {ufo?.Summary +'...' ?? '-'}</p>
	<p class="description"><b>Nuforc Report:</b> 
	{#if ufo?.Url}
	<a href="{ufo?.Url}">Link</a>
	{:else}
	-
	{/if}
	</p>
	<p class="description"><b>Nuforc Image:</b> 
	{#if ufo?.UrlImage}
	<div style="max-height:60vh; max-width:95%">
	<center>
		
			<img src="{ufo?.UrlImage}" alt="Ufo" width="100%" on:click={()=>showModal = true}/>
		</center>
	</div>
	{:else}
	-
	{/if}
	</div>
</div>

<Modal bind:showModal>
	{#if ufo?.UrlImage}
		<img src="{ufo?.UrlImage}" alt="Ufo" width="100%"/>
	{/if}
</Modal>

<style>
	.description {
		font-size: 1.3vh;
		margin-bottom: 0.1rem;
	}

	.logo {
		font-weight: bold;
		font-size: 2vh;
		text-align: center;
	}

	.sidebar {
		display: flex;
		position: absolute;
		left:0;
		top:0;
		flex-direction: column;
		color: black;
		margin: 1vw;
		padding: 2vh;
		min-width: 15vw;
		max-width: 15vw;
		max-height: 70vh;
		width: 15vw;
		z-index: 10;
	}
</style>
<script>
    export let displayReligion;
    export let scale = [0,1,2,3,4];  
</script>

<div class="color_legend">
	{#if displayReligion}
	<div class="legend" style="background-color: rgba(255,255,255,0.5)">
		<section>
			{#each scale as v,i}
			<div class="section_div" style="background-color:{v}">{i/4*100}%</div>
			{/each}
		</section>
	</div>
	{/if}
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

	.color_legend{
		margin-bottom: 1vh;
		position: absolute;
    	bottom: 0;
		right:0;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: black;
		border-radius: 1vh;
		height: 5vh;
		min-width: 20vw;
		max-width: 20vw;
		width: 20vw;
		z-index: 10;
	}

	section {
    box-sizing: border-box;
    height: 100%;
	width:100%;
	}
	.section_div {
		display: inline-block;
		text-align: center;
		height: 100%;
		width: 18.4%;
	}
</style>
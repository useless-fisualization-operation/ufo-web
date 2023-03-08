<script>
// @ts-nocheck
    import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { getAirportData, getReligionData, getUfoData} from '../routes/data.js';
	import * as d3 from 'd3';
	import { zoom, select } from "d3";
	import { check_outros, debug } from 'svelte/internal';
	import UfoSvg from './UfoSvg.svelte' // The svelte svg
	import SidebarInfo from './SidebarInfo.svelte' // The svelte svg
	import SidebarFilter from './SidebarFilter.svelte' // The svelte svg
	import ReligionLegend from './ReligionLegend.svelte' // The svelte svg

	// ----------- Map: ----------- 
	let us_states =  ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	let us_states_short = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
	const path = geoPath().projection(null);

	// ----------- Data: ----------- 
	var airports = getAirportData(projection);
	let states = [];
	var religion = getReligionData();
	
	// ----------- Airports: -----------
	let airportTypes = {
		large_airport: {on: true, name:'Large Airports', val: airports.filter(o=>o.type=="large_airport")},
		medium_airport: { on: true, name:'Medium Airports',val: airports.filter(o=>o.type=="medium_airport")},
		small_airport: { on: false, name:'Small Airports',val: airports.filter(o=>o.type=="small_airport")},
		heliport: { on: true, name:'Heliport',val: airports.filter(o=>o.type=="heliport")},
		seaplane_base: { on: true, name:'Seaplane Base',val: airports.filter(o=>o.type=="seaplane_base")},
		balloonport: { on: true, name:'Balloonport',val: airports.filter(o=>o.type=="balloonport")}
	}
	// ----------- Ufos: -----------
	let ufoObject = {
		yes_pic: true,
		no_pic: false,
		shape: {
		circle: {on:true, name:'Circle'},
		disk: {on:true, name:'Disk'},
		unknown: {on:true, name:'Unknown'},
		changing: {on:true, name:'Changing'},
		light: {on:true, name:'Light'},
		rectangle: {on:true, name:'Rectangle'},
		cigar: {on:true, name:'Cigar'},
		oval: {on:true, name:'Oval'},
		sphere: {on:true, name:'Sphere'},
		diamond: {on:true, name:'Diamond'},
		triangle: {on:true, name:'Triangle'},
		cylinder: {on:true, name:'Cylinder'},
		fireball: {on:true, name:'Fireball'},
		chevron: {on:true, name:'Chevron'},
		flash: {on:true, name:'Flash'},
		cone: {on:true, name:'Cone'},
		egg: {on:true, name:'Egg'},
		cross: {on:true, name:'Cross'},
		teardrop: {on:true, name:'Teardrop'}
		}
	}
	var entireUfoData = [];
	$: ufoData = entireUfoData.filter(o=>{
		let ok_one = false;
		let ok_two = false;
		if(ufoObject.yes_pic && o.Images=="Yes") ok_one=true;
		if(ufoObject.no_pic && o.Images!="Yes") ok_one=true;
		if(ok_one){
			Object.values(ufoObject.shape).forEach(val=>{
				if(val.on && o.Shape==val.name){ok_two = true;};
			});
		}
		if (ok_one && ok_two) return o;
	});

	// ----------- Sidebar Info: ----------- 
	let selected;
	let selectedUfo;
	let selectedAirport;

	// -----------  Legend checkmarks: ----------- 
	let displayUfos = true;
	let displayReligion = false;
	let displayAirports = false;
	
	// ----------- Load Data: -----------
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-albers-10m.json')
			.then(d => d.json())
		states = topojson.feature(us, us.objects.states).features;
		await getUfoData(projection).then(
			r=>{
				entireUfoData=r;
				ufoData=r;
			});	
	});
	
	// ----------- Style Map: ----------- 
    let radialScale = d3.scaleLinear().domain([0, 1]).range(["#f7fcf5","#00441b"]);
	//.range(["#fff5eb","#7f2704"]);
	//.range(["#fff5f0","#67000d"]);
	function colorStates(name){
		let i = us_states.indexOf(name);
		let t = us_states_short[i];
		let r = religion.filter(o=>o.State==t)[0];
		if(typeof r !== "undefined") return radialScale(r["Very important"]);
		return "blue"
	}

	// ----------- Zoom and Pan: ----------- 
	let bindHandleZoom, bindInitZoom;
	let innerWidth = 0;
	let innerHeight = 0;
    $: width = innerWidth;
    $: height = innerHeight;
	$: zoomX = zoom()
    	.scaleExtent([1, 50])
    	.translateExtent([[0, 0],[width, height]])
    	.on("zoom", handleZoom);
	function handleZoom(e) {select(bindHandleZoom).attr("transform", e.transform);}
	$:if (bindInitZoom) {select(bindInitZoom).call(zoomX);}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!------------------  SIDEBAR TO THE LEFT ---------------- -->
<SidebarInfo state={selected?.properties.name} airport={selectedAirport} ufo={selectedUfo}/>

<!------------------  SIDEBAR TO THE RIGHT ---------------- -->
<SidebarFilter bind:ufoObject={ufoObject} bind:airportTypes={airportTypes} bind:displayAirports={displayAirports} bind:displayUfos={displayUfos} bind:displayReligion={displayReligion}/>

<!------------------  RELIGION LEGEND BOTTOM RIGHT ---------------- -->
<ReligionLegend bind:displayReligion={displayReligion} scale={[radialScale(0),radialScale(0.25),radialScale(0.5),radialScale(0.75),radialScale(1)]}/>

<!------------------  LOADING SCREEN ---------------- -->
{#if ufoData.length === 0}
	<div class="loadingbg"></div>
	<div class="loadingscreen">Looking for UFOs ...</div>
{/if}

<!------------------  THE MAP ---------------- -->
<svg bind:this={bindInitZoom} {width} {height} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
	<g bind:this={bindHandleZoom}>
		<!------------------  DISPLAY STATES ---------------- -->
		{#each states as feature}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path d={path(feature)}
				on:click={() => {
					selectedUfo = null;
					selected = feature;
					selectedAirport = null;
					}} 
				fill="{displayReligion ? colorStates(feature.properties.name) : 'rgb(54, 57, 61)'}" 
				class="state"/>
		{/each}		

		<!------------------  DISPLAY SELECTED STATE ---------------- -->
		{#if selected}
			<path d={path(selected)} on:click={()=>{selected = null; selectedUfo = null;}} class="selected" />
		{/if}

		<!------------------  DISPLAY AIRPORTS ---------------- -->
		{#if displayAirports}
			{#each Object.values(airportTypes) as airport_type}
				{#if airport_type.on}
					{#each airport_type.val as air}
						<circle class="airportdot" 
						cx={air.coordinates[0]} 
						cy={air.coordinates[1]} 
						r={0.6} 
						on:click={() => {
							selectedAirport = air;
							let i = us_states_short.indexOf(air.state);
							selected = states.filter(o=>o.properties.name==us_states[i])[0];
						}}/>
					{/each}
				{/if}	
			{/each}
		{/if}

		<!------------------  DISPLAY UFOS ---------------- -->
		{#if displayUfos}
			{#each ufoData as ufo}
			<!-- svelte-ignore a11y-click-events-have-key-events -->	
			<circle class="ufodot"
				cx={ufo.coordinates[0]} 
				cy={ufo.coordinates[1]} 
				r={0.4} 
				on:click={() => {
					// ape contains all ufos in the selected circle
					var ape = ufoData.filter(
						o=> {
							if((o.City == ufo.City) && (ufo.State == o.State)) return o;
							//if((Math.abs(o.coordinates[0]-ufo.coordinates[0]) < 0.01) && (Math.abs(o.coordinates[1]-ufo.coordinates[1]) < 0.01)) return o;
					});	
					console.log(ape);
					selectedUfo = ufo;
					let i = us_states_short.indexOf(ufo.State);
					selected = states.filter(o=>o.properties.name==us_states[i])[0];
					}}/>
			{/each}
		{/if}
		<!------------------  DISPLAY SELECTED UFO ---------------- -->
		{#if selectedUfo}
			<UfoSvg x_pos={selectedUfo?.coordinates[0]} y_pos={selectedUfo?.coordinates[1]}/>
			<circle cx={selectedUfo?.coordinates[0]} cy={selectedUfo?.coordinates[1]} r={0.4} fill="white"/>
		{/if}
	</g>
</svg>

<style>
	:root{
		--ufo: rgb(255, 98, 0);
		--airport: rgb(58, 230, 227);
	}

	.state:hover {
		fill: rgb(86, 92, 99);
    }

	.airportdot {
		fill: var(--airport);
		opacity: 0.9;
	}

	.airportdot:hover {
		fill: rgb(159, 255, 253);
		opacity: 1;
	}

	.ufodot {
		fill: var(--ufo);
		opacity: 0.9;
	}

	.ufodot:hover {
		fill: rgb(255, 170, 118);
		opacity: 1;
	}

	svg {
		overflow: visible;
		display: inline-block;
		position: absolute;
		top: 10vh;
		left: 8vw;
	}

    .selected {
        fill: rgb(47, 80, 150);
    }

	.loadingbg {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(46, 46, 46);
		opacity: 0.9;
		z-index: 6;
	}

	.loadingscreen {
		font-size: 6vh;
		position: absolute;
		color: white;
		left: 40%;
		top: 40%;
		z-index: 1000;
		border-radius: 1vh;
		padding: 4vh;
	}

    path {
        stroke: white;
		stroke-width: 0.5px;
    }

</style>
<div class="about card">
	<h1 class="title">About</h1>
	<div class="projectdesc">
		<h2>Project Description</h2>
		<p>
			Have you ever wondered about extraterrestial activity on earth? Or do you think it's all made up and imagined? Or are you still torn between the two? 
			Either way, the Useless Fisualization Operation was made for you! Our objective was to allow exploring reports of UFO sightings in the USA and uncover underlying patterns. 
		</p>
		<p>
			With the help of our interactive map you can investigate the locations of UFO sightings, filter them, and get detailed reports on demand as well as images if available. 
			By including other data such as airport locations, you can decide for yourself if you think the two might be correlated. 
			Relationships with further datasets can be explored via a scatterplot, where you can filter by years, in case you want to match the time frames of the two datasets. 
		</p>
		<p>
			To further incorporate the temporal dimension of the data, we have a heatmap showing the frequency of UFO sightings per date. 
			Come see for yourself, we hope your time here is out of this world.
		</p>
	</div>
	<div class="team">
		<h2>Team</h2>
		<div class="groupmembers">
			<div class="member">
				<img src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/alien.png">
				<p class="name">Albin Kempe</p>
				<p class="role">Front-End Developer <br/> UX/UI Designer</p>
			</div>
			<div class="member">
				<img src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/alien.png">
				<p class="name">Annika Oehri</p>
				<p class="role">Data Engineer <br/> Front-End Developer</p>
			</div>
			<div class="member">
				<img src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/alien.png">
				<p class="name">Frawa Vetterli</p>
				<p class="role">Data Engineer <br/>Front-End Developer <br/> UX/UI Designer</p>
			</div>
			<div class="member">
				<img src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/alien.png">
				<p class="name">Jonathan Cilli</p>
				<p class="role">Data Engineer <br/> Front-End Developer <br/> UX/UI Designer</p>
			</div>
			<div class="member">
				<img src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/alien.png">
				<p class="name">Pedro Burgos</p>
				<p class="role">Front-End Developer <br/> UI/UX Designer</p>
			</div>
		</div>
	</div>
	<div class="data">
		<h2>Data</h2>
	</div>
	
</div>

<style lang="scss">
	.about {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

		
	h1 {
		font-size: 140%;
		margin-bottom: 0.5em;
	}

	h2 {
		color: var(--accent);
		font-weight: bold;
		margin-bottom: 0.5em;
	}

	.team {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1em;
	}

	.projectdesc p {
		font-size: 80%;
		margin-bottom: 0.5em;
		text-align: center;
	}

	.role {
		font-size: 80%;
		font-weight: bold;
	}

	.projectdesc {
		margin-bottom: 0.5em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.groupmembers {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.member {
		width: 9vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		img {
			width: 6em;
		}
	}

	.name {
		margin: 0.5em;
	}
</style>

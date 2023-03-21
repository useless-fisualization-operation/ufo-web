<div class="about card">
	<h1 class="title">About</h1>
	<div class="projectdesc">
		<h2>Project Description</h2>
		<p>
			Have you ever wondered about extraterrestial activity on earth? Or do you think it's all made
			up and imagined? Or are you still torn between the two? Either way, the Useless Fisualization
			Operation was made for you! Our objective was to allow exploring reports of UFO sightings in
			the USA and uncover underlying patterns.
		</p>
		<p>
			With the help of our interactive map you can investigate the locations of UFO sightings,
			filter them, and get detailed reports on demand as well as images if available. By including
			other data such as airport locations, you can decide for yourself if you think the two might
			be correlated. Relationships with further datasets can be explored via a scatterplot, where
			you can filter by years, in case you want to match the time frames of the two datasets.
		</p>
		<p>
			To further incorporate the temporal dimension of the data, we have a heatmap showing the
			frequency of UFO sightings per date. Come see for yourself, we hope your time here is out of
			this world.
		</p>
		<p class="disclaimer">
			Please note that we make no claims on the validity of the reports or the relationships with
			other data, we merely wanted to create a framework for easy and fun exploration.
		</p>
	</div>
	<div class="team">
		<h2>Team</h2>
		<div class="groupmembers">
			<div class="member">
				<img src="albin.png" />
				<p class="name">Albin Kempe</p>
				<p class="role">Front-End Developer <br /> UX/UI Designer</p>
			</div>
			<div class="member">
				<img src="annika.png" />
				<p class="name">Annika Oehri</p>
				<p class="role">Data Engineer <br /> Front-End Developer</p>
			</div>
			<div class="member">
				<img src="frawa.png" />
				<p class="name">Frawa Vetterli</p>
				<p class="role">Data Engineer <br />Front-End Developer <br /> UX/UI Designer</p>
			</div>
			<div class="member">
				<img src="jonathan.jpeg" />
				<p class="name">Jonathan Cilli</p>
				<p class="role">Data Engineer <br /> Front-End Developer <br /> UX/UI Designer</p>
			</div>
			<div class="member">
				<img src="pedro.jpeg" />
				<p class="name">Pedro Burgos</p>
				<p class="role">Front-End Developer <br /> UX/UI Designer</p>
			</div>
		</div>
	</div>
	<div class="data">
		<h2>Data</h2>
		<p>
			The main data on UFO sightings was scraped from the NATIONAL UFO Reporting Center Online
			Database NUFORC [1] on 3th February 2023. We took all fields except for the image links and
			the date of the sighting from the summary, whereas we accessed the report itself to get the
			image and the complete date. We geolocated our datapoints and discarded all sightings whose
			location we could not pinpoint. For the scatter plot and the heatmap, all dates not following
			the month/day/year convention were discarded.
		</p>
		<p>
			A paper by Plaza del Olmo [2] states that their is a sublineal relationship between UFO
			sightings and population density. Based on that, we decided to incorporate absolute population
			and population density data from the United Sates Census Bureau [3] into our visualization.
			The data includes a time dimension with steps of decades, going from 1910 to 2020. It was
			preprocessed by deleting all "regions" datapoints (e.g. midwest) and only keeping columns
			"state", "resident population" and "population density" where the latter is given as number of
			residents per square mile. For the scatterplot, the average between all decades was taken. For
			calculating the number of UFO sightings per person, state and year, we used the interpolated
			values for years originally not in the dataset.
		</p>
		<p>
			Furthermore, a paper by Irwin [4] describes that their might be some relationship between UFO
			sightings and religiosity, although not a proportional one. Therefore, we chose to include a
			dataset on religiosity from 2014 [5] which contains the percentage of people that find
			religion very important, somewhat important, not too important, not at all important and don't
			know how important. Preprocessing was done by changing &#60 1% to 0 and changing percentages
			to proportions in general (eg. 77% to 0.77).
		</p>
		<p>
			During discussions with other students, they said that they would also be interested in a
			visualization of the relationship between UFO sightings and drug use which is why different
			drug use metrics are also included from the Substance Abuse and Mental Health Services
			Administration's National Survey on Drug Use and Health (NSDUH) from 2021 [6]. The metrics
			include Illicit Drug Use in the Past Month, Marijuana Use in the Past Month, Illicit Drug Use
			Other Than Marijuana in the Past Month, Binge Alcohol Use in the Past Month, Illicit Drug Use
			Disorder in the Past Year, Serious Mental Illness in the Past Year and Any Mental Illness in
			the Past Year. All data is from people of age 18 or older and show the proportion of people
			which the specific metric holds for.
		</p>
		<p>
			For all these datasets additional to the UFO dataset, we changed state names to state
			abbreviations to create consistent keys.
		</p>
		<p>
			Because planes are listed as often confused with UFOs [7], we chose to include airport
			locations, too. Our US-airport data [8] comes from October 2020. This dataset was preprocessed
			by simply keeping the columns name, type, latitude_deg, longitude_deg and state, where state
			was derived from the column iso_region. We deleted obvious duplicate datapoints and datapoints
			where the latitude or longitude were obviously outside of US territory, e.g. 0.
		</p>
		<p>
			The source code and the used datasets can be found on GitHub [9]. In this project, we learnt
			to collaborate with each other and discuss our thoughts and improvements suggestions on our
			visualization. The presentations in the class taught us how to defend and justify our design
			choices and helped us get valuable feedback to improve our work further. The user study helped
			us see the perspective of people without computer science or visualization background.
		</p>
		<div class="sources">
			<p>[1] <a href="https://nuforc.org/databank/">https://nuforc.org/databank/</a></p>
			<p>
				[2] Plaza del Olmo, Julio. (2015). A Review on the Relation between Population Density and
				UFO Sightings. Journal of Scientific Exploration, Vol. 29, No. 3, pp. 425-448. <a
					href="https://www.scientificexploration.org/docs/29/jse_29_3_PlazadelOlmo.pdf"
					>https://www.scientificexploration.org/docs/29/jse_29_3_PlazadelOlmo.pdf</a
				>
			</p>
			<p>
				[3] <a
					href="https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature"
					>https://www.census.gov/data/tables/time-series/dec/density-data-text.html</a
				>
			</p>
			<p>
				[4] Irwin, Harvey. (1993). Belief in the Paranormal: A Review of the Empirical Literature.
				Journal of American Society for Psychical Research. 87. <a
					href="https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature"
					>https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature</a
				>
			</p>
			<p>
				[5] <a
					href="https://www.pewresearch.org/religion/religious-landscape-study/compare/importance-of-religion-in-ones-life/by/state/"
					>https://www.pewresearch.org/religion/religious-landscape-study/compare/importance-of-religion-in-ones-life/by/state/</a
				>
			</p>
			<p>
				[6] <a href="https://www.samhsa.gov/data/report/2021-nsduh-state-prevalence-estimates"
					>https://www.samhsa.gov/data/report/2021-nsduh-state-prevalence-estimates</a
				>
			</p>
			<p>
				[7] <a href="https://www.livescience.com/32849-7-ways-to-generate-a-great-space-hoax.html"
					>https://www.livescience.com/32849-7-ways-to-generate-a-great-space-hoax.html</a
				>
			</p>
			<p>
				[8] <a href="https://data.world/ourairports/989444cc-447b-4030-a866-57fcd6c2d3ee"
					>https://data.world/ourairports/989444cc-447b-4030-a866-57fcd6c2d3ee</a
				>
			</p>
			<p>
				[9] <a href="https://github.com/useless-fisualization-operation"
					>https://github.com/useless-fisualization-operation</a
				>
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.about {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: hidden;
		overflow-y: scroll;
		height: 80vh;
	}

	h1 {
		font-size: 140%;
		margin-bottom: 0.5em;
	}

	h2 {
		color: var(--accent);
		font-weight: bold;
		margin-bottom: 0.8em;
	}

	.team {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1em;
	}

	.data p,
	.projectdesc p {
		font-size: 85%;
		margin-bottom: 1.4em;
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

	.sources {
		text-align: left !important;
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
			border-radius: 100%;
			height: 8em;
			width: 8em;
		}
	}

	.disclaimer {
		background-color: rgb(255, 133, 133);
		border-radius: 0.5em;
		padding: 0.5em;
		font-weight: bold;
		width: 82%;
		margin: 0.2em;
	}

	.name {
		margin: 0.5em;
	}
</style>

<template>
	<div id="app">
		<img alt="Vue logo"
			src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<div class="grid">

			<BarChart chartId="chart"
					title="Chart"
					:chart_data="chart" />
			<BarChart chartId="chart2"
					title="Chart 2"
					:chart_data="chart" />
		</div>
	</div>
</template>

<script>
	import HelloWorld from "SRC/components/HelloWorld.vue";
	import BarChart from "SRC/components/BarChart.vue";

	export default {
		name: "App",
		components: {
			HelloWorld,
			BarChart
		},
		data(){
			return {
				chart: {
                    datasets: [
                        {
                            data: [208,55,145,364,15,289],
                            label: 'Clicks'
                        }
                    ],
                    labels: ['Stat 1', 'Stat 2', 'Stat 3', 'Stat 4', 'Stat 5', 'Stat 6']
                },
				chart2: {
                    datasets: [
                        {
                            data: [23208,355,145,3645,555,2896],
                            label: 'Clicks'
                        }
                    ],
                    labels: ['Stat 1', 'Stat 2', 'Stat 3', 'Stat 4', 'Stat 5', 'Stat 6']
                },
			}
		}
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	
	.print-page-break-avoid {
		break-before: avoid-page;
		
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
</style>

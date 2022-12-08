<template>
	<div>
		<p class="mb-3 text-center"
			v-if="title"><strong>{{title}}</strong></p>
		<!-- DO NOT EDIT THIS CHART HTML. This template is overriding the VueChart.js extended template tag. Changing this section could break it. -->
		<div
			:styles="styles"
			:class="cssClasses">
			<canvas :id="chartId"
				ref="canvas"
				:height="height"
				:width="width"
				:alt="`${title} chart.`">
			</canvas>
		</div>


	</div>
</template>

<script>
	import { Bar } from "vue-chartjs";

	import { cloneDeep } from "lodash-es";

	export default {
		extends: Bar,
		props: {
			chart_data: {
				type: Object,
				required: true,
			},
			chartId: {
				type: String,
				required: true,
			},

			title: {
				type: String,
				required: false,
			},
			format: {
				type: String,
			},
		},
		data() {
			return {
				data_set_style: {
					backgroundColor: [
						"#FD6282", //magenta
						"#9D4CBF", //purple
						"#368aeb", //blue
						"#37d4bf", // teal
						"#87c93c", //green
						"#f5eb3b", //yellow
						"#a6a6a6", // medium grey
						"#faafbe", //light-magenta
						"#e5baf7", //light purple
						"#cceaff", //light blue
						"#d2fcf7", // light teal
						"#e5fcca", // light green
						"#faf7be", // light yellow
						"#e8e8e8", // light grey
					],
				},
				cloned_chart_data: {},
				print_version_src: "",
				legend_data: {},				
			}
		},		
		methods: {
			beforePrintResizeCharts() {
				const CHART_CANVAS = document.getElementById(this.chartId);
				const CANVAS_PARENT = CHART_CANVAS.parentElement;
				const CANVAS_DATA_URL = CHART_CANVAS.toDataURL();

				let printable_image = document.createElement("IMG");

				printable_image.id = `${this.chartId}_image_copy`;
				printable_image.src = CANVAS_DATA_URL;
				printable_image.style.width = "100%";
				printable_image.style.height = "auto";

				CHART_CANVAS.style.display = "none";
				CANVAS_PARENT.append(printable_image);
			},
			afterPrintResizeCharts() {
				const CHART_CANVAS = document.getElementById(this.chartId);
				const printable_image = document.getElementById(this.chartId + "_image_copy");
				printable_image.parentNode.removeChild(printable_image);
				CHART_CANVAS.style.display = "block";
			},			
			sortDataHightoLow(labels, data_set) {
				//map data into an object so that the label reference the same data value
				//remember datasets.data object is in the same order as the chart_data.labels array order, same with color

				//this associates a label, the data, a color
				let merged_data = labels.map((current_label, index) => {
					return {
						label: current_label,
						data: data_set[index],
					};
				});

				//sorting array based on data amount

				if (this.sort) {
					merged_data.sort((a, b) => {
						if (a.data < b.data) {
							return 1;
						}
						if (a.data > b.data) {
							return -1;
						}
						return 0;
					});
				}

				//create return objects
				let return_labels = [];
				let return_data = [];
				let return_colors = [];

				merged_data.forEach((data) => {
					return_labels.push(data.label);
					return_data.push(data.data);
					return_colors.push(data.backgroundColor);
				});

				return { labels: return_labels, data: return_data };
			},	
			createChartOptions() {
				return {
					responsive: true,
					maintainAspectRatio: false,
					title: { display: this.chart_title ? true : false, text: this.chart_title },
					scales: {
						xAxes: [
							{
								ticks: {
									reverse: false,
									beginAtZero: true,
									callback: () => {
										return "";
									},
								},
								gridLines: {
									display: false,
								},
							},
						],
						yAxes: [
							{
								ticks: {
									fontSize: 12,
									reverse: false,
									beginAtZero: true,
									callback: (value) => {
										//will change what the ticks will say
										let new_value = value;

										if (typeof value === "number") {
											if (value.toString().includes(".")) {
												new_value = value.toFixed(1);
											} else {
												new_value = value.toString();
											}
										}

										if (new_value.includes(".")) {
											value = new_value;
										}

										if (new_value.length >= 7) {
											value = new_value.slice(0, -6) + "M";
										} else if (new_value.length >= 4) {
											value = new_value.slice(0, -3) + "K";
										}

										return value;
									},
								},
							},
						],
					},
					legend: {
						display: false,
						position: "bottom",
						labels: {
							color: "rgb(255, 99, 132)",
							boxWidth: 13,
							boxHeight: 8,
							font: {
								weight: 600,
							},
						},
					},
					tooltips: {
						enabled: true,
						callbacks: {
							title: (tooltipItem, data) => {
								return data.labels[tooltipItem[0].index];
							},
							label: (tooltipItem, data) => {
								const tooltip_data_value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
								const tooltip_data_label = data.datasets[tooltipItem.datasetIndex].label
									? data.datasets[tooltipItem.datasetIndex].label
									: tooltipItem.label;
		

		

								return (
									tooltip_data_value +
									" " +
									tooltip_data_label
								);
							},
						},
					},
				};
			},
		},
		created() {
			this.cloned_chart_data = cloneDeep(this.chart_data);

			//sorting highest to lowest
			//if part the chart is part of a series we need to map the background colors along with label and data values
			if (this.cloned_chart_data.datasets.length == 1) {
				let sort_results = this.sortDataHightoLow(
					this.cloned_chart_data.labels,
					this.cloned_chart_data.datasets[0].data,
					this.data_set_style.backgroundColor
				);

				//reassigning chart values based on order
				this.cloned_chart_data.labels = sort_results.labels;
				this.cloned_chart_data.datasets[0].data = sort_results.data;
				this.data_set_style.backgroundColor = sort_results.backgroundColor;
			}
		},
		mounted() {
			let final_chart_options;
			let final_chart_data = {};

			//may need a way to customize chart options
			final_chart_options = this.createChartOptions();

			this.cloned_chart_data.datasets.forEach((set) => {

					Object.assign(set, this.data_set_style); //this is the default colors
			
			});

			final_chart_data = this.cloned_chart_data;

			this.renderChart(final_chart_data, final_chart_options);

			window.addEventListener("beforeprint", this.beforePrintResizeCharts);
			window.addEventListener("afterprint", this.afterPrintResizeCharts);
		},		
	};
</script>
<style scoped>
	.print-only {display: none;}
	@media print {
		.print-only {display: block!important;}
		.dont-print {display: none!important;}
	}
</style>
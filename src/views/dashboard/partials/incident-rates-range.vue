<template>
    <div class="row grid-margin">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">{{title}}</h4>

                    <div class="d-flex">
                        <!-- <div class="btn-group mr-2">
                            <button class="btn btn-warning text-white"><i class="mdi mdi-printer"></i></button>
                        </div> -->
                         <div class="d-flex mr-5">
                            <div class="mr-3" v-for="(type, index) in incidentTypes"
                                :key="index">
                                <check-box
                                :label="type.name"
                                :initialValue="type.id"
                                v-model="incidentTypesIds">
                            </check-box>
                            </div>
                        </div>

                        <div class="btn-group ml-auto mr-2 border-0 d-none d-md-block">
                            <input type="text" ref="date_range:range" class="form-control" placeholder="Search Here">
                        </div>
                        <div class="btn-group">
                            <button @click="getData" class="btn btn-sm btn-primary"><i class="mdi mdi-magnify"></i> Query</button>
                        </div>



                        <div class="btn-group ml-auto mr-2 border-0 d-none d-md-block select2-wrapper">
                            <select ref="chart_type" class="form-control select-2">
                                <option value="stackedArea">Area Chart</option>
                                <option value="stackedBar">Bar Chart</option>
                                <option value="stackedColumn">Column Chart</option>
                                <option value="line">Line Chart</option>
                                <option value="spline">Spline Chart</option>
                            </select>
                        </div>
                    </div>

                   <div class="row mt-5">
                       <div class="col-md-12">
                          <div id="rates-graph"  v-show="incidentTypesIds.length" style="height: 400px; width: 100%;"></div>
                            <p v-if="!incidentTypesIds.length" class="text-center mb-5 mt-5">
                                No data to display
                            </p>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import datepicker from './../../../mixins/datepicker';
import { mapActions, mapGetters } from 'vuex';

export default {
    mixins: [datepicker],

    data() {
        return {
            title: 'Incidents Analytics & Trends',
            data: [],
            range: '',
            chartType: 'stackedArea',
            graphPoints: [],
            incidentTypesIds: []
        }
    },

    computed: {
        ...mapGetters({
            incidentTypes: 'Incidents/getTypes'
        }),

        crime() {
            return this.incidentTypes.filter(type => {
                return [
                    'wanted',
                    'theft',
                    'vandalism'
                ].indexOf(type.name.toLowerCase()) > -1
            }).map(item => item.id);
        },

        dataPoints() {
            return this.data.map(item => {
                return {
                    label: item.name,
                    y: item.count
                }
            })
        }
    },

    methods: {
        ...mapActions({
            getIncidentRates: 'Dashboards/getIncidentRates'
        }),

        /**
         * Gets crime data and draws the graph
         *
         * @returns {Undefined}
         */
        getData() {
            let params = this.getDates();
            this.range = params.range;

            params.incident_type_ids = this.incidentTypesIds || [];

           this.getIncidentRates(params)
           .then(response => {
               this.data = response;
               this.drawGraph();
           }).catch(error => {
           })
        },

        /**
         * Transforms the data into graph points for plotting
         *
         * @returns {Undefined}
         */
        setupPoints() {
            this.graphPoints = [];
            let points = {};

            for(let key in this.data) {
                let row = this.data[key];

                row.forEach(item => {
                    if (!points[item.name]) {
                        points[item.name] = []
                    }

                    points[item.name].push({
                        label: key,
                        y: item.incidents_count
                    })
                })
            }

            for (let key in points) {
                this.graphPoints.push({
                    type: this.chartType,
                    showInLegend: true,
                    name: key,
                    dataPoints: points[key]
                });
            }
        },

        /**
         * Plots the graph data
         *
         * @return {Undefine}
         */
        drawGraph() {
            this.setupPoints();
            if (!this.graphPoints.length) {
                return;
            }

            var chart = new CanvasJS.Chart('rates-graph', {
                colorSet: "chartColors",
                exportEnabled: false,
                animationEnabled: true,
                theme: "theme4",
                dataPointMaxWidth: 50,
                title:{
                    text: "Rates within " + this.range,
                    fontColor: "grey",
                    fontSize: 18
                },
                legend :{
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    fontSize: 15,
                },
                data: this.graphPoints
            });

            chart.render();
        },

        onChartTypeChange(event) {
            this.chartType = event.target.value;
            this.drawGraph();
        },

        registerEventListeners() {
            $(this.$refs.chart_type).on('change', this.onChartTypeChange);
        }
    },

    watch: {
        incidentTypesIds() {
            this.getData();

            let found = true;

            if (this.incidentTypesIds.length == 3) {
                this.crime.forEach(item => {
                    if (this.incidentTypesIds.indexOf(item) > -1) {
                        found = found && true;
                    } else {
                        found = found && false;
                    }
                })
            } else {
                found = false;
            }

            if (found) {
                this.title = 'Crime Analytics & Trends';
                return;
            }

            if (this.incidentTypesIds.length == 1) {
                let type = this.incidentTypes.find(item => item.id == this.incidentTypesIds[0]);
                this.title = type.name + ' Analytics & Trends';
                return;
            }

            this.title = 'Incidents Analytics & Trends';
        }
    },

    created() {
        this.incidentTypes.forEach(item => {
            this.incidentTypesIds.push(item.id);
        });
    },

    mounted() {
        this.setupDatepickers();
        this.getData();
        this.registerEventListeners();
    }
}
</script>

<style>
button[state="menu"]{
    background: #7689FB;
    border: none;
    outline: none;

    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
}
</style>

<template>
    <div class="row grid-margin">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Incidents and their occurances</h4>

                    <div class="d-flex">
                        <div class="btn-group mr-2">
                            <button class="btn btn-warning text-white"><i class="mdi mdi-printer"></i></button>
                        </div>

                        <div class="btn-group ml-auto mr-2 border-0 d-none d-md-block">
                            <input type="text" ref="date_range:range" class="form-control" placeholder="Search Here">
                        </div>
                        <div class="btn-group">
                            <button @click="getData" class="btn btn-sm btn-primary"><i class="mdi mdi-magnify"></i> Query</button>
                        </div>

                        <div class="btn-group ml-auto mr-2 border-0 d-none d-md-block select2-wrapper">
                            <select ref="chart_type" class="form-control select-2">
                                <option value="pie">Pie Chart</option>
                                <option value="column">Column Chart</option>
                                <option value="line">Line Chart</option>
                                <option value="bar">Bar Chart</option>
                                <option value="area">Area Chart</option>
                                <option value="radar">Radar Chart</option>
                            </select>
                        </div>
                    </div>

                   <div class="row mt-5">
                       <div class="col-md-5">
                            <div class="table-responsive mt-2" v-if="data.length">
                                <table class="table mt-3 border-top">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Incident</th>
                                            <th>Occurance</th>
                                            <th>Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(entry, index) in data" :key="index">
                                            <td>{{ index + 1}}</td>
                                            <td>{{ entry.name }}</td>
                                            <td>{{ entry.count }}</td>
                                            <td>{{entry.rate}} %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                       </div>
                       <div class="col-md-7">
                          <div id="chartContainer" style="height: 400px; width: 100%;" v-show="data.length"></div>
                       </div>
                   </div>
                   <p class="text-center" v-if="!data.length">No Incident recorded for this range {{range}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import datepicker from './../../../mixins/datepicker';
import { mapActions } from 'vuex';

export default {
    mixins: [datepicker],

    data() {
        return {
            data: [],
            range: '',
            chartType: 'pie'
        }
    },

    computed: {
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
            getIncidentTypesData: 'Dashboards/getIncidentTypesData'
        }),

        /**
         * Gets crime data and draws the graph
         *
         * @returns {Undefined}
         */
        getData() {
            let params = this.getDates();
            this.range = params.range;

           this.getIncidentTypesData(params)
           .then(response => {
               let total = 0;

               response.forEach(item => {
                   total += item.count;
               });

               this.data = response.map(item => {
                   return {
                       ...item,
                       rate: Number(item.count / total * 100).toFixed(2)
                   }
               }).sort((a, b) => b.count - a.count);

               this.drawGraph();

            //    console.log(this.data);
           }).catch(error => {
               console.log(error)
           })
        },

        drawGraph() {
            var chart = new CanvasJS.Chart("chartContainer", {
                colorSet: "chartColors",
                exportEnabled: true,
                animationEnabled: true,
                theme: "theme4",
                dataPointMaxWidth: 50,
                title:{
                    text: 'Various types of incidents within ' + this.range,
                    fontColor: "grey",
                    fontSize: 18
                },
                legend :{
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    fontSize: 15,
                },

                axisY:{
                    suffix: " %"
                },

                data: [
                    {
                        type: this.chartType,
                        dataPoints: this.dataPoints
                    }
                ],
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

<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Recent Incidents (Top 5)</h4>
            <div class="">
                <div class="form-group select2-wrapper">
                    <select class="form-control select-2" ref="incident_type">
                        <option value="all">All</option>
                        <option v-for="(type, index) in incidentTypes" :key="index" :value="type.id">{{type.name}}</option>
                    </select>
                </div>
            </div>
            <ul class="bullet-line-list">
                <li v-for="(entry, index) in data" :key="index" style="border-bottom:1px solid #F3F3F3;margin-bottom:10px;">
                    <h6>{{ entry.title | trim }}</h6>
                    <p class="mb-0"> {{ entry.description | trim }} </p>
                    <p class="text-muted">
                        <i class="mdi mdi-clock-outline"></i>
                        {{ `${dateFromNow(entry.created_at)}, recorded by ${entry.creator ? entry.creator.name : ''}` }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            data: []
        }
    },

    computed: {
        ...mapGetters({
            incidentTypes: 'Incidents/getTypes'
        })
    },

    methods: {
        ...mapActions({
            getRecentIncidents: 'Dashboards/getRecentIncidents'
        }),

        getData(incident_type = 'all') {
            this.getRecentIncidents({
                incident_type
            })
            .then(response => {
                this.data = response;
            }).catch(error => {
                console.log(response);
            });
        },

        dateFromNow(date) {
            date = moment(date);
            let now = moment();

            let difference = now.diff(date, 'days');

            let type = 'days';

            if (difference == 0) {
                difference = now.diff(date, 'hours');
                type = 'hours';

                if (difference == 0) {
                    difference = now.diff(date, 'minutes');
                    type = 'minutes';

                    if (difference == 0) {
                        difference = now.diff(date, 'seconds');
                        type = 'seconds';
                    }
                }
            }

            return `${difference} ${type} ago`;
        },

        onIncidentTypeChange(event) {
            this.getData(event.target.value);
        },

        registerEventListeners() {
            $(this.$refs.incident_type).on('change', this.onIncidentTypeChange)
        }
    },

    mounted() {
        this.getData();
        this.registerEventListeners();
    }
}
</script>

<style>

</style>

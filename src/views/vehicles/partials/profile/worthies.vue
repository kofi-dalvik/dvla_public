<template>
    <div class="insurance" >
        <div class="card" style="box-shadow:none;">
           <div class="card-body">
                <h4 class="card-title mb-5">
                    Road Worthiness
                    <div class="float-right">
                        <router-link :to="{name: 'create_insurance', query: {vehicle_id: vehicleId}}" tag="button" class="btn btn-success btn-sm mr-2">
                            <i class="mdi mdi-refresh"></i> Re-Inspect
                        </router-link>
                       <a :href="pdfUrl" target="_blank" class="btn btn-primary btn-sm"><i class="mdi mdi-printer"></i> Print</a>
                    </div>
                </h4>
                <worthy-table :worthies="currentWorthies" :past="pastWorthies" :summary="true"></worthy-table>

                <p class="text-center" v-if="!currentWorthies.length">No road worthy available for this vehicle</p>
           </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import Config from '../../../../../config';
import WorthyTable from './../../../road-worthies/Table';

export default {
    components: {
        WorthyTable
    },

    props: ['vehicle'],

    computed: {
        pdfUrl() {
            return `${Config[process.env.NODE_ENV].apiUrl}/pdfs/road_worthy?vehicle_id=${this.vehicleId}`
        },

        vehicleId() {
            if (this.vehicle) {
                return this.vehicle.id;
            }
            return null;
        },

        currentWorthies() {
            if (this.vehicle) {
                return this.vehicle.current_road_worthies;
            }
            return []
        },

        pastWorthies() {
            if (this.vehicle) {
                return this.vehicle.past_road_worthies;
            }
            return []
        }
    },

    methods: {
        /**
         * Tells the difference in days
         *
         * @param {String} end_date
         * @returns {String}
         */
        expiresIn(end_date) {
            let now = moment();
            let date = moment(end_date);
            let difference = date.diff(now, 'days');
            let type = 'day(s)'

            if (difference == 0) {
                difference = date.diff(now, 'hours');
                type = 'hour(s)';

                if (difference == 0) {
                    difference = date.diff(now, 'minutes');
                    type = 'minute(s)';

                    if (difference == 0) {
                        difference = date.diff(now, 'seconds');
                        type = 'second(s)';
                    }
                }
            }

            difference = Math.abs(difference);

            if (this.hasExpired(end_date)) {
                return `Expired ${difference} ${type} ago`;
            } else {
                return `Expires in ${difference} ${type} time`;
            }
        },

        hasExpired(date) {
            let now = moment();
            date = moment(date);

            if (date.diff(now, 'seconds') < 0) {
                return true;
            }

            return false;
        }
    },

    mounted() {
        // console.log(this.insurances)
    }
}
</script>

<style lang="scss">
.actions{
    a{
        text-decoration: none;
    }
}
</style>

<template>
    <div class="insurance" >
        <div class="card" style="box-shadow:none;">
           <div class="card-body">
                <h4 class="card-title mb-5">
                    Insurances
                    <div class="float-right">
                        <router-link :to="{name: 'create_insurance', query: {vehicle_id: vehicleId}}" tag="button" class="btn btn-success btn-sm mr-2">
                            <i class="mdi mdi-refresh"></i> Renew
                        </router-link>
                       <a :href="pdfUrl" target="_blank" class="btn btn-primary btn-sm"><i class="mdi mdi-printer"></i> Print</a>
                    </div>
                </h4>
                <ul class="bullet-line-list mt-4">
                    <li class="mt-2 mb-2" v-for="(insurance, index) in insurances" :key="index">
                        <h6>
                            <div class="badge badge-pill mr-2"
                                    :class="{
                                        'badge-outline-success': !hasExpired(insurance.expires_at),
                                        'badge-outline-danger': hasExpired(insurance.expires_at),
                                    }">
                                {{ hasExpired(insurance.expires_at) ? 'Expired' : 'Active' }}
                            </div>
                            {{insurance.type.name}}</h6>
                        <p class="mb-0">
                            Issued by {{ `${insurance.issuer.name}` }}
                            <br>
                            <b :class="{'text-danger': hasExpired(insurance.expires_at)}">{{expiresIn(insurance.expires_at)}}</b>
                        </p>
                        <p class="text-muted">
                            <i class="mdi mdi-clock-outline"></i>
                            Starts: {{ insurance.starts_at | formattedDate }},
                            Ends: {{ insurance.expires_at | formattedDate }}
                        </p>
                    </li>
                </ul>

                <p class="text-center" v-if="!insurances.length">No insurance available for this vehicle</p>
           </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import Config from '../../../../../config';

export default {
    props: {
        insurances: {
            type: Array,
            default: () => []
        },
        vehicleId: {
            type: [Number, String]
        }
    },

    computed: {
        pdfUrl() {
            return `${Config[process.env.NODE_ENV].apiUrl}/pdfs/insurance?vehicle_id=${this.vehicleId}`
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

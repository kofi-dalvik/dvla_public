<template>
    <table class="table dataTable table-striped no-footer table-responsive" role="grid">
        <thead>
            <tr role="row">
                <!-- <th>Created On</th> -->
                <th>Starts At</th>
                <th>Expires At</th>
                <th>Expires In</th>
                <th>Beneficiary</th>
                <th>Type</th>
                <th>Issuer</th>
                <th>Vehicle</th>
                <th>Issued At</th>
                <th>Status</th>
                <!-- <th></th> -->
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr
                tag="tr"
                role="row"
                v-for="(insurance, index) in insurances"
                :key="index">

                <!-- <td>{{ insurance.created_at | formattedDate }}</td> -->
                <td>{{ insurance.starts_at | formattedDate }}</td>
                <td>{{ insurance.expires_at | formattedDate }}</td>
                <td>{{ expiresIn(insurance.expires_at) }}</td>
                <td>{{ insurance.beneficiary_name}}</td>
                <td>{{ insurance.type.name}}</td>
                <td>{{ insurance.issuer.name}}</td>
                <td>{{ insurance.vehicle | vehicleName }}</td>
                <td>{{ insurance.created_at | formattedDate }}</td>
                <td>
                    <span
                        :class="{
                            'badge': true,
                            'badge-danger': hasExpired(insurance.expires_at),
                            'badge-success': !hasExpired(insurance.expires_at)
                        }">
                        {{ hasExpired(insurance.expires_at) ? 'Expired' : 'Active' }}
                    </span>
                </td>

                <td>
                     <button v-if="hasExpired(insurance.expires_at)" tag="button" :to="{name: 'change_insurance_owner', query: {insurance_id: insurance.id}}" class="btn btn-success btn-action mr-3">
                        <i class="mdi mdi-refresh"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    props: ['insurances', 'summary'],

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
            let type = 'days'

            if (difference == 0) {
                difference = date.diff(now, 'hours');
                type = 'hours';

                if (difference == 0) {
                    difference = date.diff(now, 'minutes');
                    type = 'minutes';

                    if (difference == 0) {
                        difference = date.diff(now, 'seconds');
                        type = 'seconds';
                    }
                }
            }

            difference = Math.abs(difference);

            if (this.hasExpired(end_date)) {
                return `Expired ${difference} ${type} ago`;
            } else {
                return `${difference} ${type} time`;
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
    }
}
</script>
<style lang="scss">
.hoverable{
    cursor: pointer;
    &:hover{
        background: #7973F9 !important;
        color: white;
    }
}
</style>

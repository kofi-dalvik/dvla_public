<template>
   <div>
    <table class="table table-striped no-footer mb-5" v-if="worthies.length">
        <thead>
            <tr role="row">
                <th>Inspection Date</th>
                <th>Next Inspection Date</th>
                <th v-if="!summary">Chasis Number</th>
                <th v-if="!summary">Registration Number</th>
                <th>Sticker</th>
                <th>Amount Paid</th>
                <th>Receipt Number</th>
                <th>Issuer</th>
                <th>Status</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr
                role="row"
                v-for="(worthy, index) in worthies"
                :key="index">
                <td>{{ worthy.inspection_date | formattedDate }}</td>
                <td>{{ worthy.next_inspection_date | formattedDate }}</td>
                <td v-if="!summary">{{ worthy.vehicle.chasis_number}}</td>
                <td v-if="!summary">{{ worthy.vehicle.registration_number}}</td>
                <td>{{ worthy.sticker}}</td>
                <td>{{ worthy.amount_paid}}</td>
                <td>{{ worthy.receipt_no }}</td>
                <td>{{ worthy.issuer.name }}</td>
                <td>
                    <span
                        :class="{
                            'badge': true,
                            'badge-danger': hasExpired(worthy.next_inspection_date),
                            'badge-success': !hasExpired(worthy.next_inspection_date)
                        }">
                        {{ hasExpired(worthy.next_inspection_date) ? 'Expired' : 'Active' }}
                    </span>
                </td>

                <td>
                     <router-link
                        v-if="hasExpired(worthy.next_inspection_date)"
                        tag="button"
                        :to="{name: 'create_road_worthy', query: {vehicle_id: worthy.vehicle_id}}"
                        class="btn btn-success btn-action mr-3">
                        <i class="mdi mdi-refresh"></i>
                     </router-link>
                </td>
            </tr>
        </tbody>
    </table>

    <h5 class="text-center text-danger mt-5 mb-3" v-if="past.length">Past Inspections</h5>
    <table class="table table-striped no-footer mb-5" v-if="past.length">
        <tbody>
            <tr
                role="row"
                v-for="(worthy, index) in past"
                :key="index">
                <td>{{ worthy.inspection_date | formattedDate }}</td>
                <td>{{ worthy.next_inspection_date | formattedDate }}</td>
                <td v-if="!summary">{{ worthy.vehicle.chasis_number}}</td>
                <td v-if="!summary">{{ worthy.vehicle.registration_number}}</td>
                <td>{{ worthy.sticker}}</td>
                <td>{{ worthy.amount_paid}}</td>
                <td>{{ worthy.receipt_no }}</td>
                <td>{{ worthy.issuer.name }}</td>
                <td>
                    <span
                        :class="{
                            'badge': true,
                            'badge-danger': hasExpired(worthy.next_inspection_date),
                            'badge-success': !hasExpired(worthy.next_inspection_date)
                        }">
                        {{ hasExpired(worthy.next_inspection_date) ? 'Expired' : 'Active' }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
   </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    props: ['worthies', 'past', 'summary'],

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

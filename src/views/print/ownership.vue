<template>
    <div class="card" id="ownership-print">
        <div class="card-body">
            <h2 class="card-title mb-5 text-center">Ownership Report for {{vehicle | vehicleName }}</h2>
            <hr>
            <div class="d-flex justify-content-between mb-5 mt-5">
                <div class="d-flex flex-row flex-wrap">
                    <img v-if="!vehicle.image" src="https://via.placeholder.com/92x92" class="img-lg rounded" alt="profile image">
                    <img v-else :src="vehicle.image" class="img-lg rounded" alt="profile image">
                    <div class="ml-3">
                        <h6>{{vehicle | vehicleName }}</h6>
                        <p class="text-muted text-info">Reg. Number: {{ vehicle.registration_number }}</p>
                        <p class="mt-2 text-primary font-weight-bold">
                            Chasis: {{ vehicle.chasis_number }}
                        </p>
                    </div>
                </div>

                <div class="d-flex flex-row flex-wrap">
                    <div>
                        <h6>{{ currentOwner.name }}</h6>
                        <p class="text-muted">{{currentOwner.email}}</p>
                        <p class="mt-2 text-success font-weight-bold">Current Owner</p>
                    </div>
                    <img v-if="!currentOwner.image" src="https://via.placeholder.com/92x92" class="img-lg rounded ml-3" alt="profile image">
                    <img v-else :src="currentOwner.image" class="img-lg rounded ml-3" alt="profile image">
                </div>
            </div>

            <hr>

            <div class="table-responsive mt-5">
            <table class="table">
                <thead>
                <tr>
                    <th>Owner</th>
                    <th>Previous Owner</th>
                    <th>Started On</th>
                    <th>Ended On</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(entry, index) in data" :key="index">
                        <td class="py-1">
                            <img v-if="entry.owner && entry.owner.image" :src="entry.owner.image" class="mr-3" alt="image">
                            <img v-else src="https://via.placeholder.com/36x36" class="mr-3" alt="image">
                            <span>{{ entry.owner ? entry.owner.name : '' }}</span>
                        </td>
                        <td class="py-1">
                            <template v-if="entry.previous_owner">
                                <img v-if="entry.previous_owner && entry.previous_owner.image" :src="entry.previous_owner.image" class="mr-3" alt="image">
                                <img v-else src="https://via.placeholder.com/36x36" class="mr-3" alt="image">
                                <span>{{ entry.previous_owner ? entry.previous_owner.name : '' }}</span>
                            </template>
                            <template v-else>
                                <span>N/A</span>
                            </template>
                        </td>
                        <!-- <td></td> -->
                        <td>{{ entry.started_on | formattedDate }}</td>
                        <td>{{ entry.ended_on | formattedDate }}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <p class="text-center text-muted mt-5">
                Copyright @ 2019
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['vehicle', 'data'],

    computed: {
        vehicleChunk() {
            return this.chunkArray(this.vehicleInfo, 4);
        },

        /**
         * Get current owner for vehicle
         *
         * @returns {Array}
         */
        currentOwner() {
            if (this.vehicle) {
                return this.vehicle.owners[0];
            }

            return {};
        }
    },

    mounted() {
        // console.log(this.vehicleArray)
    }
}
</script>

<style lang="scss">
#ownership-print{
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #dddddd;
    // display: none;
}
</style>

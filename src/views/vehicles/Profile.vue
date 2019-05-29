<template>
    <div class="card">
    <div class="card-body">
        <div class="row">
        <div class="col-lg-4">
            <div class="border-bottom text-center pb-4">
            <img style="object-fit:cover;" :src="vehicle.image" alt="profile" class="img-lg rounded-circle mb-3">
            <!-- <p>Bureau Oberhaeuser is a design bureau focused on Information- and Interface Design. </p> -->
            </div>

            <h5 class="mt-5 d-flex justify-content-between">
                <span>Vehicle Details</span>
                <span> {{vehicle.colour}} </span>
            </h5>
            <div class="py-4">
                <p class="clearfix" v-for="(info, index) in vehicleInfo" :key="index">
                    <span class="float-left"> {{info.name}} </span>
                    <span class="float-right text-muted"> {{info.value}} </span>
                </p>
            </div>

            <h5 class="mt-3">Owner Details</h5>
            <div class="py-4">
                <p class="clearfix">
                    <span class="float-left"> Name </span>
                    <span class="float-right text-muted"> {{currentOwner.name}} </span>
                </p>
                <p class="clearfix">
                    <span class="float-left"> Email </span>
                    <span class="float-right text-muted"> {{currentOwner.email}} </span>
                </p>
                <p class="clearfix">
                    <span class="float-left"> Contact </span>
                    <span class="float-right text-muted"> {{currentOwner.contact}} </span>
                </p>
                <p class="clearfix">
                    <span class="float-left"> Postal Address </span>
                    <span class="float-right text-muted"> {{currentOwner.postal_address}} </span>
                </p>
                <p class="clearfix">
                    <span class="float-left"> Residential Address </span>
                    <span class="float-right text-muted"> {{currentOwner.residential_address}} </span>
                </p>
            </div>
        </div>

        <div class="col-lg-8">
            <div class="d-flex justify-content-between">
            <div>
                <h3>{{vehicleName}}</h3>
                <div class="d-flex align-items-center">
                    <h5 class="mb-0 mr-2 text-muted">{{vehicle.country ? vehicle.country.name : 'N/A'}}</h5>
                </div>
            </div>
            <div>
                <!-- <div class="input-group input-group-sm">
                    <input type="text" class="form-control" placeholder="filter by date range">
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-primary" type="button">
                            <i class="mdi mdi-refresh"></i>
                        </button>
                    </div>
                </div> -->
            </div>
            </div>
            <div class="mt-4 py-2 border-top border-bottom">
            <ul class="nav profile-navbar">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="currentpage = 'incidence'" :class="{'active': currentpage == 'incidence'}">
                        <i class="mdi mdi-newspaper"></i>
                        Incidence
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="currentpage = 'ownership'" :class="{'active': currentpage == 'ownership'}">
                        <i class="mdi mdi-account-outline"></i>
                        Ownership
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="currentpage = 'insurance'" :class="{'active': currentpage == 'insurance'}">
                        <i class="mdi mdi-account-box-outline"></i>
                        Insurance
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="currentpage = 'road_worthy'" :class="{'active': currentpage == 'road_worthy'}">
                        <i class="mdi mdi-file-document"></i>
                        Road Worthy
                    </a>
                </li>
            </ul>
            </div>
            <div class="profile-feed" v-if="vehicle.id">

            <incidence
                v-show="currentpage == 'incidence'"
                :vehicle="vehicle">
            </incidence>

            <ownership
                v-show="currentpage == 'ownership'"
                :vehicle="vehicle"
                :vehicleInfo="vehicleInfo"
                :vehicleId="vehicle_id">
            </ownership>

            <insurance
                v-show="currentpage == 'insurance'"
                :insurances="vehicle.insurances"
                :vehicleId="vehicle_id"></insurance>

            <worthies
                v-show="currentpage == 'road_worthy'"
                :vehicle="vehicle"></worthies>

            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Incidence from './partials/profile/incidence.vue';
import Ownership from './partials/profile/ownership.vue';
import Insurance from './partials/profile/insurance.vue';
import Worthies from './partials/profile/worthies.vue';

export default {
    props: {
        vehicle_id: {
            type: [String, Number]
        }
    },

    components: {
        Incidence,
        Ownership,
        Insurance,
        Worthies
    },

    data () {
        return {
            vehicle: {
                owners: []
            },
            incidences: [],
            currentpage: 'incidence'
        }
    },

    computed: {
        ...mapGetters({
            isPolice: 'Auth/isPolice',
            isInsurance: 'Auth/isInsurance',
            isDvla: 'Auth/isDvla'
        }),

        /**
         * Concatenates the model, make and year to produce the name of the vehicle
         *
         * @returns {String}
         */
        vehicleName () {
            let name = '';
            if (this.vehicle.model) {
                name = this.vehicle.model.name;

                if (this.vehicle.model.make) {
                    name = `${this.vehicle.model.make.name} ${name} (${this.vehicle.year}), ${this.vehicle.type} ${
                        this.vehicle.registration_number.toUpperCase()}`
                }
            }

            return name;
        },

        /**
         * Finds the current owner of this vehicle
         *
         * @returns {Object}
         */
        currentOwner () {
            if (this.vehicle.owners && this.vehicle.owners.length) {
                return this.vehicle.owners[0];
            } else {
                return {};
            }
        },

        /**
         * Prepares the props of this vehicle in an array format
         *
         * @returns {Array}
         */
        vehicleInfo () {
            let result = [];
            let exclude = [
                'id', 'country', 'created_by', 'created_at', 'creator', 'image', 'model',
                'insurances', 'owners', 'updated_at', 'past_road_worthies', 'current_road_worthies'
            ];

            if (Object.keys(this.vehicle)) {
                for (let key in this.vehicle) {
                    if (exclude.indexOf(key) < 0 && !key.includes('id')) {
                        if (this.vehicle[key]) {
                            result.push({
                                name: key.toTitleCase(),
                                value: this.vehicle[key]
                            })
                        }
                    }
                }

                /**
                 * Sort by lenght of key
                 */
                result.sort((a, b) => {
                    return a.name.length - b.name.length
                });
            }

            return result;
        }
    },

    // watch: {
    //     vehicle () {
    //         console.log(this.vehicleInfo);
    //     }
    // },

    methods: {
        ...mapActions({
            show: 'Vehicles/show'
        })
    },

    mounted () {
        this.show(this.vehicle_id).then(response => {
            this.vehicle = response;
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>

<style>

</style>

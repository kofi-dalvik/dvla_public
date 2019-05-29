<template>
    <div class="public-directory">

        <div class="row justify-content-center">
            <div class="col-11 col-md-8">

                <div class="logo d-flex justify-content-center mb-5 mt-5">
                    <img src="../../assets/dvla-logo.jpg">
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <h2 class="text-center mb-5" style="color:grey;">Drivers & Vehicles Directory</h2>

                        <div class="form-group">
                            <input v-model="params.keyword" type="text" class="form-control" placeholder="Enter keyword to search Vehicle or Driver details">
                            <button @click="search" type="button" class="btn btn-primary">
                                <i class="mdi mdi-magnify"></i>
                            </button>
                        </div>

                        <div class="mr-5 ml-5 d-flex justify-content-between">
                            <a
                                href="#"
                                :class="{'hidden': currentTab == 'all'}"
                                @click.prevent="currentTab = 'all'"
                                class="text-primary">
                                <i class="mdi mdi-backburger"></i>
                            </a>
                            <p class="text-primary">Enter keyword to fully search for vehicles or drivers</p>
                            <a
                                href="#"
                                :class="{'hidden': !params.keyword}"
                                @click.prevent="clearSearch"
                                class="text-primary">
                                <i class="mdi mdi-close"></i>
                            </a>
                        </div>

                        <div class="d-flex justify-content-center mt-5">
                            <p style="color:grey;" v-if="emptyResult === true">
                                Your search returned nothing
                            </p>
                        </div>

                       <template v-if="currentTab == 'all'">
                            <div class="search-results mt-3" v-if="vehicles.all.length">

                                <div class="card v-card">
                                    <div class="card-body">
                                        <h4 class="card-title">Vehicles</h4>

                                        <div
                                            class="d-flex align-items-center pb-3 border-bottom item"
                                            v-for="(vehicle, index) in vehicles.all" :key="index"
                                            @click="getVehicle(vehicle.id)">
                                            <img class="img-sm rounded-circle" :src="vehicle.image" alt="vehicle image">
                                            <div class="ml-3">
                                                <h6 class="mb-1">{{ vehicle | vehicleName }}</h6>
                                                <small class="text-muted mb-0"><i class="mdi mdi-map-marker mr-1"></i>
                                                    {{ vehicle.country ? vehicle.country.name : 'N/A' }}
                                                </small>
                                            </div>
                                            <i class="mdi mdi-check-circle-outline font-weight-bold ml-auto px-1 py-1 text-info mdi-24px"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center mt-4">
                                    <app-pagination @navigate="search" :small="true" v-if="params.paginate" :pageDetails="vehicles.pageDetails"/>
                                </div>
                            </div>

                            <div class="search-results mt-3" v-if="owners.all.length">

                                <div class="card v-card">
                                    <div class="card-body">
                                        <h4 class="card-title">Owners</h4>

                                        <div
                                            class="d-flex align-items-center pb-3 border-bottom item"
                                            v-for="(owner, index) in owners.all" :key="index">
                                            <img class="img-sm rounded-circle" :src="owner.image" alt="owner image">
                                            <div class="ml-3">
                                                <h6 class="mb-1">{{ `${owner.name}` }}</h6>
                                                <small class="text-muted mb-0"><i class="mdi mdi-car mr-1"></i>
                                                    {{
                                                        owner.vehicles && owner.vehicles.length ?
                                                        `Chasis Number (VIN): ${owner.vehicles[0].chasis_number}, Reg No: ${owner.vehicles[0].registration_number}` :
                                                        `Currently has no vehicle`
                                                    }}
                                                </small>
                                            </div>
                                            <i class="mdi mdi-account-circle font-weight-bold ml-auto px-1 py-1 text-info mdi-24px"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center mt-4">
                                    <app-pagination @navigate="search" :small="true" v-if="params.paginate" :pageDetails="owners.pageDetails"/>
                                </div>
                            </div>
                       </template>

                       <template v-if="currentTab == 'vehicle' && vehicleData">
                            <div class="card v-card">
                                <div class="card-body">
                                    <h4 class="card-title">Vehicle Summary</h4>

                                    <div class="d-flex align-items-center py-3">
                                        <img class="img-sm rounded-circle" :src="vehicleData.image" alt="profile">
                                        <div class="ml-3">
                                            <h6 class="mb-1">
                                                {{ vehicleData | vehicleName }}
                                            </h6>
                                            <small class="text-muted mb-0"><i class="mdi mdi-map-marker mr-1"></i>
                                                {{vehicleData.country ? vehicleData.country.name: vehicleData.use}}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td class="py-1"><b>Use</b></td>
                                                    <td>{{vehicleData.use}}</td>
                                                </tr>
                                                <tr>
                                                    <td class="py-1"><b>Type</b></td>
                                                    <td>{{vehicleData.type}}</td>
                                                </tr>
                                                <tr>
                                                    <td class="py-1"><b>Fuel Type</b></td>
                                                    <td>{{vehicleData.fuel_type}}</td>
                                                </tr>
                                                <tr>
                                                    <td class="py-1"><b>Chasis Number</b></td>
                                                    <td>{{vehicleData.chasis_number}}</td>
                                                </tr>
                                                <tr>
                                                    <td class="py-1"><b>Registration Number</b></td>
                                                    <td>{{vehicleData.registration_number}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            <div class="card v-card">
                                <div class="card-body">
                                    <h4 class="card-title">Road Worthy</h4>

                                    <div
                                        class="alert"
                                        v-if="roadWorthy"
                                        :class="{
                                            'alert-danger': hasExpired(roadWorthy.next_inspection_date),
                                            'alert-success': !hasExpired(roadWorthy.next_inspection_date)
                                        }"
                                        role="alert">
                                        {{vehicleData.registration_number}}
                                        <span v-if="hasExpired(roadWorthy.next_inspection_date)">is not road worthy</span>
                                        <span v-if="!hasExpired(roadWorthy.next_inspection_date)">is road worthy</span>
                                    </div>
                                    <div class="alert alert-danger" v-else>
                                        {{ vehicleData.registration_number }} is not road worthy
                                    </div>

                                     <table class="table" v-if="roadWorthy">
                                        <tbody>
                                            <tr>
                                                <td class="py-1"><b>Last Inspection Date</b></td>
                                                <td>{{roadWorthy.inspection_date | formattedDate}}</td>
                                            </tr>
                                            <tr>
                                                <td class="py-1"><b>Next Inspection Date</b></td>
                                                <td>{{roadWorthy.next_inspection_date | formattedDate}}</td>
                                            </tr>
                                            <tr>
                                                <td class="py-1"><b>Sticker</b></td>
                                                <td>{{roadWorthy.sticker}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="card v-card">
                                <div class="card-body">
                                    <h4 class="card-title">Insurance</h4>
                                    <ul class="bullet-line-list mt-4" v-if="vehicleData.insurances.length">
                                        <li class="mt-2 mb-2" v-for="(insurance, index1) in vehicleData.insurances.slice(0, 3)" :key="index1">
                                            <!-- {{ insurance }} -->
                                            <h6>
                                                <div class="badge badge-pill mr-2"
                                                        :class="{
                                                            'badge-outline-success': !hasExpired(insurance.expires_at),
                                                            'badge-outline-danger': hasExpired(insurance.expires_at),
                                                        }">
                                                    {{ hasExpired(insurance.expires_at) ? 'Expired' : 'Active' }}
                                                </div>
                                                {{insurance.type.name}}
                                            </h6>
                                            <p class="mb-0">
                                                <b :class="{'text-danger': hasExpired(insurance.expires_at)}">{{expiresIn(insurance.expires_at)}}</b>
                                            </p>
                                        </li>
                                    </ul>
                                    <h5 class="text-danger" v-else>This vehicle has no insurance</h5>
                                </div>
                            </div>

                            <div class="card v-card">
                                <div class="card-body">
                                    <h4 class="card-title">Recent Incidents</h4>
                                    <ul class="bullet-line-list">
                                        <li v-for="(incident, index) in vehicleData.incidents.slice(0, 3)" :key="index">
                                            <h6>
                                                <div class="badge badge-pill mr-2"
                                                :class="{
                                                            'badge-primary': incident.status.name == 'New',
                                                            'badge-warning': incident.status.name == 'Pending',
                                                            'badge-danger': incident.status.name == 'Open',
                                                            'badge-success': incident.status.name == 'Closed'
                                                        }">
                                                    {{ incident.status.name }}
                                                </div>
                                                {{ incident.title | trimSmall }}
                                            </h6>
                                            <p class="mb-0">{{ incident.description | trimLong }}</p>
                                            <p class="text-muted">
                                                <i class="mdi mdi-clock-outline"></i>
                                                Reported on {{ incident.created_at | formattedDateTime }}
                                            </p>
                                            <p class="text-muted">
                                                <i class="mdi mdi-clock-outline"></i>
                                                Status last updated on {{ incident.updated_at | formattedDateTime }}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="card v-card">
                                <div class="card-body">
                                    <h4 class="card-title">Recent Owners</h4>
                                    <ul class="bullet-line-list">
                                        <li v-for="(owner, index) in vehicleData.owners.slice(0, 3)" :key="index">
                                            <h6>
                                                {{owner.name}}
                                                <span class="text-primary" v-if="!index">(Current Owner)</span>
                                            </h6>
                                            <p class="mb-0">
                                                {{`${owner.residential_address} (${owner.contact})`}}
                                            </p>
                                            <p class="text-muted">
                                                <i class="mdi mdi-clock-outline"></i>
                                                {{ owner.created_at | formattedDate }}
                                                <span v-if="!index">to Present</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                       </template>

                       <template v-if="currentTab == 'owner'">

                       </template>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { mapActions } from 'vuex';


export default {
    data () {
        return {
            emptyResult: null,

            currentTab: 'all',

            params: {
                keyword: ''
            },

            vehicleData: null,

            vehicles: {
                all: [],
                pageDetails: {
                    total: 0,
                    from: 0,
                    to: 0,
                    perPage: 0,
                    currentPage: 0,
                    lastPage: 0
                }
            },

            owners: {
                all: [],
                pageDetails: {
                    total: 0,
                    from: 0,
                    to: 0,
                    perPage: 0,
                    currentPage: 0,
                    lastPage: 0
                }
            }
        }
    },

    computed: {
        roadWorthy() {
            if (this.vehicleData) {
                if (this.vehicleData.current_road_worthies.length) {
                    return this.vehicleData.current_road_worthies[0];
                } else if (this.vehicleData.past_road_worthies) {
                    return this.vehicleData.past_road_worthies[0];
                } else {
                    null
                }
            }
        }
    },

    watch: {
        ['params.keyword'] () {
            this.handleSearch();
        }
    },

    methods: {
        ...mapActions({
            queryForResult: 'Directories/index',
            findVehicle: 'Directories/getVehicle'
        }),

        getVehicle (id) {
            this.findVehicle({ id }).then(response => {
                this.vehicleData = response;
                // console.log(this.vehicleData.insurances.splice(0, 3))
                this.currentTab = 'vehicle';
            }).catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        },

        getOwner (id) {

        },

        /**
         * Searches for vehicle or owner by keyword
         *
         * @return {Undefined}
         */
        search (params) {
            let payload = {
                ...this.params
            }

           if (params && params.page) {
               payload = {
                   ...this.params,
                   ...params
               }
           }

            if (this.params.keyword) {
                this.queryForResult(payload).then(response => {
                    this.currentTab = 'all';
                    this.prepareData(response, 'vehicles');
                    // this.prepareData(response.owners, 'owners')
                    // console.log(response)
                    if (!this.vehicles.all.length) {
                        this.emptyResult = true;
                    } else {
                        this.emptyResult = false;
                    }
                }).catch(error => {
                    this.notify(this.buildErrors(error), 'error');
                })
            } else {
                this.prepareData([], 'vehicles');
                this.prepareData([], 'owners');
            }
        },

        /**
         * stores the response in the component state
         *
         * @param {Object} payload
         * @param {String} type
         * @returns {Undefined}
         */
        prepareData (payload, type) {
            if (payload.data) {
                this[type].all = payload.data;
                this[type].pageDetails = {
                    total: payload.total,
                    from: payload.from,
                    to: payload.to,
                    perPage: payload.per_page,
                    currentPage: payload.current_page,
                    lastPage: payload.last_page
                };
            } else {
                this[type].all = payload;
                this[type].pageDetails = {
                    total: 0,
                    from: 0,
                    to: 0,
                    perPage: 0,
                    currentPage: 0,
                    lastPage: 0
                };
            }
        },

        /**
         * Automatically performs search
         * Uses lodash debounce method
         *
         * @return {Undefined}
         */
        handleSearch: _.debounce(function (params) {
            this.search();
        }, 1000),

        /**
         * Resets the state to default
         */
        clearSearch() {
            this.params = {
                paginate: true,
                per_page: 5,
                keyword: ''
            }

            this.vehicles = {
                all: [],
                pageDetails: {
                    total: 0,
                    from: 0,
                    to: 0,
                    perPage: 0,
                    currentPage: 0,
                    lastPage: 0
                }
            },

            this.owners = {
                all: [],
                pageDetails: {
                    total: 0,
                    from: 0,
                    to: 0,
                    perPage: 0,
                    currentPage: 0,
                    lastPage: 0
                }
            }

            this.vehicleData = null;

            this.currentTab = 'all';
        },

         hasExpired(date) {
            let now = moment();
            date = moment(date);

            if (date.diff(now, 'seconds') < 0) {
                return true;
            }

            return false;
        },

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
    }
}
</script>

<style lang="scss" scoped>
.public-directory{
    min-height: 100vh;
    min-width: 100vw;
    margin: 0 !important;

    .v-card{
        box-shadow: none;
    }

    .logo{
        height: 100px;
        width: 100%;

        img{
            height: 100px;
            width: 100px;
            border-radius: inherit;
            border-radius: 50%;
        }
    }

    .form-group{
        position: relative;
        border-radius: 50px;
        height: 50px;
        // box-shadow: 1px 1px 5px rgba(black, 0.2);
        // border: 1px solid #ddd;

        .form-control{
            height: 100%;
            width: 100%;
            border-radius: inherit;
            padding-right: 75px;
        }
        .btn{
            width: 70px;
            border-top-right-radius: inherit;
            border-bottom-right-radius: inherit;
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }

    .item{
        cursor: pointer;
        padding: 20px;

        &:hover{
            background: #eeeeee;
        }
    }

    .hidden{
        visibility: hidden;
    }
}
</style>
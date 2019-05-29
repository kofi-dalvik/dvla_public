<template>
  <div class="row justify-content-center">
      <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">CHANGE VEHICLE OWNER</h4>

                    <form id="example-form" action="#">

                        <div role="application" class="wizard clearfix" id="steps-uid-0">
                            <div class="steps clearfix">
                                <ul style="display:flex;justify-content:center;" role="tablist">

                                    <li class="disabled" :class="{'current': currentStep == 1}">
                                        <a href="javascript:void(0)">
                                            <span class="current-info audible">current step: </span>
                                            <span class="number">1.</span>
                                                Vehicle
                                        </a>
                                    </li>
                                    <li class="disabled" :class="{'current': currentStep == 2}">
                                        <a href="javascript:void(0)">
                                            <span class="number">2.</span> New Owner
                                        </a>
                                    </li>
                                    <li class="disabled" :class="{'current': currentStep == 3}">
                                        <a href="javascript:void(0)">
                                            <span class="number">3.</span> Finalize Change
                                        </a>
                                    </li>
                                </ul>

                            </div>

                            <div style="padding:50px;" v-show="currentStep == 1">
                                <template v-if="!vehicleId">
                                    <p class="text-center">Search for vehicle to change ownership</p><br>
                                    <label>Vehicle Chasis Number</label>
                                    <div class="form-group d-flex mb-5">
                                        <input type="text" v-model="registration_number" class="form-control search" placeholder="Enter Vehicle Chasis Number">
                                        <button type="button" @click.prevent="searchVehicle" class="btn btn-primary search">Search <i class="mdi mdi-search"></i></button>
                                    </div>
                                </template>

                                <div class="row justity-content-center" v-if="!loading && vehicle.id">

                                    <div class="col-md-4">
                                        <div class="card v-card">
                                            <div class="card-body">
                                                <h4 class="card-title">Vehicle Summary</h4>

                                                <div class="d-flex align-items-center py-3">
                                                    <img class="img-sm rounded-circle" :src="vehicle.image" alt="profile">
                                                    <div class="ml-3">
                                                        <h6 class="mb-1">
                                                            {{ vehicleName }}
                                                        </h6>
                                                        <small class="text-muted mb-0"><i class="mdi mdi-map-marker mr-1"></i>
                                                            {{vehicle.country ? vehicle.country.name: vehicle.use}}
                                                        </small>
                                                    </div>
                                                    <router-link :to="{name: 'vehicle_profile', params: {vehicle_id: vehicle.id}}" href="#" class="font-weight-bold ml-auto px-1 py-1 text-primary">
                                                        <i class="mdi mdi-eye mdi-24px"></i>
                                                    </router-link>
                                                </div>

                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <tbody>
                                                            <tr>
                                                                <td class="py-1">Use</td>
                                                                <td>{{vehicle.use}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="py-1">Type</td>
                                                                <td>{{vehicle.type}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="py-1">Fuel Type</td>
                                                                <td>{{vehicle.fuel_type}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="py-1">Chasis Number</td>
                                                                <td>{{vehicle.chasis_number}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="py-1">Registration Number</td>
                                                                <td>{{vehicle.registration_number}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="card v-card">
                                            <div class="card-body">
                                                <h4 class="card-title">Recent Owners</h4>
                                                <ul class="bullet-line-list">
                                                    <li v-for="(owner, index) in vehicle.owners.slice(0, 3)" :key="index">
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
                                    </div>

                                    <div class="col-md-4">
                                        <div class="card v-card">
                                            <div class="card-body">
                                                <h4 class="card-title">Recent Incidents</h4>
                                                <ul class="bullet-line-list">
                                                    <li v-for="(incident, index) in vehicle.incidents.slice(0, 3)" :key="index">
                                                        <h6>
                                                            <div class="badge badge-pill mr-2"
                                                            :class="{
                                                                        'badge-outline-primary': incident.status.name == 'New',
                                                                        'badge-outline-warning': incident.status.name == 'Pending',
                                                                        'badge-outline-danger': incident.status.name == 'Open',
                                                                        'badge-outline-success': incident.status.name == 'Closed'
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
                                    </div>

                                </div>

                                <h5 class="text-center" v-if="notfound">The Vehicle You Searched For Is Not Found</h5>
                            </div>

                             <div style="padding:50px;" v-show="currentStep == 2">

                                <manage-owner
                                    @onSelectedOwner="selectOwner"
                                    @onTabChange="switchTab"
                                    @onDoneValidating="onStepValidationComplete"
                                    @onPreviewImage="(event) => previewImageUrl = event"

                                    :shouldValidate="shouldValidate"
                                    :currentOwner="currentOwner"
                                />


                            </div>

                             <div style="padding:50px;" v-show="currentStep == 3">
                                 <h5 class="text-center mb-3">
                                     Finalize Change Of Ownership From
                                     <span class="text-warning">{{currentOwner.name}}</span>
                                      to
                                    <span class="text-primary" v-if="selectedOwner && currentTab == 'existing'">{{selectedOwner.name}}</span>
                                    <span class="text-primary" v-else>{{newOwner.name}}</span>

                                </h5>
                                 <vehicle-table :vehicles="[vehicle]" v-if="vehicle.id" class="mt-5"></vehicle-table>
                                 <div class="mb-5" style="width:100%;height:1px;"></div>

                                 <div class="row justify-content-center mb-4">
                                     <div class="col-md-5">
                                        <div class="form-group">
                                            <p class="text-center">Specify the official date for this change (This is absolutely optional, it will default to now)</p>
                                            <input v-model="newOwner.ended_on" type="date" name="date" class="form-control">
                                        </div>
                                     </div>
                                 </div>

                               <div class="row">
                                   <div class="col-md-5">
                                       <div class="card v-card">
                                            <div class="card-body">
                                                <div class="mb-4 text-center">
                                                    <img :src="currentOwner.image" class="img-lg rounded-circle mb-2" alt="profile image">
                                                    <h4 class="text-warning">{{currentOwner.name}}</h4>
                                                    <p class="text-muted mb-0">Current Owner</p>
                                                </div>
                                                <div class="mt-4 card-text">
                                                    <p class="d-flex justify-content-between">
                                                        <b>Residential Address:</b> <span>{{currentOwner.residential_address}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Postal Address:</b> <span>{{currentOwner.postal_address}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Email:</b> <span>{{currentOwner.email}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Contact:</b> <span>{{currentOwner.contact}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                                   <div class="col-md-2">
                                       <div class="d-flex flex-column justify-content-center align-items-center text-success" style="height:100%;">
                                           <i class="mdi mdi-transfer" style="font-size: 100px;"></i>
                                       </div>
                                   </div>
                                   <div class="col-md-5">
                                       <div class="card v-card">
                                            <div class="card-body" v-if="selectedOwner && currentTab == 'existing'">
                                                <div class="mb-4 text-center">
                                                    <img :src="selectedOwner.image" class="img-lg rounded-circle mb-2" alt="profile image">
                                                    <h4 class="text-primary">{{selectedOwner.name}}</h4>
                                                    <p class="text-muted mb-0">New Owner</p>
                                                </div>
                                                <div class="mt-4 card-text">
                                                    <p class="d-flex justify-content-between">
                                                        <b>Residential Address:</b> <span>{{selectedOwner.residential_address}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Postal Address:</b> <span>{{selectedOwner.postal_address}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Email:</b> <span>{{selectedOwner.email}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Contact:</b> <span>{{selectedOwner.contact}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="card-body" v-else>
                                                <div class="mb-4 text-center">
                                                    <img
                                                        :src="previewImageUrl"
                                                        class="img-lg rounded-circle mb-2"
                                                        alt="profile image">
                                                    <h4 class="text-primary">{{newOwner.name}}</h4>
                                                    <p class="text-muted mb-0">New Owner</p>
                                                </div>
                                                <div class="mt-4 card-text">
                                                    <p class="d-flex justify-content-between">
                                                        <b>Residential Address:</b> <span>{{newOwner.residential_address}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Postal Address:</b> <span>{{newOwner.postal_address}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Email:</b> <span>{{newOwner.email}}</span>
                                                    </p>
                                                    <p class="d-flex justify-content-between">
                                                        <b>Contact:</b> <span>{{newOwner.contact}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                   </div>
                               </div>

                            </div>

                            <div class="flip-square-loader mx-auto" v-if="loading"></div>

                            <div class="actions clearfix">
                                <ul class="d-flex justify-content-between">
                                    <li :class="{'disabled': currentStep == 1}">
                                        <a href="javascript:void(0)" role="menuitem" @click="prevStep">Previous</a>
                                    </li>
                                    <li v-if="currentStep < totalSteps">
                                        <a href="javascript:void(0)" role="menuitem" @click="nextStep">Next</a>
                                    </li>
                                    <li v-if="totalSteps == currentStep">
                                        <a @click="submit" class="btn btn-success" href="javascript:void(0)">Confirm Transfer</a>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    </form>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import VehicleTable from './Table.vue';
import ManageOwner from './partials/manageOwner.vue';


export default {
    components: {
        VehicleTable,
        ManageOwner
    },

    data () {
        return {
            totalSteps: 3,
            currentStep: 1,
            loading: false,
            registration_number: '',

            vehicle: {
                model: {}
            },

            newOwner: {
                name: '',
                email: '',
                image: '',
                contact: '',
                place_of_work: '',
                postal_address: '',
                transfer_letter: '',
                residential_address: '',
                ended_on: ''
            },

            currentTab: 'existing',

            selectedOwner: null,

            shouldValidate: false,

            previewImageUrl: 'https://via.placeholder.com/200',

            notfound: false,
        }
    },

    computed: {
        /**
         * Returns the current owner of the vehicle
         *
         * @return {Object}
         */
        currentOwner() {
            return this.vehicle.owners && this.vehicle.owners.length ? this.vehicle.owners[0] : {}
        },

        /**
         * Determines if vehicle id is already set
         *
         * @returns {Number}
         */
        vehicleId () {
            return this.$route.query.vehicle_id;
        },

        /**
         * Determines if owner id is set
         *
         * @return {Number}
         */
        ownerId () {
            return this.$route.query.owner_id;
        },

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
                    name = `${this.vehicle.model.make.name} ${name} (${this.vehicle.year})`
                }
            }

            return name;
        },
    },

    methods: {
        ...mapActions({
            getVehicle: 'Vehicles/getVehicles',
            show: 'Vehicles/show',
            changeOwnerShip: 'Vehicles/changeOwnerShip',
            changeExistingOwnership: 'Vehicles/changeExistingOwnership',
        }),

        /**
         * On Done validating
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        onStepValidationComplete (event) {
            console.log(event)
            this.shouldValidate = false;

            if (this.currentTab == 'existing') {
                this.selectedOwner = event.payload;
            } else {
                this.newOwner = event.payload;
            }

            if (event.valid && !event.silent) {
                this.mvNextStep();
            }
        },

        /**
         * Sets the selected owner
         *
         * @param {Object} owner
         * @return {Undefined}
         */
        selectOwner (owner) {
            this.selectedOwner = owner;
        },

        /**
         * Sets the current tab
         *
         * @param {String} tab
         * @returns {Undefined}
         */
        switchTab (tab) {
            this.currentTab = tab;
        },

        /**
         * Processes the change of ownership
         *
         * @return {Undefined}
         */
        submit () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.createChangeOwnership();
                } else {
                    this.notify('Please provide all fields for the new owner, including the transfer letter', 'error');
                }
            })
        },

        /**
         * Notifies completion and navigates to listing page
         *
         * @returns {Undefined}
         */
        completeOwnershipChange() {
            this.notify('Change ownership completed');
            this.$router.push({name: 'all_vehicles'});
        },

        createChangeOwnership() {
            if (this.currentTab == 'existing') {
                //making existing call
                let data = this.parseToFormData({
                    vehicle_id: this.vehicle.id,
                    ended_on: this.newOwner.ended_on,
                    current_owner_id: this.currentOwner.id,
                    new_owner_id: this.selectedOwner ? this.selectedOwner.id : null,
                    transfer_letter: this.selectedOwner ? this.selectedOwner.transfer_letter : null
                });

                this.changeExistingOwnership(data).then(response => {
                    // console.log(response)
                    // return;
                    this.completeOwnershipChange();
                }).catch(error => {
                    this.notify(this.buildErrors(error), 'error');
                });
            } else {
                let data = this.parseToFormData({
                     ...this.newOwner,
                    vehicle_id: this.vehicle.id,
                    current_owner_id: this.currentOwner.id
                })

                 this.changeOwnerShip(data).then(response => {
                    // console.log(response);
                    this.completeOwnershipChange();
                }).catch(error => {
                    this.notify(this.buildErrors(error), 'error');
                    this.notify(this.buildErrors(error), 'error')
                });
            }
        },

        /**
         * Searches for vehicle by registration number
         *
         * @returns {Undefined}
         */
        searchVehicle() {
            /**
             * clear current vehicle data
             */
            this.vehicle = {model: {}};
            this.loading = true;
            this.notfound = false;

            /**
             * Get vehicle by registration number
             */
            this.getVehicle({ chasis_number: this.registration_number }, true).then(response => {
                this.setVehicle(response);
                this.notfound = !response.length
                this.loading = false;
            }).catch(error => {
                this.notfound = true;
                this.loading = false;
                this.notify(this.buildErrors(error), 'error')
            })
        },

        /**
         * Moves the multistep to previous step
         *
         * @returns {Undefined}
         */
        prevStep () {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        /**
         * Moves to next step
         * Validates if next step is the final step
         *
         * @returns {Undefined}
         */
        nextStep () {
            if (this.currentStep == 2) {
                this.shouldValidate = true;
            } else {
                this.mvNextStep();
            }
        },

        mvNextStep() {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
            }
        },

        /**
         * Sets vehicle property
         *
         * @param {Array} response
         * @returns {Undefined}
         */
        setVehicle (response) {
            if (response && response.length) {
                this.vehicle = response[0];
            }
        },

        /**
         * Parses data into form data
         *
         * @param {Object} data
         * @returns {Object}
         */
        parseToFormData (data) {
            let formData = new FormData();

            for (let key in data) {
                if (data[key]) {
                    formData.append(key, data[key]);
                } else {
                    formData.append(key, '');
                }
            }

            return formData;
        }
    },

    mounted () {
        if (this.vehicleId) {
            this.loading = true;
            // setTimeout(() => {
                this.show(this.vehicleId).then(response => {
                console.log({...response});
                this.vehicle = response;
                this.loading = false;
                // console.log(this.vehicle);
            }).catch(error => {
                this.loading = false;
                this.notfound = true;
                this.notify(this.buildErrors(error), 'error')
            })
            // }, 5000);
        }
    }
}
</script>

<style lang="scss">
.card-text{
    line-height: 30px;
}

.form-control{
    border-color: #dddddd;
}

.bullet-line-list{
    padding-left: 30px !important;
}

.v-card{
    box-shadow: none;
    border: 1px solid #dddddd;
    background: transparent !important;
    min-height: 100%;

    .py-1{
        font-weight: 450;
    }
}

input.search{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
button.search{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.app-tab-content{
    padding: 40px;
    border: 1px solid transparent;
    border-color: transparent #F2F1F8 #F2F1F8 #F2F1F8;
}
.bg-white{
    background: white !important;
    border-bottom-color: transparent;
}

.owner-row{
    &.active{
        background: #7571F9 !important;
        color: white;

        .btn{
            opacity: 1;
        }
    }
    .btn{
        // visibility: hidden;
        opacity: 0.3;
        // color: white;
    }
    &:hover{

        .btn{
            // visibility: visible;
            opacity: 1;
        }
    }
}
</style>

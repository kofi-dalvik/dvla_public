<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">
                {{ vehicleId ? 'Renew' : 'New' }} Insurance</h4>
            <p class="card-description">
                Create a new Insurance
            </p>
           <div class="row justify-content-center">
                <div class="col-md-6" v-if="vehicle">
                   <div class="card v-card" >
                        <div class="card-body">
                            <h4 class="card-title">Vehicle Summary</h4>

                            <div class="d-flex align-items-center py-3">
                                <img class="img-sm rounded-circle" :src="vehicle.image" alt="profile">
                                <div class="ml-3">
                                    <h6 class="mb-1">
                                        {{ vehicle | vehicleName }}
                                    </h6>
                                    <small class="text-muted mb-0"><i class="mdi mdi-map-marker mr-1"></i>
                                        {{vehicle.country ? vehicle.country.name: vehicle.use}}
                                    </small>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(info, index) in vehicleInfo" :key="index">
                                            <td class="py-1">{{info.name}}</td>
                                            <td>{{info.value}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
               </div>

               <div class="col-md-6">
                    <form @submit.prevent="submit" class="forms-sample">
                        <div v-if="!vehicleId" class="form-group" :class="{'has-danger': errors.has('registration_number')}">
                            <label>Enter Vehicle Chasis number to search vehicle</label>
                            <div class="input-group">
                                <input type="search" class="form-control" v-validate="'required'" v-model="registration_number" name="registration_number" placeholder="Vehicle chasis number" aria-label="registration_number">
                                <div class="input-group-append">
                                    <button @click="getVehicle" class="btn btn-sm btn-primary" type="button">Search</button>
                                </div>
                            </div>
                            <error-label :message="errors.first('registration_number')"></error-label>
                        </div>


                        <div class="form-group select2-wrapper">
                            <label>Insurance Type</label>
                            <select class="form-control select-2"
                                name="insurance_type"
                                ref="insurance_type"
                                data-placeholder="Filter by Insurance Types">
                                <option value=" "></option>
                                <option
                                    v-for="(type, index) in insuranceTypes"
                                    :key="index"
                                    :value="type.id">{{type.name}}</option>
                            </select>
                        </div>

                        <div class="form-group" :class="{'has-danger': errors.has('beneficiary_name')}">
                            <label>Beneficiary name</label>
                            <input type="text" class="form-control" v-validate="'required'" name="beneficiary_name" v-model="insurance.beneficiary_name" placeholder="Beneficiary name">
                            <error-label :message="errors.first('beneficiary_name')"></error-label>
                        </div>

                        <div class="form-group" :class="{'has-danger': errors.has('starts_at')}">
                            <label>Starts At</label>
                            <input type="date" class="form-control" v-validate="'required'"  name="starts_at" v-model="insurance.starts_at" placeholder="Start date">
                            <error-label :message="errors.first('starts_at')"></error-label>
                        </div>

                        <div class="form-group" :class="{'has-danger': errors.has('expires_at')}">
                            <label>Expires At</label>
                            <input type="date" class="form-control" v-validate="'required'"  name="expires_at" v-model="insurance.expires_at" placeholder="Expiry date">
                            <error-label :message="errors.first('expires_at')"></error-label>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary mr-2">Submit</button>
                        </div>
                    </form>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return {
            registration_number: '',

            insurance: {
                starts_at: '',
                expires_at: '',
                vehicle_id: '',
                beneficiary_name: '',
                insurance_type_id: '',
            },
            vehicle: null
        }
    },

    computed: {
        ...mapGetters({
            insuranceTypes: 'InsuranceTypes/getAll'
        }),

        vehicleId () {
            return this.$route.query.vehicle_id;
        },

        /**
         * Prepares the props of this vehicle in an array format
         *
         * @returns {Array}
         */
        vehicleInfo () {
            let result = [];

            if (!this.vehicle) return result;

            let exclude = [
                'id', 'country', 'created_by', 'created_at', 'creator', 'colour', 'image', 'model',
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

    methods: {
        ...mapActions({
            show: 'Vehicles/show',
            create: 'Insurances/create',
            findVehicle: 'Vehicles/getVehicles'
        }),

        /**
         * Creates Insurance
         *
         * @returns {Undefined}
         */
        submit () {
            if (!this.vehicle) {
                this.notify('You must specify the vehicle to insure', 'error')
            } else {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.insurance.vehicle_id = this.vehicle.id;

                        this.create(this.insurance).then(response => {
                            this.notify('Insurance created successfully');
                            this.$router.push({name: 'all_insurances'});
                        }).catch(error => {
                            this.notify(this.buildErrors(error), 'error');
                        })
                    } else {
                        this.notify('Please make sure to provide all fields', 'error');
                    }
                })
            }
        },

        /**
         * Gets vehicle by registration number
         *
         * @returns {Undefined}
         */
        getVehicle() {
            this.findVehicle({
                chasis_number: this.registration_number
            }).then(response => {
                // console.log(response)
                if (!response.length) {
                    this.notify(`The vehicle with number: ${this.registration_number.toUpperCase()} does not exist`, 'error');
                    this.vehicle = null;
                } else {
                    this.vehicle = response[0];
                }
            }).catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        },

        /**
         * Binds select 2 to model
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        onTypeChange(event) {
            this.insurance.insurance_type_id = event.target.value;
        }
    },

    mounted () {
        $(this.$refs.insurance_type).on('change', this.onTypeChange);

        if (this.vehicleId) {
            this.show(this.vehicleId).then(response => {
                // console.log(response);
                this.vehicle = response;
            }).catch(error => {
                this.notify(this.buildErrors(), 'error')
            })
        }
    }
}
</script>

<style lang="scss">
.v-card{
    box-shadow: none;
    border: 1px solid #dddddd;
    background: transparent !important;
    min-height: 100%;

    .py-1{
        font-weight: 450;
    }
}
</style>

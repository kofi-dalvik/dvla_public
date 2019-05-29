<template>
  <div class="row justify-content-center">
      <div class="col-12 col-md-11">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">VEHICLE REGISTRATION PARTICULARS</h4>

                    <form id="example-form" action="#">

                        <div role="application" class="wizard clearfix" id="steps-uid-0">
                            <div class="steps clearfix">
                                <ul style="display:flex;justify-content:center;" role="tablist">

                                    <li class="disabled" :class="{'current': currentStep == 1}">
                                        <a href="javascript:void(0)" class="step-link" @click="goToStep(1)">
                                            <span class="current-info audible">current step: </span>
                                            <span class="number">1.</span>
                                                Owner Details
                                        </a>
                                    </li>
                                    <li class="disabled" :class="{'current': currentStep == 2}">
                                        <a href="javascript:void(0)" class="step-link" @click="goToStep(2)">
                                            <span class="number">2.</span> Vehicle Details
                                        </a>
                                    </li>
                                    <li class="disabled" :class="{'current': currentStep == 3}">
                                        <a href="javascript:void(0)" class="step-link" @click="goToStep(3)">
                                            <span class="number">3.</span> Vehicle Measurements
                                        </a>
                                    </li>
                                </ul>

                            </div>

                            <div style="padding:50px;" v-show="currentStep == 1">
                                <h3>Owner Details</h3>

                                <upload-image v-model="vehicle.owner_image" id="owner_image"></upload-image>

                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('owner_name')}">
                                                <label>Full Name</label>
                                                <input v-model="vehicle.name" v-validate="'required'" name="owner_name" type="text" class="form-control" placeholder="Enter Full Name here">
                                                <error-label :message="errors.first('owner_name')"></error-label>
                                            </div>
                                        </div>
                                         <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('place_of_work')}">
                                                <label>Place Of work</label>
                                                <input v-model="vehicle.place_of_work" name="place_of_work" v-validate="'required'" type="text" class="form-control" placeholder="Enter place of work">
                                                <error-label :message="errors.first('place_of_work')"></error-label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('contact')}">
                                                <label>Contact</label>
                                                <input v-model="vehicle.contact" name="contact" v-validate="'required'" type="text" class="form-control" placeholder="Enter Contact Here">
                                                <error-label :message="errors.first('contact')"></error-label>
                                            </div>
                                        </div>
                                       <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('email')}">
                                                <label>Email</label>
                                                <input v-model="vehicle.email" name="email" v-validate="'required|email'" type="text" class="form-control" placeholder="Enter email here">
                                                <error-label :message="errors.first('email')"></error-label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('postal_address')}">
                                                <label>Postal Address</label>
                                                <input v-model="vehicle.postal_address" v-validate="'required'" name="postal_address" type="text" class="form-control" placeholder="Enter Owner's Postal Address Here">
                                                <error-label :message="errors.first('postal_address')"></error-label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('residential_address')}">
                                                <label>Residential Address</label>
                                                <input v-model="vehicle.residential_address" name="residential_address" type="text" class="form-control" placeholder="Enter Owner's Residential Address Here">
                                                <error-label :message="errors.first('residential_address')"></error-label>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                             <div style="padding:50px;" v-show="currentStep == 2">
                                <h3>Vehicle Details</h3>

                                <upload-image v-model="vehicle.image" id="image"></upload-image>

                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <div class="form-group" :class="{'has-danger': errors.has('registration_number')}">
                                            <label>Registration Number</label>
                                            <input v-model="vehicle.registration_number" name="registration_number" type="text" class="form-control" placeholder="Enter Vehicle Registration Number">
                                            <error-label :message="errors.first('registration_number')"></error-label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group" :class="{'has-danger': errors.has('chasis_number')}">
                                            <label>Chasis Number</label>
                                            <input
                                                name="chasis_number"
                                                v-model="vehicle.chasis_number"
                                                v-validate="'required'"
                                                type="text" class="form-control"
                                                placeholder="Enter Chasis Number">
                                            <error-label :message="errors.first('chasis_number')"></error-label>
                                        </div>
                                    </div>
                                </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group select2-wrapper" :class="{'has-danger': !!verrors.make}">
                                                <label>Make</label>
                                                <select ref="make" class="form-control select-2" data-placeholder="Select Vehicle make">
                                                    <option value=""></option>
                                                    <option v-for="(make, index) in makes" :key="index" :value="make.id">{{make.name}}</option>
                                                </select>
                                                <error-label :message="verrors.make"></error-label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group select2-wrapper" :class="{'has-danger': !!verrors.model}">
                                                <label>Model</label>
                                                <select class="form-control select-2" ref="model">
                                                    <option value=""></option>
                                                    <option v-for="(model, index) in models" :value="model.id" :key="index">
                                                        {{model.name}}
                                                    </option>
                                                </select>
                                                <error-label :message="verrors.model"></error-label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('colour')}">
                                                <label>Color</label>
                                                <input v-model="vehicle.colour" name="colour" type="text" class="form-control" placeholder="Enter Color">
                                                <error-label :message="errors.first('colour')"/>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('type')}">
                                                <label>Type</label>
                                                <select ref="type" class="form-control select-2">
                                                    <option value=""></option>
                                                    <option value="Coupe">Coupe</option>
                                                    <option value="Convertible">Convertible</option>
                                                    <option value="Crossover">Crossover</option>
                                                    <option value="Hatchback">Hatchback</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="Sedan">Sedan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group select2-wrapper" :class="{'has-danger': errors.has('country')}">
                                                <label>Country Of Origin</label>
                                                <select name="country" ref="country" class="form-control select-2">
                                                    <option value=""></option>
                                                    <option
                                                        v-for="(country, index) in countries"
                                                        :key="index"
                                                        :value="country.id">
                                                        {{country.name}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group" :class="{'has-danger': errors.has('year')}">
                                                <label>Year Of Manufacture</label>
                                                <input v-model="vehicle.year" type="number" name="year" v-validate="'required'" class="form-control" placeholder="Enter Year of manufacture">
                                                <error-label :message="errors.first('year')"></error-label>
                                            </div>
                                        </div>
                                    </div>

                            </div>

                             <div style="padding:50px;" v-show="currentStep == 3">
                                <h3>Vehicle Measurements</h3><br><br>

                                    <div class="row">
                                        <div class="col-12 col-md-3">
                                            <div class="form-group" :class="{'has-danger': errors.has('number_of_axles')}">
                                                <label>Number of Axles</label>
                                                <input v-model="vehicle.number_of_axles" type="number" class="form-control" placeholder="Enter Number of axies">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Number Of Wheels</label>
                                                <input v-model="vehicle.number_of_wheels" type="number" class="form-control" placeholder="Enter number of wheels">
                                            </div>
                                        </div>
                                         <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Weight (kg) NVW</label>
                                                <input v-model="vehicle.net_weight" type="number" class="form-control" placeholder="Enter Weight NVW">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Weight (kg) GVW</label>
                                                <input v-model="vehicle.gross_weight" type="number" class="form-control" placeholder="Enter Weight GVW">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Perm. Capacity Load (kg)</label>
                                                <input v-model="vehicle.perm_capacity_load" type="number" class="form-control" placeholder="Enter Perm Capacity Load">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Number Of Persons</label>
                                                <input v-model="vehicle.number_of_persons" type="number" class="form-control" placeholder="Enter Number of Persons">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Engine Make</label>
                                                <input v-model="vehicle.engine_make" type="text" class="form-control" placeholder="Enter Engine make">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-3">
                                            <div class="form-group">
                                                <label>Engine Number</label>
                                                <input v-model="vehicle.engine_number" type="text" class="form-control" placeholder="Enter Engine number">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-4">
                                            <div class="form-group" :class="{'has-danger': errors.has('length')}">
                                                <label>Length</label>
                                                <input v-model="vehicle.length" type="number" name="length" class="form-control" placeholder="Enter Length">
                                                <error-label :message="errors.first('length')"></error-label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group" :class="{'has-danger': errors.first('width')}">
                                                <label>Width</label>
                                                <input v-model="vehicle.width" type="number" name="width" class="form-control" placeholder="Enter Width">
                                                <error-label :message="errors.first('width')"></error-label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group" :class="{'has-danger': errors.has('height')}">
                                                <label>Height</label>
                                                <input v-model="vehicle.height" type="number" name="height" class="form-control" placeholder="Enter height">
                                                <error-label :message="errors.first('height')"></error-label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Front Tyre Size</label>
                                                <input v-model="vehicle.front_tyre_size" type="number" class="form-control" placeholder="Enter front tyre size">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Middle Tyre Size</label>
                                                <input v-model="vehicle.middle_tyre_size" type="number" class="form-control" placeholder="Enter middle tyre size">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Rear Tyre Size</label>
                                                <input v-model="vehicle.rear_tyre_size"  type="number" class="form-control" placeholder="Enter rear tyre size">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Front Perm. Axle Load (kg)</label>
                                                <input v-model="vehicle.front_perm_axle_load" type="number" class="form-control" placeholder="Enter Front perm axle load">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Middle Perm. Axle Load (kg)</label>
                                                <input v-model="vehicle.middle_perm_axle_load" type="number" class="form-control" placeholder="Enter middle perm axle load">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Rear Perm. Axle Load (kg)</label>
                                                <input v-model="vehicle.rear_perm_axle_load" type="number" class="form-control" placeholder="Enter Rear Perm Axle load">
                                            </div>
                                        </div>
                                    </div>

                                     <div class="row">
                                        <div class="col-12 col-md-4">
                                            <div class="form-group select2-wrapper">
                                                <label>Use (Private/Commercial)</label>
                                                <select ref="use" class="form-group select-2">
                                                    <option value=""></option>
                                                    <option value="Private">Private</option>
                                                    <option value="Commercial">Commercial</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Date Of Entry</label>
                                                <input v-model="vehicle.date_of_entry" type="date" class="form-control" placeholder="Enter Date of Entry">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>No of Cylinders</label>
                                                <input v-model="vehicle.number_of_cylinders" type="number" class="form-control" placeholder="Enter Number of cyles">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Cubic Capacity</label>
                                                <input v-model="vehicle.cubic_capacity" type="text" class="form-control" placeholder="Enter CC">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Horse Power</label>
                                                <input v-model="vehicle.horse_power" type="number" class="form-control" placeholder="Enter HP">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label>Fuel</label>
                                                <select ref="fuel_type" class="form-group select-2">
                                                    <option value=""></option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Electric">Electric</option>
                                                    <option value="LPG">LPG</option>
                                                    <option value="Petrol">Petrol</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div class="actions clearfix">
                                <ul class="d-flex justify-content-between">
                                    <li :class="{'disabled': currentStep == 1}">
                                        <a href="javascript:void(0)" role="menuitem" @click="prevStep">Previous</a>
                                    </li>
                                    <li v-if="currentStep < totalSteps">
                                        <a href="javascript:void(0)" role="menuitem" @click="nextStep">Next</a>
                                    </li>
                                    <li v-if="totalSteps == currentStep">
                                        <a @click.prevent="createVehicle" class="btn btn-success" href="#" role="menuitem">Finish</a>
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
import { mapGetters, mapActions } from 'vuex';

export default {
    data () {
        return {
            totalSteps: 3,
            currentStep: 1,
            models: [],
            vehicle: {
                //owner infomation
                name: '',
                email: '',
                contact: '',
                owner_image: '',
                place_of_work: '',
                postal_address: '',
                residential_address: '',

                //vehicle information
                type: '',
                year: '',
                width: '',
                length: '',
                height: '',
                colour: '',
                model_id: '',
                fuel_type: '',
                country_id: '',
                net_weight: '',
                horse_power: '',
                engine_make: '',
                horse_power: '',
                gross_weight: '',
                chasis_number: '',
                engine_number: '',
                date_of_entry: '',
                image: '',
                cubic_capacity: '',
                front_tyre_size: '',
                rear_tyre_size: '',
                number_of_axles: '',
                number_of_wheels: '',
                middle_tyre_size: '',
                number_of_persons: '',
                perm_capacity_load: '',
                registration_number: '',
                number_of_cylinders: '',
                rear_perm_axle_load: '',
                front_perm_axle_load: '',
                middle_perm_axle_load: '',
            },
            verrors: {
                make: '',
                model: ''
            }
        }
    },

    computed: {
        ...mapGetters({
            makes: 'Makes/getMakes',
            countries: 'Countries/getAll'
        }),

        /**
         * Specifies if vehicle should be edited
         *
         * @returns {Undefined}
         */
        id () {
            return this.$route.query.id;
        }
    },

    methods: {
        ...mapActions({
            getModels: 'Models/getModels',
            store: 'Vehicles/store',
            show: 'Vehicles/show',
            edit: 'Vehicles/update'
        }),

        /**
         * MOve to the previous step
         *
         * @returns {Undefined}
         */
        prevStep () {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        /**
         * Move to the next step of the multistep form
         *
         * @return {Undefined}
         */
        nextStep () {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
            }
        },

        /**
         * Moves to a specific step in the multistep form
         *
         * @param {Number} step
         * @return {Undefined}
         */
        goToStep (step) {
            this.currentStep = step;
        },


        /**
         * gets models by a given make
         *
         * @param {Number} make_id
         * @returns {Undefined}
         */
        getModelsByMake (make_id) {
            this.getModels({make_id}).then(response => {
                // console.log('models by make: ', response);
                this.models = response;
                this.$nextTick(() => {
                    $(this.$refs.model).change();
                })
            })
            .catch(error => {})
        },

        /**
         * Event handler for on make change
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        onMakeChange (event) {
            this.vehicle.make_id = event.target.value;
            this.getModelsByMake(event.target.value);
            $(this.$refs.model).val('').change();
            this.$nextTick()
        },

        /**
         * Event handler for model change
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        onModelChange (event) {
            this.vehicle.model_id = event.target.value;
        },

        /**
         * Registers event handlers
         *
         * @returns {Undefined}
         */
        registerEventListeners () {
            $(this.$refs.make).on('change', this.onMakeChange);
            $(this.$refs.model).on('change', this.onModelChange);
        },


        /**
         * Processes vehicle data
         */
        getVehicleData () {
            this.vehicle.type = this.$refs.type.value;
            this.vehicle.country_id = this.$refs.country.value;
            this.vehicle.use = this.$refs.use.value;
            this.vehicle.fuel_type = this.$refs.fuel_type.value;
        },

        /**
         * Converts json to formData
         *
         * @returns {Object}
         */
        parseToFormData() {
            let formData = new FormData();

            for (let key in this.vehicle) {
                if (this.vehicle[key]) {
                    formData.append(key, this.vehicle[key]);
                } else {
                    formData.append(key, '');
                }
            }

            return formData;
        },

        /**
         * Creates a vehicle
         *
         * @returns {Undefined}
         */
        createVehicle () {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (!this.id) {
                        this.getVehicleData();

                        console.log(this.vehicle)

                        let data = this.parseToFormData();

                        this.store(data).then(response => {
                            console.log('create', response)
                            // this.$router.push({name: 'all_vehicles'})
                        }).catch(error => {
                            this.buildErrors(error);
                            console.log('create', error);
                        });
                    } else {
                        // return console.log(this.vehicle);

                        this.edit({
                            id: this.vehicle.id,
                            data:  this.vehicle
                        }).then(response => {
                            // console.log('edit', response);
                            this.$router.push({name: 'all_vehicles'})
                        }).catch(error => {
                            // console.log('edit', error);
                        });
                    }
                } else {
                    // this.notify('You have errors, go through all steps and provide required fields')
                    alert('You have errors, go through all steps and provide required fields')
                }
            })
        }
    },

    mounted () {
        this.registerEventListeners();

        if (this.id) {
            this.show(this.id).then(response => {
                console.log(response)
                /**
                 * Get the current owner of the vehicle
                 */
                let owner = response.owners && response.owners.length ? response.owners.shift() : {};

                this.vehicle = {
                    ...response,
                    ...owner
                };

                /**
                 * Change the make input
                 */
                $(this.$refs.make).val(response.model.make_id).change();

                /**
                 * Wait on models to be fetched for this make
                 * Then set the model to the current modal
                 */
                let timer = setInterval(() => {
                    if (this.models.length) {
                        $(this.$refs.model).val(response.model.id).change();
                        clearInterval(timer);
                    }
                }, 1000);

                /**
                 * Populate other selects inputs
                 */
                $(this.$refs.use).val(response.use).change();
                $(this.$refs.type).val(response.type).change();
                $(this.$refs.country).val(response.country_id).change();
                $(this.$refs.fuel_type).val(response.fuel_type).change();

            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style lang="scss">
.form-control, .select-2{
    border-color: #dddddd !important;
}
.step-link{
    cursor: pointer !important;
    &:hover{
        background: #85C1E9 !important;
    }
}
</style>

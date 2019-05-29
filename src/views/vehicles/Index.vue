<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <i class="mdi mdi-car"></i>
                Vehicles
            </h1>

           <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List of Vehicles</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <router-link v-if="isDvla" :to="{name: 'register_vehicle'}" class="btn btn-primary">Register Vehicle</router-link>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div class="row">
                            <div class="col-3">
                                <div class="form-group">
                                    <div class="select2-wrapper">
                                        <select class="select-2 form-control"
                                            name="make"
                                            ref="make"
                                            data-placeholder="Filter by Makes">
                                            <option value=" ">All Makes</option>
                                            <option
                                                v-for="(make, index) in makes"
                                                :key="index"
                                                :value="make.id">{{make.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="form-group">
                                    <div class="select2-wrapper">
                                        <select class="select-2 form-control"
                                            name="model"
                                            ref="model"
                                            data-placeholder="Filter by model">
                                            <option value=" ">All Models</option>
                                            <option
                                                v-for="(model, index) in models"
                                                :key="index"
                                                :value="model.id">{{model.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-6">
                                <toolbar
                                    @show="paginate"
                                    @search="search" />
                            </div>
                        </div>

                         <div class="row">
                            <div class="col-12">
                                <template v-if="vehicles.length">
                                    <div class="table-responsive">
                                        <vehicles-table
                                            :vehicles="vehicles"
                                        />
                                    </div>

                                    <app-pagination
                                        v-if="pageDetails && pageDetails.total"
                                        :pageDetails="pageDetails"
                                        @navigate="fetchPage" />
                                </template>

                                <template v-else>
                                    <p class="lead mt-5 mb-5 text-center">There are no vehicles in the system.</p>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import VehiclesTable from './Table';

export default {
    components: {
        VehiclesTable
    },

    data () {
        return {
            params: {
                paginate: true,
                per_page: 20,
            },

            models: []
        }
    },

    computed: {
        ...mapGetters({
            vehicles: 'Vehicles/getVehicles',
            pageDetails: 'Vehicles/getPageDetails',
            makes: 'Makes/getMakes',
            isPolice: 'Auth/isPolice',
            isInsurance: 'Auth/isInsurance',
            isDvla: 'Auth/isDvla'
        })
    },

    methods: {
        ...mapActions({
            getVehicles: 'Vehicles/getVehicles',
            getModels: 'Models/getModels',
        }),

        /**
         * On change of per page
         *
         * @param {Number} per_page
         * @returns {Undefined}
         */
        paginate (per_page) {
            if (per_page) {
                this.params.per_page = per_page;
                this.fetchPage({});
            }
        },

        /**
         * On Search keyword change
         *
         * @param {String} keyword
         * @returns {Undefined}
         */
        search (registration_number) {
            // if (registration_number) {
                this.fetchPage({
                    registration_number
                });
            // }
        },

        /**
         * fetches a page
         *
         * @param {Object} query
         * @returns {Object}
         */
        fetchPage (query) {
            // return console.log(query)
            this.getVehicles({
                ...query,
                ...this.params
            }).then(response => {})
            .catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        },

        /**
         * Event handler for on make change
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        onMakeChange (event) {
            let make_id = event.target.value;
            let payload = {};

            if (make_id) {
                payload = { make_id };
            }

            this.getModels(payload).then(response => {
                this.models = response;
                // console.log(response)
                this.$nextTick(() => {
                    $(this.$refs.model).change();
                })
            })
            .catch(error => {});

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
            let model_id = event.target.value;
            if (model_id) {
                this.fetchPage({ model_id });
            }
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
    },

    mounted () {
        this.registerEventListeners();

        this.getVehicles(this.params).then(response => {
            // console.log(response)
        }).catch(error => {
            this.notify(this.buildErrors(error), 'error');
        });
    }
}
</script>
<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <i class="mdi mdi-car"></i>
                Owners
            </h1>

           <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List of vehicle owners</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <router-link v-if="isDvla" :to="{name: 'register_vehicle'}" class="btn btn-primary">Register Owner & Vehicle</router-link>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div class="row">
                            <div class="col-3">
                                <!-- <div class="form-group">
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
                                </div> -->
                            </div>

                            <div class="col-3">
                                <!-- <div class="form-group">
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
                                </div> -->
                            </div>

                            <div class="col-xs-12 col-6">
                                <toolbar
                                    @show="paginate"
                                    @search="search" />
                            </div>
                        </div>

                         <div class="row">
                            <div class="col-12">
                                <template v-if="owners.length">
                                    <div class="table-responsive">
                                        <owners-table
                                            :owners="owners"
                                        />
                                    </div>

                                    <app-pagination
                                        v-if="pageDetails && pageDetails.total"
                                        :pageDetails="pageDetails"
                                        @navigate="fetchPage" />
                                </template>

                                <template v-else>
                                    <p class="lead mt-5 mb-5 text-center">There are no owners in the system.</p>
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

import ownersTable from './Table';

export default {
    components: {
        ownersTable
    },

    data () {
        return {
            params: {
                paginate: true,
                per_page: 20,
                keyword: '',
            },

            models: []
        }
    },

    computed: {
        ...mapGetters({
            owners: 'Owners/getOwners',
            pageDetails: 'Owners/getPageDetails',
            makes: 'Makes/getMakes',
            isPolice: 'Auth/isPolice',
            isDvla: 'Auth/isDvla'
        })
    },

    methods: {
        ...mapActions({
            getOwners: 'Owners/getOwners',
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
        search (keyword) {
            this.params.keyword = keyword;
            this.fetchPage({});
        },

        /**
         * fetches a page
         *
         * @param {Object} query
         * @returns {Object}
         */
        fetchPage (query) {
            // return console.log(query)
            this.getOwners({
                ...query,
                ...this.params
            }).then(response => {})
            .catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        }
    },

    mounted () {
        this.getOwners(this.params).then(response => {
            // console.log(response)
        }).catch(error => {
            this.notify(this.buildErrors(error), 'error');
        });
    }
}
</script>
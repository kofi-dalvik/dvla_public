<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <i class="mdi mdi-car"></i>
                Road Worthiness
            </h1>

           <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List of Road Worthies</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <router-link v-if="isInsurance" :to="{name: 'create_road_worthy'}" class="btn btn-primary">Create Worthiness</router-link>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div class="row justify-content-start">
                            <div class="col-3">
                                <div class="form-group">
                                    <input type="text" ref="date_range:range" class="form-control" placeholder="">
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <!-- <label>Insurance Status</label> -->
                                    <div class="select2-wrapper">
                                        <select class="select-2 form-control"
                                            name="worthy_status"
                                            ref="worthy_status"
                                            data-placeholder="Filter by Insurance Status Types">
                                            <option value="recorded_at">Recorded Within</option>
                                            <option value="expired">Expired</option>
                                            <option value="will_expire">Will Expire In</option>
                                            <option value="issued_within">Issued Within</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div class="row">
                            <div class="col-12">
                                <template v-if="worthies.length">
                                    <div class="table-responsive">
                                        <worthies-table
                                            :worthies="worthies"
                                        />
                                    </div>

                                    <app-pagination
                                        :pageDetails="pageDetails"
                                        @navigate="fetchPage" />
                                </template>

                                <template v-else>
                                    <p class="lead mt-5 mb-5 text-center">There are no road worthies for this query.</p>
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
import datepicker from './../../mixins/datepicker';

import WorthiesTable from './Table';

export default {
    mixins: [datepicker],

    components: {
        WorthiesTable
    },

    data () {
        return {
            params: {
                range: '',
                worthy_status: 'recorded_at'
            },

            models: []
        }
    },

    computed: {
        ...mapGetters({
            worthies: 'Worthies/getAll',
            pageDetails: 'Worthies/getPageDetails',
            isPolice: 'Auth/isPolice',
            isInsurance: 'Auth/isInsurance',
            isAdmin: 'Auth/isAdmin'
        })
    },

    methods: {
        ...mapActions({
            getWorthies: 'Worthies/index',
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
        fetchPage () {
            // return console.log(query)
            this.getWorthies(this.params).then(response => {})
            .catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        },

        /**
         * Event handler for type change
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        onTypeChange (event) {
            this.params.insurance_type_id = event.target.value;
            this.fetchPage();
        },

        onStatusChange(event) {
            this.params.worthy_status = event.target.value;
            this.fetchPage();
        },

        /**
         * Registers event handlers
         *
         * @returns {Undefined}
         */
        registerEventListeners () {
            $(this.$refs.insurance_type).on('change', this.onTypeChange);
            $(this.$refs.worthy_status).on('change', this.onStatusChange);

            this.setupDatepickers({
                eventHandlers: {
                    'date_range:range': 'onRangeChange'
                }
            });
        },

        onRangeChange(event) {
            // console.log(event.target.value);
            this.params.range = event.target.value;
            this.fetchPage();
        }
    },

    mounted () {
        this.registerEventListeners();

        let dates = this.getDates();
        this.params.range = dates.range;

        this.getWorthies(this.params).then(response => {
            console.log(response.data)
        }).catch(error => {
            this.notify(this.buildErrors(error), 'error');
        });
    }
}
</script>
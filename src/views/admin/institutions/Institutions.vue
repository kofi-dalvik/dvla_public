<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <!-- <i class="mdi mdi-car"></i> -->
                Institutions
            </h1>

            <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List of Institutions</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <button @click="createModal(true)" class="btn btn-primary">Create Institution</button>
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
                                            name="hierarchy_id"
                                            ref="hierarchy"
                                            data-placeholder="Filter by region">
                                            <option value=" ">Select Region</option>
                                            <option value=" ">All</option>
                                            <option v-for="(region, index) in regions"
                                                :key="index"
                                                :value="region.id">{{region.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="form-group">
                                    <div class="select2-wrapper">
                                        <select class="select-2 form-control"
                                            name="role_id"
                                            ref="role"
                                            data-placeholder="Filter by Institution Type">
                                            <option value="">Select Institution Type</option>
                                            <option value=" ">All</option>
                                            <option v-for="(type, index) in institutionTypes"
                                                :key="index"
                                                :value="type.id">{{type.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-6">
                                <toolbar
                                    @show="val => {}"
                                    @search="val => {}" />
                            </div>
                        </div>

                         <div class="row">
                            <div class="col-12">
                                <template v-if="institutions.length">
                                    <div class="table-responsive">
                                       <institutions-table :institutions="institutions" @editInstitution="editInstitution"></institutions-table>
                                    </div>

                                    <!-- <app-pagination
                                        v-if="pageDetails && pageDetails.total"
                                        :pageDetails="pageDetails"
                                        @navigate="getUsers($event)" /> -->
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
        <modal
            :ok-text="shouldEdit ? 'Edit' : 'Create'"
            cancel-class="btn btn-danger float-left"
            :show="showCreateModal"
            @cancel="createModal(false)"
            @ok="createInstitution"
            :closeWhenOk="true"
            :title="shouldEdit ? 'Edit Institution' : 'Create New Institution'"
        >
            <div class="form-group" :class="{'has-danger': errors.has('name')}">
                <label>Enter Name</label>
                <input
                    v-model="institution.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter Name of Institution"
                    v-validate="'required'"
                    name="name">
                <error-label :message="errors.first('name')"/>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group select2-wrapper" :class="{'has-danger': verrors.region}">
                        <label>Region</label>
                        <select ref="region_id" class="form-control select-2">
                            <option value="">Select Region</option>
                            <option v-for="(region, index) in regions" :key="index" :value="region.id">
                                {{region.name}}
                            </option>
                        </select>
                        <error-label :message="verrors.region"></error-label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group select2-wrapper" :class="{'has-danger': verrors.type}">
                        <label>Institution Type</label>
                        <select ref="institution_type_id" class="form-control select-2">
                            <option value="">Select Institution Type</option>
                            <option v-for="(type, index) in institutionTypes" :key="index" :value="type.id">
                                {{type.name}}
                            </option>
                        </select>
                        <error-label :message="verrors.type"></error-label>
                    </div>
                </div>
            </div>

            <div class="form-group" :class="{'has-error': errors.has('location')}">
                <label>Location</label>
                <input name="location" v-validate="'required'" v-model="institution.location" type="text" class="form-control" placeholder="Enter Location">
                <error-label :message="errors.first('location')"></error-label>
            </div>

            <div class="form-group" :class="{'has-error': errors.has('phone')}">
                <label>Phone</label>
                <input v-model="institution.phone" name="phone" v-validate="'required|numeric'" type="text" class="form-control" placeholder="Enter Phone">
                <error-label :message="errors.first('phone')"></error-label>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Modal from '@/components/partials/Modal.vue'
import InstitutionsTable from './Table';

export default {
    components: {
        InstitutionsTable,
        Modal
    },

    data () {
        return {
            showCreateModal: false,
            modalTitle: 'Create New Institution',
            institution: {
                name: '',
                location: '',
                phone: '',
                region_id: '',
                institution_type_id: ''
            },
            verrors: {
                region: '',
                type: ''
            },
            shouldEdit: false
        }
    },
    computed: {
        ...mapGetters({
            regions: 'Regions/getAll',
            institutionTypes: 'Institutions/getInstitutionTypes',
            institutions: 'Institutions/getInstitutions'
        })
    },

    methods: {
        ...mapActions({
            storeInstitution: 'Institutions/createInstitution',
            getInstitutions: 'Institutions/getInstitutions',
            updateInstitution: 'Institutions/update'
        }),

        createModal (show, shouldEdit = false) {
            this.shouldEdit = shouldEdit;
            this.showCreateModal = show;
        },

        async createInstitution () {
            let validated = true;
            let region_id = this.$refs.region_id.value;
            let institution_type_id = this.$refs.institution_type_id.value;

            let validationResult = await this.$validator.validateAll();

            if (validationResult) {
                if (!region_id) {
                    this.verrors.region = 'region is required';
                    validated = false;
                } else {
                    this.verrors.region = '';
                }

                if (!institution_type_id) {
                    this.verrors.type = 'institution type is required';
                    validated = false;
                } else {
                    this.verrors.type = '';
                }

                if (validated) {

                   this.institution = {
                       ...this.institution,
                       region_id: parseInt(region_id),
                       institution_type_id: parseInt(institution_type_id)
                   };

                   if (this.shouldEdit) {
                       this.updateInstitution({id: this.institution.id, data: this.institution})
                       .then(response => {
                           this.createModal(false);
                           this.getInstitutions();
                       }).catch(error => {})
                   } else {
                        this.storeInstitution(this.institution)
                        .then(response => {
                            this.getInstitutions();
                            this.showCreateModal = false;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                   }
                }
            }
        },

        editInstitution (institution) {
            this.institution = {
                id: institution.id,
                name: institution.name,
                location: institution.location,
                phone: institution.phone,
                region_id: institution.region_id,
                institution_type_id: institution.institution_type_id
            };

            this.createModal(true, true);

            $(this.$refs.institution_type_id).val(institution.institution_type_id).change();
            $(this.$refs.region_id).val(institution.region_id).change();
        }
    },

    mounted () {
        this.getInstitutions();
    }
}
</script>
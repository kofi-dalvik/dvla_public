<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                Insurance Types
            </h1>

            <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List available Insurance types</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <button @click="createModal(true)" class="btn btn-primary">Create Type</button>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <!-- <div class="row justify-content-end">
                            <div class="col-xs-12 col-6">
                                <toolbar
                                    @show="val => {}"
                                    @search="search" />
                            </div>
                        </div> -->

                         <div class="row">
                            <div class="col-12">
                                <template>
                                    <div class="table-responsive table-striped">
                                        <table class="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Created</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr v-for="(type, index) in all" :key="index">
                                                <td><b>{{index + 1}}</b></td>
                                                <td>{{type.name}}</td>
                                                <td>{{type.description || 'N/A'}}</td>
                                                <td>{{type.created_at | formattedDateTime}}</td>
                                                <td>
                                                    <a href="#" class="btn btn-warning btn-action mr-3">
                                                        <i class="mdi mdi-pencil"></i>
                                                    </a>
                                                    <a href="#" class="btn btn-danger btn-action mr-3">
                                                        <i class="mdi mdi-trash-can"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    <!-- <app-pagination
                                        v-if="pageDetails && pageDetails.total"
                                        :pageDetails="pageDetails"
                                        @navigate="getUsers($event)" /> -->
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal
            :ok-text="edited ? 'Save' : 'Create'"
            cancel-class="btn btn-danger float-left"
            :show="showCreateModal"
            @cancel="createModal(false)"
            @ok="createType"
            :closeWhenOk="true"
            :title="shouldEdit ? 'Edit type' : 'Create New type'"
        >
            <div class="form-group" :class="{'has-danger': errors.has('name')}">
                <label>Name</label>
                <input
                    v-model="type.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                    v-validate="'required'"
                    name="name">
                <error-label :message="errors.first('name')"/>
            </div>

            <div class="form-group" :class="{'has-danger': errors.has('description')}">
                <label>Description</label>
                <textarea
                    v-model="type.description"
                    class="form-control"
                    placeholder="Enter Name"
                    v-validate="'required'"
                    name="description">
                </textarea>
                <error-label :message="errors.first('description')"/>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Modal from '@/components/partials/Modal.vue'

export default {
    components: {
        Modal
    },

    data () {
        return {
            showCreateModal: false,
            type: {
                name: '',
                description: ''
            },
            shouldEdit: false,
            edited: null
        }
    },
    computed: {
        ...mapGetters({
            all: 'InsuranceTypes/getAll'
        })
    },

    methods: {
        ...mapActions({
            getTypes: 'InsuranceTypes/index',
            create: 'InsuranceTypes/create',
            update: 'InsuranceTypes/update',
            search: 'InsuranceTypes/search',
            destroy: 'InsuranceTypes/destroy'
        }),

        createModal (show, shouldEdit = false) {
            this.shouldEdit = shouldEdit;
            this.showCreateModal = show;
        },

        async createType () {
            let validationResult = await this.$validator.validateAll();

            if (validationResult) {
                if (this.edited) {
                    // return console.log(this.edited, this.type)
                    this.update({id: this.edited.id, data: this.type})
                    .then(response => {
                        this.gettypes().catch(error => {})
                        this.createModal(false);
                    }).catch(error => {
                        this.createModal(false);
                    })
                } else {
                    this.create(this.type)
                    .then(res => {
                        this.createModal(false);
                    })
                    .catch(error => {});
                }
            }
        },

        edit (item) {
            // console.log('editing ', item)
            this.edited = item;
            this.type = item;
            this.createModal(true, true);
        }
    },

    mounted () {
        this.getTypes()
        .then(response => {
            // console.log(response);
        })
        .catch(error => {});
    }
}
</script>

<style lang="scss">
.type-item{
    background: #F3F1F9;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 1px;
    display: flex;
    justify-content: space-between;
}
</style>

<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <!-- <i class="mdi mdi-car"></i> -->
                Models for {{make}}
            </h1>

            <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List of Models</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <button @click="createModal(true)" class="btn btn-primary">Create Model</button>
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
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-6">
                                <toolbar
                                    @show="val => {}"
                                    @search="search" />
                            </div>
                        </div>

                         <div class="row">
                            <div class="col-12">
                                <template>
                                   <div class="row">
                                        <div class="col-md-3" v-for="(chunk, cI) in models" :key="cI">
                                            <div class="make-item" v-for="(model, index) in chunk" :key="index">
                                                <span class="name">{{model.name}}</span>
                                                <div class="actions">
                                                    <button class="btn btn-danger btn-action" @click="destroy({id: model.id})">
                                                        <i class="mdi mdi-trash-can"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
            ok-text="Create"
            cancel-class="btn btn-danger float-left"
            :show="showCreateModal"
            @cancel="createModal(false)"
            @ok="createModel"
            :closeWhenOk="true"
            :title="shouldEdit ? 'Edit Make' : 'Create New Make'"
        >
            <div class="form-group" :class="{'has-danger': errors.has('name')}">
                <label>Enter Name</label>
                <input
                    v-model="model.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                    v-validate="'required'"
                    name="name">
                <error-label :message="errors.first('name')"/>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Modal from '@/components/partials/Modal.vue'

export default {
    props: ['make_id'],

    components: {
        Modal
    },

    data () {
        return {
            showCreateModal: false,
            model: {
                name: ''
            },
            shouldEdit: false,
            all: []
        }
    },
    computed: {
        models () {
            return this.chunkArray(this.all, 4);
        },

        make () {
            return this.$route.query.make;
        }
    },

    methods: {
        ...mapActions({
            getModels: 'Models/getModels',
            create: 'Models/createModel',
            search: 'Models/search',
            destroy: 'Models/destroy'
        }),

        createModal (show, shouldEdit = false) {
            this.shouldEdit = shouldEdit;
            this.showCreateModal = show;
        },

        async createModel () {
            let validationResult = await this.$validator.validateAll();
            if (validationResult) {
                this.create({
                    name: this.model.name,
                    make_id: this.make_id
                })
                .then(res => {
                    // console.log(res)
                    this.all.unshift(res);
                    this.createModal(false);
                })
                .catch(error => {});
            }
        },

        edit (item) {
            console.log('editing ', item)

            this.createModal(true, true);
        }
    },

    mounted () {
        this.getModels({make_id: this.make_id})
        .then(response => {
            this.all = response;
        })
        .catch(error => {});
    }
}
</script>

<style lang="scss">
.make-item{
    background: #F3F1F9;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 1px;
    display: flex;
    justify-content: space-between;
}
</style>

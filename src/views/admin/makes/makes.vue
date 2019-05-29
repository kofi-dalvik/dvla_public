<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <!-- <i class="mdi mdi-car"></i> -->
                Makes
            </h1>

            <div class="row justify-content-between mb-3">
                <div class="col-12 col-md-6">
                    <p class="card-description">List of Makes</p>
                </div>
                <div class="col-12 col-md-6 text-right">
                    <button @click="createModal(true)" class="btn btn-primary">Create Make</button>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div class="row justify-content-end">
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
                                        <div class="col-md-3" v-for="(chunk, cI) in makes" :key="cI">
                                            <div class="make-item" v-for="(make, index) in chunk" :key="index">
                                                <span class="name">{{make.name}}</span>
                                                <div class="actions">
                                                    <router-link
                                                        :to="{
                                                            name: 'vehicle_models',
                                                            params: {
                                                                make_id: make.id
                                                            },
                                                            query: {
                                                                make: make.name
                                                            }
                                                        }" class="btn btn-success btn-action mr-3">
                                                        <i class="mdi mdi-eye"></i>
                                                    </router-link>

                                                    <button class="btn btn-warning btn-action mr-3"  @click="edit(make)">
                                                        <i class="mdi mdi-pencil"></i>
                                                    </button>

                                                    <button class="btn btn-danger btn-action" @click="destroy({id: make.id})">
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
            :ok-text="edited ? 'Save' : 'Create'"
            cancel-class="btn btn-danger float-left"
            :show="showCreateModal"
            @cancel="createModal(false)"
            @ok="createMake"
            :closeWhenOk="true"
            :title="shouldEdit ? 'Edit Make' : 'Create New Make'"
        >
            <div class="form-group" :class="{'has-danger': errors.has('name')}">
                <label>Enter Name</label>
                <input
                    v-model="make.name"
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
    components: {
        Modal
    },

    data () {
        return {
            showCreateModal: false,
            make: {
                name: ''
            },
            shouldEdit: false,
            edited: null
        }
    },
    computed: {
        ...mapGetters({
            all: 'Makes/getMakes'
        }),

        makes () {
            return this.chunkArray(this.all, 4);
        }
    },

    methods: {
        ...mapActions({
            getMakes: 'Makes/getMakes',
            create: 'Makes/createMake',
            update: 'Makes/update',
            search: 'Makes/search',
            destroy: 'Makes/destroy'
        }),

        createModal (show, shouldEdit = false) {
            this.shouldEdit = shouldEdit;
            this.showCreateModal = show;
        },

        async createMake () {
            let validationResult = await this.$validator.validateAll();

            if (validationResult) {
                if (this.edited) {
                    // return console.log(this.edited, this.make)
                    this.update({id: this.edited.id, data: this.make})
                    .then(response => {
                        this.getMakes().catch(error => {})
                        this.createModal(false);
                    }).catch(error => {
                        this.createModal(false);
                    })
                } else {
                    this.create({name: this.make.name})
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
            this.make.name = item.name;
            this.createModal(true, true);
        }
    },

    mounted () {
        // this.getMakes()
        // .catch(error => {});
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

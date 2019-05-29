<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                <!-- <i class="mdi mdi-account-group"></i> -->
                Users
            </h1>

            <p class="card-description">List of users</p>

            <div class="row">
                <div class="col-12">
                    <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <div class="row">
                            <div class="col-xs-12 col-2">
                                <button type="button" class="btn btn-primary" @click="addUser">
                                    <i class="mdi mdi-plus"></i>
                                    Add user
                                </button>
                            </div>

                            <div class="col-3">
                                <div class="form-group">
                                    <div class="select2-wrapper">
                                        <select class="select-2 form-control"
                                            name="institution"
                                            ref="institution"
                                            data-placeholder="Filter by Institution">
                                            <option value=" ">Select Institution</option>
                                            <option value=" ">All</option>
                                            <option v-for="(institution, index) in institutions" :key="index" :value="institution.id">
                                                {{institution.name}}
                                            </option>
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
                                            data-placeholder="Filter by a role">
                                            <option value="">Select a role</option>
                                            <option value=" ">All</option>
                                            <option v-for="(role, index) in roles"
                                                :value="role.id"
                                                :key="index">
                                                {{ role.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-4">
                                <toolbar
                                    @show="val => params.per_page = val"
                                    @search="val => params.keyword = val" />
                            </div>
                        </div>

                         <div class="row">
                            <div class="col-12">
                                <template v-if="users.length">
                                    <div class="table-responsive">
                                        <users-table
                                            @edit="editUser"
                                            :users="users"
                                            @delete="deleteUser" />
                                    </div>

                                    <app-pagination
                                        v-if="pageDetails && pageDetails.total"
                                        :pageDetails="pageDetails"
                                        @navigate="getUsers($event)" />
                                </template>

                                <template v-else>
                                    <p class="lead mt-5 mb-5 text-center">There are no users in the system.</p>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal
            :show="showModal"
            :user="modalUser"
            @save-user="saveUser"
            @update:show="val => showModal = val"></modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import UsersTable from './Table';
import Modal from './Modal';

export default {
    components: {
        Modal,
        UsersTable
    },

    computed: {
        ...mapGetters({
           users: 'Users/getAll',
           pageDetails: 'Users/getPageDetails',
           roles: 'Roles/getAll',
           institutions: 'Institutions/getInstitutions'
        })
    },

    data() {
        return {
            showModal: false,
            modalUser: {},

            params: {
                paginate: true,
                per_page: null,
                keyword: null,
                role_id: null,
                institution_id: null
            },

            executivesLoaded: false
        };
    },

    watch: {
        params: {
            deep: true,
            handler() {
                this.getUsers();
            }
        }
    },

    methods: {
        ...mapActions({
            store: 'Users/store',
            load: 'Users/all',
            update: 'Users/update',
            delete: 'Users/delete',
            loadRoles: 'Roles/all'
        }),

        /**
         * Open the user's add modal.
         *
         * @return {Undefined}
         */
        addUser() {
            this.showModal = true;
        },

        /**
         * Load users into state
         *
         * @param {Object} query Query params
         */
        getUsers(query = {}) {
            for (let param of Object.keys(this.params)) {
                if (this.params[param]) {
                    query[param] = this.params[param];
                }
            }

            if (query.keyword) {
                delete query.page;
            }

            this.load(query)
                .catch(errors => this.notify(this.buildErrors(errors), 'error'));
        },

        /**
         * Add or update a user
         *
         * @param {Object} user User data
         */
        saveUser(user) {
            let keyword = 'added';
            let savingMethod = this.store;
            let payload = { data: user };

            if (user.id !== 'undefined' && user.id) {
                keyword = 'updated';
                payload.id = user.id;
                savingMethod = this.update;
            }

            savingMethod(payload)
                .then(response => {
                    this.notify(`The user was ${keyword} successfully.`);
                    this.getUsers();
                    this.showModal = false;
                    console.log(response)
                    this.modalUser = {};
                })
                .catch(errors => this.notify(this.buildErrors(errors), 'error'));
        },

        /**
         * Popup modal for editing a user
         *
         * @param {Object} user User
         */
        editUser(user) {
            this.showModal = true;
            this.modalUser = { ...user };
        },

        /**
         * Delete user with given id
         *
         * @param {Integer} id Id of user
         */
        deleteUser(id) {
            Swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this user and all associated data!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes - Delete it.',
                confirmButtonClass: 'bg-danger',
                cancelButtonText: 'No - Cancel Delete'
            })
            .then(response => {
                if (response.value) {
                    this.delete(id)
                        .then(() => {
                            this.notify('The user was deleted successfully.');
                            this.getUsers();
                        })
                        .catch(errors => this.notify(this.buildErrors(errors), 'error'))
                }
            });
        },

        /**
         * Event handler for when role changes
         *
         * @param {Object} event Change event
         */
        roleChanged(event) {
            this.params.role_id = event.target.value;
        },

        /**
         * Event handler for when hierarchy changes
         *
         * @param {Object} event Change event
         */
        institutionChanged(event) {
            this.params.institution_id = event.target.value;
        },

        /**
         * Register event listeners for the filters
         */
        registerEventListeners() {
            $(this.$refs.role).on('change', this.roleChanged);
            $(this.$refs.institution).on('change', this.institutionChanged);
        }
    },

    mounted() {
        this.getUsers();
        this.registerEventListeners();
    }
}
</script>
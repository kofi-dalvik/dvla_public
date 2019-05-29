<template>
    <modal
        :force="true"
        :show="show"
        :title="title"
        :ok-text="title"
        :close-when-cancel="true"
        @cancel="$emit('update:show', false)"
        @ok="$emit('save-user', payload)"
        @update:show="$emit('update:show', $event)">

			<div class="row">
				<div class="col-12">
                    <div class="form-group" :class="getFieldClass('name')">
                        <label for="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            v-model="payload.name"
                            class="form-control"
                            v-validate="rules.name"
                            placeholder="Name">

                        <error-label :message="errors.first('name')" />
                    </div>

                    <div class="form-group" :class="getFieldClass('email')">
                        <label for="email">Email</label>
                        <input id="email"
                            type="text"
                            name="email"
                            v-model="payload.email"
                            class="form-control"
                            v-validate="rules.email"
                            placeholder="Email">

                        <error-label :message="errors.first('email')" />
                    </div>

                    <div class="form-group" :class="getFieldClass('phone')">
                        <label for="phone">Phone</label>
                        <input id="phone"
                            type="text"
                            name="phone"
                            v-model="payload.phone"
                            class="form-control"
                            v-validate="rules.phone"
                            placeholder="Phone">

                        <error-label :message="errors.first('phone')" />
                    </div>

                    <div class="form-group" v-if="isUpdate">
                        <input type="checkbox" id="password" v-model="payload.generate_password">
                        <label for="password"> Generate New Password</label>
                    </div>
				</div>
			</div>

            <div class="row">
                <div class="col-xs-12 col-6">
                    <div class="form-group" :class="getFieldClass('hierarchy_id')">
                        <label>Institution</label>

                        <div class="select2-wrapper">
                            <select class="select-2 form-control"
                                name="institution_id"
                                ref="institution"
                                data-placeholder="Select Institution">
                                <option value=" ">Select Institution</option>
                                <option v-for="(institution, index) in institutions"
                                    :value="institution.id"
                                    :key="index">
                                    {{ institution.name }}
                                </option>
                            </select>
                        </div>

                        <error-label :message="errors.first('institution_id')" />
                    </div>
                </div>

                <div class="col-xs-12 col-6">
                    <div class="form-group">
                        <label>Role</label>

                        <div class="select2-wrapper">
                            <select class="select-2 form-control"
                                name="user_role_id"
                                ref="role"
                                data-placeholder="Select a Role">
                                <option value=" ">Select a Role</option>
                                <option v-for="(role, index) in roles"
                                    :value="role.id"
                                    :key="index">
                                    {{ role.name }}
                                </option>
                            </select>
                        </div>

                        <error-label :message="errors.first('user_role_id')" />
                    </div>
                </div>
            </div>
    </modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

	export default {
		props: {
            show: {
                type: Boolean,
                default: false
            },

            user: {
                type: Object,
                default: {}
            }
        },

		data() {
			return {
                payload: {
                    name: '',
                    phone: '',
                    email: '',
                    user_role_id: '',
                    institution_id: '',
                    generate_password: ''
                },

                rules: {
                    name: 'required|min:2',
                    email: 'required|email',
                    phone: 'required|digits:10'
                }
			};
        },

        computed: {
            ...mapGetters({
                roles: 'Roles/getAll',
                institutions: 'Institutions/getInstitutions'
            }),

            /**
             * Check if the current operation is an update.
             *
             * @return {Boolean}
             */
            isUpdate() {
                return Object.keys(this.user).length > 0;
            },

            /**
             * Title for the modal depending on the current operation.
             *
             * @return {String}
             */
            title() {
                return this.isUpdate ? 'Edit User' : 'Add User';
            }
        },

		watch: {
            /**
             * Toggle the id property depending on the save operation. Update or Save.
             *
             * @param {Boolean} value
             * @return {Undefined}
             */
			show(value) {
                this.resetModal();

                if (this.isUpdate) {
                    this.getUserDetails();
                    this.$set(this.payload, 'id', this.user.id);
                } else {
                    this.$delete(this.payload, 'id');
                }
            },

            payload: {
                deep: true,
                handler() {
                    $(this.$refs.hierarchy).val(this.payload.hierarchy_id).change();
                    $(this.$refs.role).val(this.payload.user_role_id).change();
                }
            },
		},

		methods: {
            /**
             * Get the details of the candidate to be updated.
             *
             * @return {Undefined}
             */
            getUserDetails() {
                for (let key of Object.keys(this.payload)) {
                    this.payload[key] = this.user[key];
                }
            },

            /**
             * Reset the modal.
             *
             * @return {Undefined}
             */
            resetModal() {
                for (let key of Object.keys(this.payload)) {
                    this.payload[key] = "";
                }

                this.$nextTick(() => this.errors.clear());
            },

            /**
             * Set the role id when it is updated
             *
             * @param {Object} event Select change event
             */
            roleChanged(event) {
                this.payload.user_role_id = event.target.value;
            },

            /**
             * Set the institution id when it is updated
             *
             * @param {Object} event Select change event
             */
            institutionChanged(event) {
                this.payload.institution_id = event.target.value;
            },

            /**
             * Set up event listeners to handle select2 value changes
             */
            registerEventListeners() {
                $(this.$refs.role).on('change', this.roleChanged);
                $(this.$refs.institution).on('change', this.institutionChanged);
            }
        },

        mounted() {
            this.registerEventListeners();
        }
	}
</script>
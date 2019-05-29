<template>
    <modal
        :show="show"
            :medium="true"
            title="Edit Your Profile"
            :closeWhenOK="true"
            bodyClass="modal-bg"
            :showOkButton="true"
            okClass="btn btn-primary"
            okText="Save Changes"
            @ok="updateProfile"
            @cancel="$emit('cancel')"
        >
        <div style="margin-top:-40px;">
            <upload-image id="profile-img" v-model="user.imgFile" :src="imageSrc"></upload-image>

            <form class="forms-sample">

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group select2-wrapper">
                            <label>Institution</label>
                            <select ref="institution" type="password" class="form-control select-2" disabled>
                                <option value="">Not Set</option>
                                <option v-for="(institution, index) in institutions" :key="index" :value="institution.id">{{institution.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group select2-wrapper">
                            <label>Status</label>
                            <select ref="status" type="password" class="form-control select-2" disabled>
                                <option value="">Not Set</option>
                                <option v-for="(item, index) in statuses" :key="index" :value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group select2-wrapper">
                            <label>Role</label>
                            <select ref="role" type="password" class="form-control select-2" disabled>
                                <option value="">Not Set</option>
                                <option v-for="(item, index) in roles" :key="index" :value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Name</label>
                    <input v-model="user.name" type="text" class="form-control" placeholder="Name">
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Phone</label>
                            <input v-model="user.phone" type="text" class="form-control"  placeholder="Phone">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="user.email" type="email" class="form-control"  placeholder="Email">
                        </div>
                    </div>
                </div>

                <div class="row border-top" style="padding-top:20px;" v-if="changePassword">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Old Password</label>
                            <input v-model="user.old_password" type="password" class="form-control" placeholder="Old Password">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>New Password</label>
                            <input v-model="user.new_password" type="password" class="form-control" placeholder="New Password">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Confirm New Password</label>
                            <input v-model="user.new_password_confirmation" type="password" class="form-control" placeholder="Confirm New Password">
                        </div>
                    </div>
                </div>

               <div class="d-flex justify-content-between align-items-center mt-3">
                    <a href="#" @click.prevent="changePassword = !changePassword">
                        {{ changePassword ? 'Hide Password Change' : 'Change Password?' }}
                    </a>
               </div>

            </form>
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
        }
    },

    data () {
        return {
            changePassword: false,
            imageSrc: '',
            user: {
                name: '',
                email: '',
                phone: '',
                imgFile: '',
                old_password: '',
                new_password: '',
                new_password_confirmation: ''
            }
        }
    },

    computed: {
        ...mapGetters({
            auth: 'Auth/getUser',
            roles: 'Roles/getAll',
            statuses: 'UserStatuses/getAll',
            institutions: 'Institutions/getInstitutions'
        })
    },

    watch: {
        statuses () {
            this.setSelects();
        },

        roles () {
            this.setSelects();
        },

        institutions () {
            this.setSelects();
        },

        /**
         * Set User when auth changes
         *
         * @returns {Undefined}
         */
        auth() {
            this.setUser();
        }
    },

    methods: {
        ...mapActions({
            updateUserInfo: 'Auth/updateUserInfo',
            logout: 'Auth/logout'
        }),

        /**
         * Initializes user form
         *
         * @returns {Undefined}
         */
        setUser () {
            for (let key in this.user) {
                if (this.auth[key]) {
                    this.user[key] = this.auth[key];
                }
            }

            this.imageSrc = this.auth.image;
        },


        setSelects () {
            this.$nextTick(() => {
                $(this.$refs.status).val(this.auth.user_status_id).change();
                $(this.$refs.role).val(this.auth.user_role_id).change();
                $(this.$refs.institution).val(this.auth.institution_id).change();
            })
        },

        /**
         * Updates profile
         *
         * @returns {Undefined}
         */
        updateProfile () {
            let data = this.parseToFormData();
            data.append('_method', 'put');
            this.updateUserInfo(data).then(response => {
                // console.log(response);
                this.$emit('cancel');
                this.notify('Profile update successful, Please login to continue');
                this.logout();
                this.$router.push({
                    name: 'login',
                    query: {
                        redirect: this.$route.fullPath
                    }
                })
            }).catch(error => {
                this.notify(this.buildErrors(error), 'error');
                console.log(error);
            });
        },

        /**
         * Convert json to formdata
         *
         * @returns {Object}
         */
        parseToFormData () {
            let formData = new FormData();

            for (let key in this.user) {
                formData.append(key, this.user[key]);
            }

            return formData;
        }
    },

    mounted () {
        this.setUser();
    }
}
</script>

<style>

</style>

<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
			<a href="#" :to="{ name: 'dashboard' }" class="navbar-brand brand-logo" active-class="" exact>
                <img src="../../assets/dvla-logo.jpg" style="width:50px;height:50px;" alt="logo"/>
			</a>

			<a href="#" :to="{ name: 'dashboard' }" class="navbar-brand brand-logo-mini" active-class="" exact>
                <!-- <img src="../../assets/logo-mini.png" alt="logo"/> -->
			</a>
        </div>

        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span class="mdi mdi-menu"></span>
            </button>

            <!-- <h3 class="mt-2">{{ pageTitle }}</h3> -->

            <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item">
                    <a class="nav-link text-primary" href="#" @click.prevent="showAccount = true">
                        <i class="mdi mdi-account-settings"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-primary" href="#" @click.stop="showNotifications">
                        <i class="mdi mdi-bell-ring"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <a @click.prevent.stop="$emit('logout-user')" class="nav-link text-danger" href="#">
                        <i class="mdi mdi-logout"></i>
                    </a>
                </li>
            </ul>

            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span class="mdi mdi-menu"></span>
            </button>
        </div>
        <account :show="showAccount" @cancel="showAccount = false"></account>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import  Account from './../../views/users/Account.vue';

export default {
    components: {
        Account
    },

    data () {
        return {
            showAccount: false
        }
    },

    computed: {
        ...mapGetters({
            user: 'Auth/getUser'
        }),

        institution(){
            if (this.user && this.user.institution) {
                return this.user.institution;
            }
            return {};
        }
    },

    methods: {
        showNotifications() {
            this.$emit('onToggleNotifications');
        }
    }
}
</script>

<style scoped>
</style>
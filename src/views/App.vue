<template>
	<div class="container-scroller" @click="clickAway">
        <div v-if="isUserLoggedIn">
            <app-header @logout-user="logoutUser" @onToggleNotifications="toggleNotifications"></app-header>

            <div class="container-fluid page-body-wrapper">
                <app-sidebar></app-sidebar>

                <div class="main-panel">
                    <div class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>

                    <app-footer></app-footer>
                </div>

            </div>

			<app-notifications></app-notifications>

			<button @click="$router.go(-1)" type="button" class="btn btn-warning btn-rounded btn-icon back-btn">
				<i class="mdi mdi-arrow-left"></i>
			</button>

			<button @click="$router.go(1)" type="button" class="btn btn-warning btn-rounded btn-icon front-btn">
				<i class="mdi mdi-arrow-right"></i>
			</button>
        </div>

		<div v-else class="container-fluid">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>

		<app-loader v-show="showAppLoader"></app-loader>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import Layouts from '../components/layouts';

	export default {
		components: {
			...Layouts
		},

		computed: {
			...mapGetters({
                isUserLoggedIn: 'Auth/check',
				showAppLoader: 'showLoaderStatus',
			})
		},

		watch: {
			isUserLoggedIn () {
				if (this.isUserLoggedIn) {
					this.refreshState()
				}
			}
		},

		methods: {
			...mapActions({
				logout: 'Auth/logout',
				getRoles: 'Roles/all',
				getUsers: 'Users/all',
				getRegions: 'Regions/all',
				getMakes: 'Makes/getMakes',
				getCountries: 'Countries/all',
				getIncidenTypes: 'Incidents/getTypes',
				getUserStatuses: 'UserStatuses/index',
				getInsuranceTypes: 'InsuranceTypes/index',
				getInstitutions: 'Institutions/getInstitutions',
				getInstitutionTypes: 'Institutions/getInstitutionTypes',
			}),

			logoutUser() {
				this.logout();
				this.$router.push({ name: 'login' });
			},

			refreshState () {
				this.getMakes();
				this.getUsers({
					paginate: true,
					per_page: 20
				});
				this.getRoles();
				this.getRegions();
				this.getCountries();
				this.getInstitutions();
				this.getIncidenTypes();
				this.getUserStatuses();
				this.getInsuranceTypes();
				this.getInstitutionTypes();
			},

			toggleNotifications() {
				let el = $('#side-notifications');
				// console.log('called toggler')

				if (el.hasClass('open-it')) {
					el.removeClass('open-it');
				} else {
					el.addClass('open-it');
				}
			},

			clickAway(event) {
				if (!$(event.target).parents().is('#side-notifications')) {
					$('#side-notifications').removeClass('open-it');
				}
			}
		},

		mounted  () {
			/**
			 * Setting up ajax polling
			 * Poll after every 10 seconds
			 */
			// setInterval(() => {
			// 	this.refreshState();
			// }, 10000);
			if (this.isUserLoggedIn) {
				this.refreshState();
			}
		}
	}
</script>

<style lang="scss">
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .3s
    }

	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	  opacity: 0
	}

	table.dataTable.table-striped {
		border-collapse: collapse !important;
	}
	.form-control{
		border-color: #dddddd;
	}
	.bg-purple{
		background: #A569BD !important;
		color: white;
	}
	.back-btn{
		position: fixed;
		bottom: 60px;
		right: 80px;
	}
	.front-btn{
		position: fixed;
		bottom: 60px;
		right: 30px;
	}
	.monthselect, .yearselect{
		outline: none;
		border: none;
		margin-bottom: 10px;
		border-bottom: 1px solid #5766F8;
		background: white;
	}
</style>
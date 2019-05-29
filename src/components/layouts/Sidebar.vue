<template>
	<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">

			<router-link :to="{ name: 'dashboard' }" tag="li" class="nav-item" active-class="active" exact>
				<a href="#" class="nav-link">
					<i class="mdi mdi-view-dashboard-outline menu-icon"></i>

					<span class="menu-title">
						Dashboard
					</span>
				</a>
			</router-link>


      <li class="nav-item">
				<a :class="isModuleActive('vehicles')" class="nav-link" data-toggle="collapse" href="#hierarchies-dropdown" aria-expanded="false" aria-controls="ui-basic">
					<i class="mdi mdi-car menu-icon"></i>
					<span class="menu-title">
						Vehicles
					</span>

					<i class="menu-arrow"></i>
				</a>

				<div class="collapse" id="hierarchies-dropdown">
					<ul class="nav flex-column sub-menu">
						<li class="nav-item">
							<router-link :to="{ name: 'all_vehicles' }" class="nav-link" active-class="active" exact>
								<i class="mdi mdi-playlist-plus"></i>
								Listing
							</router-link>
						</li>

						<li class="nav-item" v-if="isDvla">
							<router-link href="#" :to="{ name: 'change_vehicle_owner' }" class="nav-link" active-class="active" exact>
								<i class="mdi mdi-account-switch"></i>
								Ownership
							</router-link>
						</li>

						<li class="nav-item">
							<router-link :to="{name: 'vehicle_incidence'}" active-class="active" href="#" class="nav-link" exact>
								<i class="mdi mdi-file-document-box"></i>
								Incidents
							</router-link>
						</li>
					</ul>
				</div>
			</li>

      <li class="nav-item">
				<a class="nav-link" data-toggle="collapse" href="#executives-dropdown" aria-expanded="false" aria-controls="ui-basic">
					<i class="mdi mdi-account-multiple menu-icon"></i>
					<span class="menu-title">
						Owners
					</span>

					<i class="menu-arrow"></i>
				</a>

				<div class="collapse" id="executives-dropdown">
					<ul class="nav flex-column sub-menu">

						<li class="nav-item">
								<router-link :to="{name: 'all_owners'}" active-class="active" class="nav-link" href="#" exact>
									<i class="mdi mdi-playlist-plus"></i>
									Listing
								</router-link>
						</li>

					</ul>
				</div>
			</li>

			<li class="nav-item">
				<a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
					<i class="mdi mdi-file-document menu-icon"></i>

					<span class="menu-title">
						Insurance
					</span>

					<i class="menu-arrow"></i>
				</a>

				<div class="collapse" id="ui-basic">
					<ul class="nav flex-column sub-menu">

						<li class="nav-item">
							<router-link :to="{name: 'all_insurances'}" active-class="active" class="nav-link" href="#" exact>
							<i class="mdi mdi-playlist-plus"></i>
									Listing
							</router-link>
						</li>

						<li class="nav-item" v-if="isInsurance">
							<router-link :to="{name: 'insurance_types'}" active-class="active" class="nav-link" href="#" exact>
							<i class="mdi mdi-arrange-send-backward"></i>
									Types
							</router-link>
						</li>

					</ul>
				</div>
			</li>

			<li class="nav-item" v-if="isDvla">
				<a class="nav-link" data-toggle="collapse" href="#road" aria-expanded="false" aria-controls="road">
					<i class="mdi mdi-road menu-icon"></i>

					<span class="menu-title">
						Road Worthy
					</span>

					<i class="menu-arrow"></i>
				</a>

				<div class="collapse" id="road">
					<ul class="nav flex-column sub-menu">
						<li class="nav-item">
							<router-link :to="{name: 'all_road_worthies'}" class="nav-link" href="#" exact>
								<i class="mdi mdi-playlist-plus"></i>
									Listing
							</router-link>
						</li>
					</ul>
				</div>
			</li>

			<li class="nav-item" v-if="isAdmin">
				<a class="nav-link" data-toggle="collapse" href="#license" aria-expanded="false" aria-controls="ui-basic">
					<i class="mdi mdi-account-box-outline menu-icon"></i>

					<span class="menu-title">
						Admin
					</span>

					<i class="menu-arrow"></i>
				</a>

				<div class="collapse" id="license">
					<ul class="nav flex-column sub-menu">

						<li class="nav-item">
							<router-link href="#" :to="{ name: 'all_institutions' }" class="nav-link" active-class="active" exact>
								<i class="mdi mdi-home-variant"></i>
								Institutions
							</router-link>
						</li>

						<li class="nav-item">
							<router-link href="#" :to="{ name: 'users' }" class="nav-link" active-class="active" exact>
								<i class="mdi mdi-account-group"></i>
								Users
							</router-link>
						</li>

							<li class="nav-item">
							<router-link href="#" :to="{ name: 'vehicle_makes' }" class="nav-link" active-class="active" exact>
								<i class="mdi mdi-car"></i>
								Makes
							</router-link>
						</li>


					</ul>
				</div>
			</li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				user: 'Auth/getUser',
				isAdmin: 'Auth/isAdmin',
				isPolice: 'Auth/isPolice',
				isInsurance: 'Auth/isInsurance',
				isDvla: 'Auth/isDvla'
			})
		},

		methods: {
			/**
			 * Determine whether the module with the given name has the currently active
			 * path
			 *
			 * @param {String} module Module
			 */
			isModuleActive(module) {
				return {
					active: this.$route.path.indexOf(`/${module}`) !== -1
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
/* .collapse{
	background: #7200FA;
	color: white !important;
} */

#sidebar{
	// background: #273746 !important;

	.nav{
		.nav-item{
			.nav-link{
				// background: #7200FA;
				// color: white;
				// width: 100%;
				// text-align: left;

				&:hover, &.active{
					// background: #7200FA;
				}
			}
		}
	}
}
</style>
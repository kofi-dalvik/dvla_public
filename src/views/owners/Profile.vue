<template>
    <div class="card">
    <div class="card-body">
        <div class="row">
        <div class="col-lg-4">
            <div class="border-bottom text-center pb-4">
            <img :src="owner.image" alt="profile" class="img-lg rounded-circle mb-3">
            </div>

            <h5 class="mt-5 d-flex justify-content-between">
                <span>Owner Details</span>
            </h5>
            <div class="py-4">
                <p class="clearfix" v-for="(info, index) in ownerInfo" :key="index">
                    <span class="float-left"> {{info.name}} </span>
                    <span class="float-right text-muted"> {{info.value}} </span>
                </p>
            </div>
        </div>

        <div class="col-lg-8">
            <div class="d-flex justify-content-between">
            <div>
                <h3>{{owner.name}}</h3>
                <!-- <div class="d-flex align-items-center">
                    <h5 class="mb-0 mr-2 text-muted">Vehicles owned by {{owner.name}}</h5>
                </div> -->
            </div>
            <div>
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" placeholder="filter by date range">
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-primary" type="button">
                            <i class="mdi mdi-refresh"></i>
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <!-- <div class="mt-4 py-2 border-top border-bottom">
                <ul class="nav profile-navbar">
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="currentpage = 'incidence'" :class="{'active': currentpage == 'incidence'}">
                            <i class="mdi mdi-newspaper"></i>
                            Incidence
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="currentpage = 'ownership'" :class="{'active': currentpage == 'ownership'}">
                            <i class="mdi mdi-account-outline"></i>
                            Ownership
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="currentpage = 'license'" :class="{'active': currentpage == 'license'}">
                            <i class="mdi mdi-account-box-outline"></i>
                            License
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="currentpage = 'certificates'" :class="{'active': currentpage == 'certificates'}">
                            <i class="mdi mdi-file-document"></i>
                            Certificates
                        </a>
                    </li>
                </ul>
            </div> -->
            <div class="profile-feed" v-if="owner.id">

                <div class="card" style="box-shadow:none;">
                    <div class="card-body">
                    <h4 class="card-title">Vehicles Owned by {{owner.name}}</h4>
                        <vehicles-table :vehicles="owner.vehicles" :summary="true"></vehicles-table>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import VehiclesTable from './../vehicles/Table.vue';

export default {
    props: {
        owner_id: {
            type: [String, Number]
        }
    },

    components: {
        VehiclesTable
    },

    data () {
        return {
            owner: {
                vehicles: []
            },
            incidences: [],
            currentpage: 'incidence'
        }
    },

    computed: {
        /**
         * Prepares the props of this owner in an array format
         *
         * @returns {Array}
         */
        ownerInfo () {
            let result = [];
            let exclude = [
                'id', 'created_by', 'created_at', 'creator', 'image', 'updated_at', 'vehicles'
            ];

            if (Object.keys(this.owner)) {
                for (let key in this.owner) {
                    if (exclude.indexOf(key) < 0 && !key.includes('id')) {
                        if (this.owner[key]) {
                            result.push({
                                name: key.toTitleCase(),
                                value: this.owner[key]
                            })
                        }
                    }
                }

                /**
                 * Sort by lenght of key
                 */
                result.sort((a, b) => {
                    return a.name.length - b.name.length
                });
            }

            return result;
        }
    },

    methods: {
        ...mapActions({
            show: 'Owners/show'
        })
    },

    mounted () {
        this.show(this.owner_id).then(response => {
            this.owner = response;
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>

<style>

</style>

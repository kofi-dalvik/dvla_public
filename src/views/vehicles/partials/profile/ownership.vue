<template>
    <div class="card" style="box-shadow:none;">
        <div class="card-body">
            <h4 class="card-title mb-5">Ownership Trends
                <div class="float-right">
                    <router-link v-if="isDvla" :to="{name: 'change_vehicle_owner', query: {vehicle_id: vehicle.id}}" class="btn btn-success btn-sm mr-2">
                        <i class="mdi mdi-transfer"></i> Change Ownership
                    </router-link>
                    <a :href="pdfUrl" target="_blank" class="btn btn-primary btn-sm"><i class="mdi mdi-printer"></i> Print</a>
                </div>
            </h4>
            <ul class="bullet-line-list" v-if="owners">

                <li class="mt-3" v-for="(owner, index) in owners" :key="index" :class="{'current': !index}">
                    <div class="d-flex align-items-center pb-3 border-bottom">
                        <img class="img-lg rounded-circle" :src="owner.image" alt="profile">
                        <div class="ml-3">
                            <h6 class="mb-1">{{owner.name.toTitleCase()}}</h6>
                            <small class="text-muted mb-0">
                                <i class="mdi mdi-map-marker mr-1"></i>
                                {{ owner.pivot.started_on | formattedDate }}
                                to {{ owner.pivot.ended_on | formattedDatePresent }}
                            </small>
                            <div>
                                <a v-if="owner.pivot.transfer_letter" href="#" @click.prevent="openTransferLetter('view', owner.pivot.id)">
                                    View transfer letter to {{owner.name.toTitleCase()}}
                                </a>
                                <small v-else>First owner, no transfer letter involved</small>
                            </div>
                        </div>
                        <i class="icon mdi mdi-check-circle-outline font-weight-bold ml-auto px-1 py-1 text-info mdi-24px" v-if="!index"></i>
                        <i class="icon mdi mdi-close-circle font-weight-bold ml-auto px-1 py-1 text-info mdi-24px" v-else></i>
                    </div>
                </li>
            </ul>
            <p class="card-title text-center" v-else>No Owner was found for this vehicle</p>

            <!-- <print-ownership :data="data" :vehicle="vehicle"></print-ownership> -->
        </div>
    </div>
</template>

<script>
import Config from '../../../../../config';
import { mapActions, mapGetters } from 'vuex';
import PrintOwnership from './../../../print/ownership.vue';

export default {
    props: ['vehicle'],

    data() {
        return {
            data: [],
        }
    },

    components: {
        PrintOwnership
    },

    computed: {
        ...mapGetters({
            isDvla: 'Auth/isDvla'
        }),

        owners() {
            if (this.vehicle) {
                return this.vehicle.owners;
            }

            return []
        },

        pdfUrl() {
            return `${Config[process.env.NODE_ENV].apiUrl}/pdfs/ownership?vehicle_id=${this.vehicle.id}`
        }
    },

    methods: {
        ...mapActions({
            getTransferLetter: 'Vehicles/getTransferLetter',
            getPrintData: 'Vehicles/getPrintData'
        }),

        endDate(ended_on) {
            if (ended_on) {
                return ended_on;
            }

            return 'Present'
        },

        openTransferLetter(action, ownership_id) {
           this.getTransferLetter({
               ownership_id, action
           }).then(response => {
               window.location.href = response.url;
           }).catch(error => {
               console.log(error);
           })
        },

        printData() {
            this.getPrintData({
                vehicle_id: this.vehicle.id,
                print: 'ownership'
            }).then(response => {
                // console.log(response);
                this.data = response;

                /**
                 * Wait and be the last to be executed
                 */
                setTimeout(() => {
                    this.convertToPDF();
                }, 0);
            }).catch(error => {
                console.log(error);
            });
        },

        convertToPDF() {
            console.log('converting to pdf');
        }
    },

    mounted() {
        console.log(this.pdfUrl)
    }
}
</script>

<style lang="scss" scoped>
// .v-card{
    // box-shadow: none;
    // border: 1px solid #dddddd;
    // background: transparent !important;

    .bullet-line-list{
        li{
            padding-left: 30px;

            &.current{
                &::before{
                    border-color: #61CC99;
                }

                &::after{
                    content: "";
                    position: absolute;
                    border: 8px solid transparent;
                    border-color: transparent transparent #61CC99 transparent;
                    left: -30px;
                    top: 5px;
                    z-index: 10;
                }

                .icon{
                    color: #61CC99 !important;
                }
            }

            &::before{
                border-color: #EE5A5D;
            }

            .icon{
                color: #EE5A5D !important;
            }



        }

         &::after{
            border-color: #ADA0FB !important;
        }
    }
// }
</style>

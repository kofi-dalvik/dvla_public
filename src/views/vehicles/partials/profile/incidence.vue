<template>
    <div class="incidence">
        <div class="card" style="box-shadow:none;">
            <div class="card-body">
                <h4 class="card-title mb-5">Reported Incidents
                    <div class="float-right">
                        <router-link v-if="isDvla" :to="{name: 'vehicle_incidence', query: {chasis: vehicle.chasis_number}}" class="btn btn-warning btn-sm mr-2">
                            <i class="mdi mdi-text"></i> Report Incident
                        </router-link>
                       <a :href="pdfUrl" target="_blank" class="btn btn-primary btn-sm"><i class="mdi mdi-printer"></i> Print</a>
                    </div>
                </h4>

                 <div
                    v-for="(incident, index) in incidents" :key="index"
                    class="d-flex align-items-start profile-feed-item">

                    <img :src="incident.creator.image" alt="profile" class="img-sm rounded-circle">

                    <div class="ml-4">
                        <h6>
                            <div class="badge badge-pill mr-2"
                                    :class="{
                                        'badge-outline-primary': incident.status.name == 'New',
                                        'badge-outline-warning': incident.status.name == 'Pending',
                                        'badge-outline-danger': incident.status.name == 'Open',
                                        'badge-outline-success': incident.status.name == 'Closed'
                                    }">
                                {{ incident.status.name }}
                            </div>
                            {{incident.title}}
                            <small class="ml-4 text-muted"><i class="mdi mdi-clock mr-1"></i>
                                {{ incidents.occurred_at | formattedDateTime }}
                            </small>
                        </h6>
                        <p>
                            {{ incident.description }}
                        </p>

                    <carousel :images="incident.images.filter(item => item.type.type == 'image')" :withBorder="true"></carousel>

                        <p class="small text-muted mt-2 mb-0 actions">
                            <router-link :to="{name: 'vehicle_incidence', query: {vehicle: vehicleId, incident: incident.id}}" href="#">
                                <span>
                                    <i class="mdi mdi-recycle mr-1"></i> view updates
                                </span>
                            </router-link>
                            <span class="ml-3">
                                <i class="mdi mdi-account"></i>Recorded by {{incident.creator.name.toTitleCase()}}
                            </span>
                        </p>
                    </div>
                </div>

                <p class="text-center mt-5" v-if="!incidents.length">No incident associated with this vehicle</p>
            </div>
        </div>
    </div>
</template>

<script>
import Carousel from './../incident/carousel.vue';
import { mapGetters } from 'vuex';
import Config from '../../../../../config';

export default {
    props: ['vehicle'],

    components: {
        Carousel
    },

    computed: {
        ...mapGetters({
            isDvla: 'Auth/isDvla'
        }),

        pdfUrl() {
            return `${Config[process.env.NODE_ENV].apiUrl}/pdfs/incident?vehicle_id=${this.vehicleId}`
        },

        incidents() {
            if (this.vehicle) {
                return this.vehicle.incidents;
            }
            return []
        },

        vehicleId() {
            if (this.vehicle) {
                return this.vehicle.id;
            }
            return null
        }
    }
}
</script>

<style lang="scss">
.actions{
    a{
        text-decoration: none;
    }
}
</style>

<template>
    <table class="table dataTable table-striped no-footer">
        <thead>
            <tr role="row">
                <th>Image</th>
                <th>Chasis Number</th>
                <th>Registration Number</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Type</th>
                <th>Country</th>
                <th v-if="!summary">Owner</th>
                <th v-if="!summary">Contact</th>
                <!-- <th>Created At</th> -->
                <th v-if="!summary"></th>
                <th v-if="isDvla"></th>
            </tr>
        </thead>

        <tbody>
            <tr
                class="hoverable"
                tag="tr"
                role="row"
                v-for="(vehicle, index) in vehicles"
                :key="index">
                <td @click="toProfile(vehicle.id)">
                    <img style="object-fit:cover;" :src="vehicle.image"/>
                </td>

                <td @click="toProfile(vehicle.id)">{{ vehicle.chasis_number }}</td>
                <td @click="toProfile(vehicle.id)">{{ vehicle.registration_number }}</td>
                <td @click="toProfile(vehicle.id)">{{ vehicle.model.make.name}}</td>
                <td @click="toProfile(vehicle.id)">{{ vehicle.model.name}}</td>
                <td @click="toProfile(vehicle.id)">{{ vehicle.year}}</td>
                <td @click="toProfile(vehicle.id)">{{ vehicle.type}}</td>
                <td @click="toProfile(vehicle.id)">{{ vehicle.country.name}}</td>

                <td @click="toProfile(vehicle.id)" v-if="!summary">
                    {{ vehicle.owners && vehicle.owners.length ? vehicle.owners[0].name : 'N/A' }}
                </td>
                <td @click="toProfile(vehicle.id)" v-if="!summary">
                    {{ vehicle.owners && vehicle.owners.length ? vehicle.owners[0].contact : 'N/A' }}
                </td>

                <td v-if="isDvla && !summary">
                    <router-link tag="button" :to="{name: 'register_vehicle', query: {id: vehicle.id}}" class="btn btn-warning btn-action mr-3">
                        <i class="mdi mdi-pencil"></i>
                    </router-link>
                </td>

                <td v-if="isDvla">
                     <router-link tag="button" :to="{name: 'change_vehicle_owner', query: {vehicle_id: vehicle.id}}" class="btn btn-success btn-action mr-3">
                        <i class="mdi mdi-transfer"></i>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ['vehicles', 'summary'],

    computed: {
        ...mapGetters({
            isDvla: 'Auth/isDvla'
        })
    },

    methods: {
        toProfile (id) {
            this.$router.push({
                name: 'vehicle_profile',
                params: {
                    vehicle_id: id
                }
            })
        }
    }
}
</script>
<style lang="scss">
.hoverable{
    cursor: pointer;
    &:hover{
        background: #7973F9 !important;
        color: white;
    }
}
</style>

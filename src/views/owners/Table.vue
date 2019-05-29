<template>
    <table class="table dataTable table-striped no-footer" role="grid">
        <thead>
            <tr role="row">
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Residence</th>
                <th>Postal</th>
                <th>No Of Vehicles</th>
            </tr>
        </thead>

        <tbody>
            <tr
                class="hoverable"
                tag="tr"
                role="row"
                v-for="(owner, index) in owners"
                :key="index">

                <td @click="toProfile(owner.id)">
                    <img style="object-fit:cover;" :src="owner.image"/>
                </td>

                <td @click="toProfile(owner.id)">{{ owner.name }}</td>
                <td @click="toProfile(owner.id)">{{ owner.email}}</td>
                <td @click="toProfile(owner.id)">{{ owner.contact}}</td>
                <td @click="toProfile(owner.id)">{{ owner.residential_address}}</td>
                <td @click="toProfile(owner.id)">{{ owner.postal_address}}</td>
                <td class="text-center" @click="toProfile(owner.id)">{{ owner.vehicles ? owner.vehicles.length : 'N/A'}}</td>

                <!-- <td>
                    <router-link tag="button" :to="{name: 'register_owner', query: {id: owner.id}}" class="btn btn-warning btn-action mr-3">
                        <i class="mdi mdi-pencil"></i>
                    </router-link>
                </td>

                <td>
                     <router-link tag="button" :to="{name: 'change_owner_owner', query: {owner_id: owner.id}}" class="btn btn-success btn-action mr-3">
                        <i class="mdi mdi-transfer"></i>
                    </router-link>
                </td> -->
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['owners'],

    methods: {
        toProfile (id) {
            this.$router.push({
                name: 'owners_profile',
                params: {
                    owner_id: id
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

<template>
    <table class="table dataTable table-striped no-footer" role="grid">
        <thead>
            <tr role="row">
                <th class="sorting">Name</th>
                <th class="sorting">Region</th>
                <th class="sorting">Institution Type</th>
                <th class="sorting">Location</th>
                <th class="sorting">Phone</th>
                <th class="sorting">Actions Level</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr role="row" v-for="(institution, index) in institutions" :key="index">
                <td>{{ institution.name }}</td>
                <td>{{ institution.region.name }}</td>
                <td>{{ institution.institution_type.name}}</td>
                <td>{{institution.location}}</td>
                <td>{{ institution.phone }}</td>

                <td>
                    <button class="btn btn-warning btn-action mr-3" @click="editInstitution(institution)">
                        <i class="mdi mdi-pencil"></i>
                    </button>

                    <button class="btn btn-danger btn-action" @click="deleteInstitution(institution.id)">
                        <i class="mdi mdi-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['institutions'],

    methods: {
        ...mapActions({
            deleteInstitution: 'Institutions/deleteInstitution'
        }),

        editInstitution (item) {
            this.$emit('editInstitution', item);
        }
    }
}
</script>
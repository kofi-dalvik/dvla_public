<template>
    <table class="table dataTable table-striped no-footer" role="grid">
        <thead>
            <tr role="row">
                <th class="sorting">Name</th>
                <th class="sorting">Email</th>
                <th class="sorting">Phone</th>
                <th class="sorting">Role</th>
                <th class="sorting">Institution</th>
                <th class="sorting">Status</th>
                <th class="sorting">Created At</th>
                <th class="sorting">Updated At</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr role="row" v-for="(user, index) in users" :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.role ? user.role.name : "N/A" }}</td>
                <td>{{ user.institution ? user.institution.name : "N/A" }}</td>
                <td>{{ user.status ? user.status.name : "N/A" }}</td>
                <td>{{ user.created_at | formattedDateTime }}</td>
                <td>{{ user.updated_at | formattedDateTime }}</td>
                <td>
                    <button class="btn btn-warning btn-action mr-3" @click="$emit('edit', user)" data-toggle="popover" data-content="Edit User">
                        <i class="mdi mdi-pencil"></i>
                    </button>

                    <button class="btn btn-danger btn-action" @click="$emit('delete', user.id)" data-toggle="popover" data-content="Delete User">
                        <i class="mdi mdi-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ['users']
}
</script>
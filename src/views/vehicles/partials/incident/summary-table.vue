<template>
   <div class="card mb-2" style="border-bottom:1px solid #ddd;box-shadow:none;">
        <div class="card-body">
            <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Occurred At</th>
                        <th>Logged by</th>
                    </tr>
                </thead>
                <tbody v-if="incident">
                    <tr>
                        <td>
                            <span class="badge badge-primary">
                                {{ incident ? incident.type.name : '' }}
                            </span>
                        </td>

                        <td>
                            <label class="badge"
                                :class="{
                                    'badge-primary': incident.status.name == 'New',
                                    'badge-warning': incident.status.name == 'Pending',
                                    'badge-danger': incident.status.name == 'Open',
                                    'badge-success': incident.status.name == 'Closed'
                                }"
                            >{{incident.status.name}}</label>
                        </td>

                         <td>
                            <span class="badge bg-purple">
                                {{ incident.occurred_at | formattedDate }}
                            </span>
                        </td>

                        <td>
                            <span class="badge bg-purple">
                                {{ incident.creator.name.toTitleCase() }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['incident']
}
</script>

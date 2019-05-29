<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">
                <span>Insurances Expiring in this week</span>
                <button type="button" class="btn btn-outline-primary btn-sm btn-fw float-right">
                    <i class="mdi mdi-eye"></i> View All
                </button>
            </h4>
            <div class="d-flex table-responsive">
                <!-- <div class="btn-group mr-2">
                    <button type="button" class="btn btn-light"><i class="mdi mdi-alert-circle-outline"></i></button>
                    <button type="button" class="btn btn-light"><i class="mdi mdi-delete-empty"></i></button>
                </div>

                <div class="btn-group mr-2">
                    <button type="button" class="btn btn-light"><i class="mdi mdi-printer"></i></button>
                </div>
                <div class="btn-group ml-auto mr-2 border-0 d-none d-md-block">
                    <input type="text" class="form-control" placeholder="Search Here">
                </div>

                <div class="btn-group">
                    <button type="button" class="btn btn-light"><i class="mdi mdi-cloud"></i></button>
                    <button type="button" class="btn btn-light"><i class="mdi mdi-dots-vertical"></i></button>
                </div> -->
            </div>
            <div class="table-responsive mt-2">
            <table class="table mt-3 border-top">
                <thead>
                <tr>
                    <th>Vehicle</th>
                    <th>Chasis No.</th>
                    <th>Reg. No</th>
                    <th>Owner</th>
                    <th>Insurance Type</th>
                    <th>Expires In</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(entry, index) in all" :key="index">
                    <td>{{ entry.vehicle | vehicleName }}</td>
                    <td>{{ entry.vehicle.chasis_number }}</td>
                    <td>{{ entry.vehicle.registration_number }}</td>
                    <td>{{ entry.vehicle.owners[0].name }}</td>
                    <td>{{ entry.type.name }}</td>
                    <td>2 days</td>
                    <td>
                        <button class="btn btn-success btn-action mr-3" title="Renew Insurance">
                            <i class="mdi mdi-refresh"></i>
                        </button>
                        <button class="btn btn-warning btn-action" title="Notify Vehicle Owner">
                            <i class="mdi mdi-bell"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <!-- <div class="d-flex align-items-center justify-content-between flex-column flex-sm-row mt-4">
            <p class="mb-3 mb-sm-0">Showing 1 to 20 of 20 entries</p>
            <nav>
                <ul class="pagination pagination-primary mb-0">
                <li class="page-item"><a class="page-link"><i class="mdi mdi-chevron-left"></i></a></li>
                <li class="page-item active"><a class="page-link">1</a></li>
                <li class="page-item"><a class="page-link">2</a></li>
                <li class="page-item"><a class="page-link">3</a></li>
                <li class="page-item"><a class="page-link">4</a></li>
                <li class="page-item"><a class="page-link"><i class="mdi mdi-chevron-right"></i></a></li>
                </ul>
            </nav>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        summary: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            all: [],
            pageDetails: {
                total: 0,
                from: 0,
                to: 0,
                perPage: 0,
                currentPage: 0,
                lastPage: 0
            }
        }
    },

    methods: {
        ...mapActions({
            getInsurances: 'Insurances/getInsurancesExpiring'
        })
    },

    mounted() {
        this.getInsurances()
        .then(response => {
            if (this.summary) {
                this.all = response.data.slice(0, 7);
            } else {
                this.all = response.data;
            }

            this.pageDetails = {
                total: response.total,
                from: response.from,
                to: response.to,
                perPage: response.per_page,
                currentPage: response.current_page,
                lastPage: response.last_page
            };
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>

<style>

</style>

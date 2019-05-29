<template>
    <div class="row">
        <div class="col-md-6 col-lg-3 grid-margin stretch-card">
            <div class="card bg-gradient-primary text-white text-center card-shadow-primary">
            <div class="card-body">
                <h6 class="font-weight-normal">Registered Vehicles</h6>
                <h2 class="mb-0">{{ data.vehicles }}</h2>
            </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 grid-margin stretch-card">
            <div class="card bg-gradient-danger text-white text-center card-shadow-danger">
            <div class="card-body">
                <h6 class="font-weight-normal">Registered Owners</h6>
                <h2 class="mb-0">{{ data.owners }}</h2>
            </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 grid-margin stretch-card">
            <div class="card bg-gradient-warning text-white text-center card-shadow-warning">
            <div class="card-body">
                <h6 class="font-weight-normal">Recorded Incidents</h6>
                <h2 class="mb-0">{{ data.incidents }}</h2>
            </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 grid-margin stretch-card">
            <div class="card bg-gradient-info text-white text-center card-shadow-info">
            <div class="card-body">
                <h6 class="font-weight-normal">Illegal Vehicles</h6>
                <h2 class="mb-0">{{ data.illegal }}</h2>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            data: {}
        }
    },

    methods: {
        ...mapActions({
            getGeneralData: 'Dashboards/getGeneralData'
        }),

        getData() {
            this.getGeneralData().then(response => {
                this.data = response;
            }).catch(error => {
                console.log(error);
            });
        }
    },

    mounted() {
        this.getData();
    }
}
</script>

<style>

</style>

<template>
    <div class="content-wrapper">
      <generals></generals>

      <div class="row">
        <div class="col-lg-8 grid-margin stretch-card">
          <vehicles-expiring-soon :summary="true"></vehicles-expiring-soon>
        </div>

        <div class="col-lg-4 grid-margin stretch-card">
          <recent-incidents></recent-incidents>
        </div>
      </div>

      <incident-types></incident-types>
      <incident-range-rates></incident-range-rates>

      <!-- <div class="row">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Monthly Analytics</h4>
              <p class="card-description">Products that are creating the most revenue and their sales throughout the year and the variation in behavior of sales.</p>
              <div id="js-legend" class="chartjs-legend mt-4 mb-5 analytics-legend"></div>
              <div class="demo-chart">
                <canvas id="dashboard-monthly-analytics"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 grid-margin grid-margin-md-0">
          <div class="card">
            <div class="card-body">
              <div class="wrapper d-flex align-items-center justify-content-start justify-content-sm-center flex-wrap">
                <img class="img-md rounded" src="https://via.placeholder.com/100x100" alt="">
                <div class="wrapper ml-4">
                  <p class="font-weight-medium">Tim Cook</p>
                  <p class="text-muted">timcook@gmail.com</p>
                  <p class="text-info mb-0 font-weight-medium">Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 grid-margin grid-margin-md-0">
          <div class="card">
            <div class="card-body">
              <div class="wrapper d-flex align-items-center justify-content-start justify-content-sm-center flex-wrap">
                <img class="img-md rounded" src="https://via.placeholder.com/100x100" alt="">
                <div class="wrapper ml-4">
                  <p class="font-weight-medium">Sarah Graves</p>
                  <p class="text-muted">Sarah@gmail.com</p>
                  <p class="text-info mb-0 font-weight-medium">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="wrapper d-flex align-items-center justify-content-start justify-content-sm-center flex-wrap">
                <img class="img-md rounded" src="https://via.placeholder.com/100x100" alt="">
                <div class="wrapper ml-4">
                  <p class="font-weight-medium">David Grey</p>
                  <p class="text-muted">David@gmail.com</p>
                  <p class="text-info mb-0 font-weight-medium">Support Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
</template>

<script>
import Partials from './partials';

export default {
  components: {
    ...Partials
  }
}
</script>

<style>

</style>

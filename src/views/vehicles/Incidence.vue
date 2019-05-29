<template>
    <div class="content-wrapper">
          <div class="email-wrapper wrapper">
            <div class="row align-items-stretch" :style="fromProfile">
              <div class="mail-sidebar d-none d-lg-block col-md-2 pt-3 bg-white">
                <div class="menu-bar">
                  <ul class="menu-items">
                    <li class="compose mb-3">
                        <button v-if="isPolice" @click="showNewLogModal(true)" class="btn btn-primary btn-block">New Log</button>
                    </li>
                    <li :class="{'active': currentIncidentType == 'all'}">
                        <a @click.prevent="getVehiclesWithIncidents('all')" href="#">
                            <i class="mdi mdi-playlist-plus"></i> All
                        </a>
                    </li>
                    <li :class="{'active': currentIncidentType == 'accident'}">
                        <a @click.prevent="getVehiclesWithIncidents('accident')" href="#">
                            <i class="mdi mdi-ambulance"></i> Accidents
                        </a>
                    </li>
                    <li :class="{'active': currentIncidentType == 'theft'}">
                        <a @click.prevent="getVehiclesWithIncidents('theft')" href="#">
                            <i class="mdi mdi-motorbike"></i> Theft
                        </a>
                    </li>
                    <li :class="{'active': currentIncidentType == 'vandalism'}">
                        <a href="#" @click.prevent="getVehiclesWithIncidents('vandalism')">
                            <i class="mdi mdi-close-circle"></i> Vandalism
                        </a>
                    </li>
                    <li :class="{'active': currentIncidentType == 'wanted'}">
                        <a href="#" @click.prevent="getVehiclesWithIncidents('wanted')">
                            <i class="mdi mdi-account-location"></i> Wanted
                        </a>
                    </li>
                  </ul>

                </div>
              </div>

              <div class="mail-list-container col-md-3 pt-4 border-right bg-white full-fix">
                <div class="border-bottom px-3">
                  <div class="form-group">
                    <input v-model="filterByVehicle" class="form-control w-100" type="search" placeholder="Search Vehicle">
                  </div>
                   <app-pagination :small="true" :pageDetails="vehiclesPageDetails"></app-pagination>
                </div>

                    <!-- Add .active to li.mail-list -->
                <template v-if="!searchingVehicle">
                        <div
                        class="mail-list"
                        v-for="(vehicle, index) in vehicles"
                        :key="index"
                        :class="{'active': selectedVehicle && selectedVehicle.id == vehicle.id}"
                        @click="getVehicleIncidents(vehicle)">

                    <img :src="vehicle.image" class="vehicle-img">
                        <div class="content">
                            <p class="sender-name">{{vehicle | vehicleName }}</p>
                            <p class="message_text mt-2">
                                {{`
                                    (${vehicle.country ? vehicle.country.name : ''})
                                    ${vehicle.owners && vehicle.owners.length ? vehicle.owners[0].name : 'N/A'}
                                `}}
                            </p>
                        </div>
                        <div class="details">
                            <i class="mdi mdi-star-outline"></i>
                        </div>
                    </div>

                    <p class="mt-5 text-center" v-if="!vehicles.length">No vehicle found for {{currentIncidentType.toTitleCase()}}</p>
                </template>

                <div class="text-center mt-5" v-else>
                    <item-loader></item-loader>
                </div>

              </div>

              <div class="mail-view d-none d-md-block col-md-9 col-lg-7 bg-white full-fix">
                <div class="row">
                  <div class="col-md-12 mb-4 mt-4">
                    <div class="btn-toolbar" >
                        <div class="row justify-content-between" style="width:100%;">
                            <div class="col-md-4">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="filter by date range">
                                    <div class="input-group-append">
                                        <button class="btn btn-sm btn-primary" type="button">
                                            <i class="mdi mdi-calendar"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 text-right">
                               <app-pagination @navigate="fetchPage" :small="true" :pageDetails="incidents.pageDetails"></app-pagination>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div class="message-body" v-if="selectedVehicle">
                  <div class="sender-details">
                    <router-link
                        tag="img"
                        :to="{name: 'vehicle_profile', params: {vehicle_id: selectedVehicle ? selectedVehicle.id : null}}"
                        class="img-sm rounded-circle mr-3"
                        style="cursor:pointer;"
                        :src="selectedVehicle.image" alt=""/>

                    <div class="details">
                      <p class="msg-subject">
                        {{ selectedVehicle | vehicleName }}
                      </p>
                      <p class="sender-email">
                        {{ selectedVehicle | ownerInfo }}
                      </p>
                    </div>
                  </div>
                  <div class="message-content" style="padding:0;">
                    <div class="text-center mt-5" v-if="incidents.loading">
                        <item-loader></item-loader>
                    </div>
                    <template v-else>
                        <div class="table-responsive" v-if="incidents.all.length">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(incident, index) in incidents.all" :key="index">
                                        <td>{{incident.occurred_at | formattedDateTime}}</td>
                                        <td>{{ incident.type.name}}</td>
                                        <td> {{ incident.title }}</td>
                                        <td>
                                            <span class="badge"
                                                style="font-size:11px;"
                                                :class="{
                                                    'badge-primary': incident.status.name == 'New',
                                                    'badge-warning': incident.status.name == 'Pending',
                                                    'badge-danger': incident.status.name == 'Open',
                                                    'badge-success': incident.status.name == 'Closed'
                                                }"
                                            >{{ incident.status.name }}</span>
                                        </td>
                                        <td>
                                            <button @click="showViewLog(true, incident)" class="btn btn-primary btn-sm">
                                                <i class="mdi mdi-eye"></i> view
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="mt-5 text-center" v-else>No Incident Found</p>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <modal
            :show="showNewLog"
            :medium="true"
            title="Log A New Incidence"
            ok-text="Submit"
            @ok="createLog"
            :closeWhenOK="false"
            @cancel="showNewLogModal(false)">
              <template>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group" :class="{'has-danger': errors.has('vehicle_number')}">
                            <label>Search for vehicle, enter registration number</label>
                            <div class="input-group">
                                <input
                                    v-model="vehicle_number"
                                    @input="findByRegNumber"
                                    v-validate="'required'"
                                    name="vehicle_number"
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter Vehicle Reg. Number">
                            </div>
                            <error-label :message="errors.first('vehicle_number')"></error-label>
                        </div>
                    </div>
                </div>

                <div class="row mb-5" v-if="vehicle && !searchingVehicle">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center">
                            <img style="height:36px;width:36px;object-fit:cover;" :src="vehicle.image" alt="profile">
                            <div class="ml-3">
                            <p class="mb-2">{{vehicle | vehicleName }}</p>
                            <p class="mb-0 text-muted text-small">{{`${vehicle.type} ${vehicle.country ? '(' + vehicle.country.name + ')': ''}`}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex align-items-center">
                            <img style="height:36px;width:36px;object-fit:cover;" :src="currentOwner.image" alt="profile">
                            <div class="ml-3">
                            <p class="mb-2">{{currentOwner.name}}</p>
                            <p class="mb-0 text-muted text-small">{{currentOwner.contact}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="text-center mb-4 text-danger" v-if="vehicleNotFound">No vehicle with number: {{vehicle_number.toUpperCase()}} was found</p>

                <div class="text-center" v-if="loader">
                    <item-loader></item-loader>
                </div>

                <template v-if="vehicle && !searchingVehicle">
                    <div class="form-group" :class="{'has-danger': errors.has('title')}">
                        <label>Title</label>
                        <input
                            v-model="newLog.title"
                            name="title"
                            v-validate="'required'"
                            type="text"
                            class="form-control"
                            placeholder="Enter Title">
                        <error-label :message="errors.first('title')"></error-label>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group select2-wrapper" :class="{'has-danger': !!verrors.incident_type}">
                                <label>Which type of incidence is this?</label>
                                <select ref="incident_type" class="form-control select-2">
                                    <option value=""></option>
                                    <option v-for="(incident, index) in incidentTypes" :key="index" :value="incident.id">
                                        {{incident.name}}
                                    </option>
                                </select>
                                <error-label :message="verrors.incident_type"></error-label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group" :class="{'has-danger': errors.has('occurred_at')}">
                                <label>When did this occurr</label>
                                <input
                                    v-model="newLog.occurred_at"
                                    name="occurred_at"
                                    v-validate="'required'"
                                    type="date"
                                    class="form-control"
                                    placeholder="Enter Date">
                                <error-label :message="errors.first('occurred_at')"></error-label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" :class="{'has-danger': errors.has('description')}">
                        <label>Describe this incident</label>
                        <textarea
                            class="form-control"
                            v-model="newLog.description"
                            v-validate="'required'"
                            name="description"
                            placeholder="Enter description for this incident"
                            rows="5">
                        </textarea>
                        <error-label :message="errors.first('description')"></error-label>
                    </div>

                    <div class="form-group img-inputs">
                        <input @change="uploadImage($event, 'one')" type="file" accept="image/*" id="img1">
                        <input @change="uploadImage($event, 'two')" type="file" accept="image/*" id="img2">
                        <input @change="uploadImage($event, 'three')" type="file" accept="image/*" id="img3">
                        <input @change="uploadImage($event, 'four')" type="file" accept="image/*" id="img4">
                        <input @change="uploadImage($event, 'five')" type="file" accept="image/*" id="img5">
                    </div>

                    <div class="form-group">
                        <label>Upload some photos of this event (optional, max: 5)</label>
                        <div class="img-previews">
                            <label for="img1">
                                <img v-if="preview.one" :src="preview.one">
                                <span v-else>Click to select</span>
                            </label>
                            <label for="img2">
                                <img v-if="preview.two" :src="preview.two">
                                <span v-else>Click to select</span>
                            </label>
                            <label for="img3">
                                <img v-if="preview.three" :src="preview.three">
                                <span v-else>Click to select</span>
                            </label>
                            <label for="img4">
                                <img v-if="preview.four" :src="preview.four">
                                <span v-else>Click to select</span>
                            </label>
                            <label for="img5">
                                <img v-if="preview.five" :src="preview.five">
                                <span v-else>Click to select</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Upload Audio Description (This is optional)</label>
                        <input type="file" @change="uploadOtherMedia($event, 'audio')" class="form-control" accept="audio/*" />
                    </div>

                    <div class="form-group">
                        <label>Upload Video Description (This is optional)</label>
                        <input type="file" @change="uploadOtherMedia($event, 'video')" class="form-control" accept="video/*" />
                    </div>
                </template>
              </template>
          </modal>

          <modal
            :show="viewLog"
            :large="true"
            title="View Incident which occured at today"
            :closeWhenOK="true"
            bodyClass="modal-bg"
            :showOkButton="false"
            cancelText="Close"
            @cancel="showViewLog(false)">
            <template>
                <div class="row" style="margin-top:-30px;" v-if="selectedIncident">
                    <div class="col-md-5">

                        <div class="card v-card mb-2">
                            <div class="card-body">
                                <h4 class="card-title">Incident</h4>
                                <ul class="bullet-line-list">
                                    <li>
                                        <h6>Title</h6>
                                        <p class="ml-4">{{ selectedIncident.title }}</p>
                                    </li>
                                    <li>
                                        <h6>Description</h6>
                                        <p class="ml-4">{{ selectedIncident.description }}</p>
                                    </li>
                                    <li>
                                        <h6>Vehicle</h6>
                                        <div class="list d-flex align-items-center py-3">
                                            <img class="img-sm rounded-circle" :src="selectedIncident.vehicle.image" alt="">
                                            <div class="wrapper w-100 ml-3">
                                            <p>{{ selectedIncident.vehicle | vehicleName }}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <h6>Current Owner</h6>
                                        <div class="list d-flex align-items-center py-3">
                                            <img class="img-sm rounded-circle" :src="selectedIncident.vehicle.owners[0].image" alt="">
                                            <div class="wrapper w-100 ml-3">
                                            <p>{{ selectedIncident.vehicle | ownerInfo }}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="card v-card" v-if="isPolice">
                            <div class="card-body">
                            <h4 class="card-title">Create Update to This Incident</h4>
                            <form @submit.prevent="createUpdate" class="forms-sample" data-vv-scope="createUpdate">

                                <div class="form-group" :class="{'has-danger': errors.has('location')}">
                                    <label>Location</label>
                                    <input v-model="update.location" v-validate="'required'" name="location" type="text" class="form-control" placeholder="Location">
                                    <error-label :message="errors.first('location')"></error-label>
                                </div>

                                <div class="form-group" :class="{'has-danger': errors.has('details')}">
                                    <label>Details</label>
                                    <textarea rows="5" v-model="update.details" v-validate="'required'" name="details" class="form-control" placeholder="Details"></textarea>
                                    <error-label :message="errors.first('details')"></error-label>
                                </div>

                                <button type="submit" class="btn btn-success mr-2">Update</button>
                            </form>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-7">
                        <summary-table :incident="selectedIncident"></summary-table>

                        <carousel :images="selectedIncident.images.filter(item => item.type.type == 'image')"></carousel>

                        <div class="card mb-2" v-for="(media, index) in getMedia(selectedIncident.images)" :key="index">
                            <div class="card-body">
                                <h4 class="card-title">Uploaded Audio</h4>
                                <audio v-if="media.type.type == 'audio'" controls="controls" id="audio_player">
                                    <source :src="media.name" :type="media.type.mime" />
                                    <source :src="media.name" :type="media.type.mime" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>

                        <div class="card v-card">
                            <div class="card-body">
                                <h4 class="card-title d-flex justify-content-between align-items-center">
                                    <span>Updates On Incident</span>
                                    <div class="btn-group" role="group" v-if="isPolice">
                                        <button v-if="selectedIncident.status.name != 'Closed'" @click="updateIncidentStatus('Closed')"  type="button" class="btn btn-success btn-sm">
                                            <i class="mdi mdi-lock-outline"></i> Close Incident
                                        </button>
                                        <button v-if="selectedIncident.status.name == 'Closed'" @click="updateIncidentStatus('Open')" type="button" class="btn btn-danger btn-sm">
                                            <i class="mdi mdi-lock-open-outline"></i> Open Incident
                                        </button>
                                    </div>
                                </h4>
                                <ul class="bullet-line-list">
                                    <li v-for="(incidentUpdate, index) in incidentUpdates" :key="index">
                                        <h6>
                                            <span class="badge bg-tertiary mr-3">
                                                {{ incidentUpdate.created_at | formattedDateTime }}
                                            </span>
                                            {{ incidentUpdate.location.toTitleCase() }}
                                        </h6>
                                        <p class="mb-0">{{incidentUpdate.details}}</p>
                                        <p class="text-muted">
                                            <i class="mdi mdi-clock-outline"></i>
                                            {{ `Updated ${dateSinceIncident(incidentUpdate.created_at)} since incident was reported` }}
                                        </p>
                                    </li>
                                </ul>

                                <p class="text-center" v-if="!incidentUpdates.length">No updated reported for this incident</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
          </modal>
        </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import Modal from '@/components/partials/Modal.vue';
import Carousel from './partials/incident/carousel.vue';
import SummaryTable from './partials/incident/summary-table.vue';

export default {
    components: {
        Modal,
        Carousel,
        SummaryTable,
    },

    data () {
        return {
            showNewLog: false,
            viewLog: false,
            currentIncidentType: 'all',

            //forms
            filterByVehicle: '',
            filterDate: '',
            vehicle_number: '',
            loader: false,

            newLog: {
                title: '',
                description: '',
                occurred_at: '',
                incident_type_id: '',
                images: {
                    one: '',
                    two: '',
                    three: '',
                    four: '',
                    five: '',
                },
                other_media: {
                    audio: '',
                    video: '',
                }
            },

            vehicle: null,
            searchingVehicle: false,
            vehicleNotFound: null,

            verrors: {
                incident_type: ''
            },

            preview: {
                one: '',
                two: '',
                three: '',
                four: '',
                five: ''
            },
            selectedVehicle: null,

            selectedIncident : null,
            incidentUpdates: [],

            incidents: {
                all: [],
                loading: false,
                pageDetails: {
                    total: 0,
                    from: 0,
                    to: 0,
                    perPage: 0,
                    currentPage: 0,
                    lastPage: 0
                }
            },

            update: {
                location: '',
                details: ''
            }
        }
    },

    computed: {
        ...mapGetters({
            vehicles: 'Incidents/getVehicles',
            incidentTypes: 'Incidents/getTypes',
            vehiclesPageDetails: 'Incidents/getVehiclesPageDetails',
            isInsurance: 'Auth/isInsurance',
            isPolice: 'Auth/isPolice'
        }),

        /**
         * Gets the current owner of vehicle
         *
         * @returns {Object}
         */
        currentOwner () {
            if (this.vehicle && this.vehicle.owners && this.vehicle.owners.length) {
                return this.vehicle.owners[0];
            } else {
                return {}
            }
        },

        fromProfile() {
            if (this.$route.query.vehicle && this.$route.query.incident) {
                return {
                    visibility: 'hidden'
                }
            }
        }
    },

    watch: {
        /**
         * Calls to filter vehicles
         *
         * @returns {Undefined}
         */
        filterByVehicle () {
            this.filterVehicle();
        }
    },

    methods: {
        ...mapActions({
            store: 'Incidents/store',
            updateStatus: 'Incidents/update',
            searchVehicle: 'Vehicles/getVehicles',
            updateIncident: 'Incidents/createUpdate',
            fetchIncidents: 'Incidents/getIncidents',
            getIncidentVehicles: 'Incidents/getVehicles',
            getIncidentUpdates: 'IncidentUpdates/index',
        }),

        /**
         * Compares time from another time
         *
         * @param {String} date
         * @returns {Object}
         */
        dateSinceIncident(date) {
            let from = moment(this.selectedIncident.created_at);
            let to = moment(date);
            return to.from(from);
        },

        /**
         * Updates the status of incidents
         *
         * @param {String} status
         * @returns {Undefined}
         */
        updateIncidentStatus(status) {
            console.log('incident will be ' + status)
            this.updateStatus({id: this.selectedIncident.id, data: { status }})
            .then(response => {
                this.selectedIncident.status.name = status;
                this.incidentUpdates.unshift(response);
                this.notify('Incident status is now ' + status);
                console.log(response)
            }).catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        },

        /**
         * Creates update to an incident
         *
         * @returns {Undefined}
         */
        createUpdate() {
            this.$validator.validate('createUpdate.*').then(result => {
                if (result) {
                    this.update.incident_id = this.selectedIncident.id;

                    this.updateIncident(this.update).then(response => {
                        // console.log(response)
                        this.incidentUpdates.unshift(response);
                        this.$validator.reset({scope: 'createUpdate'});
                    }).catch(error => {
                        this.notify(this.buildErrors(error), 'error')
                        console.log(error);
                    });
                }
            })
        },

        /**
         * Fetches incidents by a given incident
         *
         * @param {Object} query
         * @returns {Undefined}
         */
        fetchPage (query) {
            // return console.log(query);
            this.getVehicleIncidents(this.selectedVehicle, query);
        },

        /**
         * Gets incidents for selected vehicle
         *
         * @param {Number} vehicle_id
         * @returns {Undefined}
         */
        getVehicleIncidents(vehicle, query = {}) {
            this.selectedVehicle = vehicle;
            this.incidents.loading = true;
            this.fetchIncidents({
                vehicle_id: vehicle.id,
                order: [{occurred_at: 'desc'}],
                paginate: true,
                per_page: 50,
                ...query
            }).then(response => {
                this.incidents.all = response.data;
                this.incidents.pageDetails = {
                    total: response.total,
                    from: response.from,
                    to: response.to,
                    perPage: response.per_page,
                    currentPage: response.current_page,
                    lastPage: response.last_page
                }
                this.incidents.loading = false;

               if (this.$route.query.incident) {
                    let incident = this.incidents.all.find(item => {
                        return item.id == this.$route.query.incident;
                    })

                    this.showViewLog(true, incident);
               }
                // console.log(response.data);
            }).catch(error => {
                this.incidents.loading = false;
                this.notify(this.buildErrors(error), 'error');
                console.log(error);
            })
        },

        /**
         * Gets list of vehicles with incidents
         *
         * @param {String} type
         * @returns {Undefined}
         */
        getVehiclesWithIncidents(type, vehicle_id = null) {
            this.currentIncidentType = type;
            this.searchingVehicle = true;
            let params = {
                incident_type: type.toLowerCase(),
                per_page: 10,
                keyword: this.filterByVehicle
            }

            if (vehicle_id) {
                params.vehicle_id = vehicle_id;
            }
            // setTimeout(() => {
                this.getIncidentVehicles(params).then(response => {
                    this.searchingVehicle = false;
                    // console.log(response);
                    if (vehicle_id && response && response.data.length) {
                        this.getVehicleIncidents(response.data[0]);
                    }
                }).catch(error => {
                    this.selectedVehicle = false;
                    this.notify(this.buildErrors(error), 'error');
                    console.log(error);
                });
            // }, 4000);
        },

        /**
         * Filters incident vehicles by search term
         * Uses lodash debounce method
         *
         * @return {Undefined}
         */
        filterVehicle: _.debounce(function (params) {
            this.getVehiclesWithIncidents(this.currentIncidentType);
        }, 1000),

        /**
         * Finds vehicle by given registration number
         *
         * @returns {Undefined}
         */
        findByRegNumber: _.debounce(function () {
            this.searchForVehicleByNumber();
        }, 1000),

        searchForVehicleByNumber() {
            this.vehicle = null;

            if (this.vehicle_number) {
                this.searchingVehicle = true;
                this.vehicleNotFound = false;
                this.loader = true;

                // setTimeout(() => {
                    this.searchVehicle({chasis_number: this.vehicle_number}, true).then(response => {
                        // console.log(response);
                        if (response && response.length) {
                            this.vehicle = response[0];
                            this.vehicleNotFound = false;
                        } else {
                            this.vehicleNotFound = true;
                        }
                        this.searchingVehicle = false;
                        this.loader = false;
                    }).catch(error => {
                        this.loader = false;
                        this.searchingVehicle = false;
                        this.vehicleNotFound = true;
                        this.notify(this.buildErrors(error), 'error');
                        console.log(error);
                    });
                // }, 5000);
            }
        },

        /**
         * Filters incident vehicles by date range
         *
         * @returns {Undefined}
         */
        filterLogsByDate () {

        },

        /**
         * Shows log details modal
         *
         * @param {Boolean} show
         * @returns {Undefined}
         */
        showViewLog(show, log) {
            if (show && log) {
                this.selectedIncident = log;
                this.incidentUpdates = [];
                // console.log(log)
                // console.log('fetching updates for ' + log.id)
                this.getIncidentUpdates({incident_id: log.id}).then(response => {
                    // console.log(response)
                    this.incidentUpdates = response;
                    this.viewLog = show;
                }).catch(error => {
                    this.notify(this.buildErrors(error), 'error');
                    console.log(error);
                });
            } else {
                this.selectedIncident = null;
                this.incidentUpdates = [];
                this.viewLog = false;

                if (this.$route.query.vehicle && this.$route.query.incident) {
                    this.$router.go(-1);
                }
            }
        },

        /**
         * Opens the new log modal
         *
         * @param {Boolean} show
         * @returns {Undefined}
         */
        showNewLogModal (show) {
            this.showNewLog = show;
        },

        /**
         * Creates new log for given vehicle
         *
         * @returns {Undefined}
         */
        createLog () {
            if (!this.vehicle) {
                return alert('vehicle is not found')
            }

            this.$validator.validateAll().then(result => {
                if (result) {
                    this.newLog.incident_type_id = this.$refs.incident_type.value;
                    this.newLog.vehicle_id = this.vehicle.id;
                    let data = this.parseNewLogDataToFormData();
                    // console.log(this.newLog)
                    this.store(data).then(response => {
                        // console.log(response);
                        this.showNewLog = false;
                        this.resetForm();
                    }).catch(error => {
                        this.notify(this.buildErrors(error), 'error');
                        console.log(error);
                    });
                }
            })
        },

        getMedia(images) {
            return images.filter(item => item.type.type == 'video' || item.type.type == 'audio');
        },

        resetForm () {
            this.vehicle = null;
            this.vehicleNotFound = false;

            this.newLog = {
                title: '',
                description: '',
                occurred_at: '',
                incident_type_id: '',
                images: {
                    one: '',
                    two: '',
                    three: '',
                    four: '',
                    five: ''
                },
                other_media: {
                    audio: '',
                    video: ''
                }
            }

            this.preview = {
                one: '',
                two: '',
                three: '',
                four: '',
                five: ''
            }

            this.vehicle_number = '';
            this.errors.clear();
        },

        /**
         * Converts newLog data from json to formData
         *
         * @returns {Object}
         */
        parseNewLogDataToFormData () {
            let formData = new FormData();
            for (let key in this.newLog) {
                if (key == 'images') {
                    for (let img in this.newLog.images) {
                        if (this.newLog.images[img]) {
                            formData.append(`img_${img}`, this.newLog.images[img]);
                        }
                    }
                } if (key == 'other_media') {
                    for (let media in this.newLog.other_media) {
                        if (this.newLog.other_media[media]) {
                            formData.append(media, this.newLog.other_media[media]);
                        }
                    }
                } else {
                    if (this.newLog[key]) {
                        formData.append(key, this.newLog[key]);
                    } else {
                        formData.append(key, '');
                    }
                }
            }

            return formData;
        },

        uploadImage(event, placeholder) {
            let files = event.target.files
            if (files && files[0]) {

                this.newLog.images[placeholder] = files[0];

                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview[placeholder] = e.target.result
                }

                reader.readAsDataURL(files[0])
            }
        },

        uploadOtherMedia(event, placeholder) {
            let files = event.target.files
            if (files && files[0]) {
                this.newLog.other_media[placeholder] = files[0];
            }
        },

        init() {
            if (this.$route.query.vehicle && this.$route.query.incident) {
                this.getVehiclesWithIncidents('all', this.$route.query.vehicle);
            } else {
                this.getVehiclesWithIncidents('all');
            }

            if (this.$route.query.chasis) {
                this.vehicle_number = this.$route.query.chasis;
                this.showNewLogModal(true);
                this.searchForVehicleByNumber();
            }
        }
    },

    mounted () {
        this.init();
    }
}
</script>

<style lang="scss">
.full-fix{
    height: 80vh !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}
.vehicle-img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #dddddd;
    display: inline-block;
    margin-right: 10px;
    /* position: relative; */
    /* top: -5px; */
}
.mail-list{
    cursor: pointer;
    padding: 10px auto;
}

.mail-list:hover{
    background: #E5E8EC;
}

.mail-list.active{
    background: #7200FA;
    color: white;
}

.img-inputs{
    display: none;
}

.img-previews{
    display: flex;
    justify-content: center;

    label{
        display: inline-flex;
        height: 100px;
        width: 100%;
        border-radius: 10px;
        margin: 10px;
        cursor: pointer;
        border: 3px dashed #dddddd;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;

        &:hover{
            border-style: solid;
            background: #eeeeee;
        }

        span{
            color: grey;
            font-size: 12px;
            // display: none;
        }

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
            // display: none;
        }
    }
}

.v-card{
    // background: #eeeeee;
    box-shadow: none;
    // border: 1px solid #dddddd;
    // border-radius: 0;
    // padding: 0;

    .card-body{
        // padding: ;
    }
}

.bullet-line-list{
    &::after{
        border-color: #dddddd;
    }
}

.bg-tertiary{
    background: #dddddd;
}

.modal-bg{
    background: #F3F3F9;
}
</style>

<template>
<div class="app-tab">
        <ul class="nav nav-tabs" role="tablist">

        <li class="nav-item">
            <a href="#"
                class="nav-link"
                @click.prevent="switchTab('existing')"
                :class="{'bg-white': currentTab == 'existing'}">
                Existing Owner
            </a>
        </li>

            <li class="nav-item">
            <a href="#"
                class="nav-link"
                @click.prevent="switchTab('non_existing')"
                :class="{'bg-white': currentTab == 'non_existing'}">
                Non Existing Owner
            </a>
        </li>
    </ul>

    <div class="app-tab-content">
        <div class="tab-pane" v-if="currentTab == 'non_existing'">
            <template>

                <upload-image
                    id="owner_image"
                    v-model="newOwner.image"
                    @onPreview="(event) => $emit('onPreviewImage', event)"
                ></upload-image>

                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group" :class="{'has-danger': errors.has('owner_name')}">
                            <label>Full Name</label>
                            <input v-model="newOwner.name" v-validate="'required'" name="owner_name" type="text" class="form-control" placeholder="Enter Full Name here">
                            <error-label :message="errors.first('owner_name')"></error-label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group" :class="{'has-danger': errors.has('place_of_work')}">
                            <label>Place Of work</label>
                            <input v-model="newOwner.place_of_work" name="place_of_work" v-validate="'required'" type="text" class="form-control" placeholder="Enter place of work">
                            <error-label :message="errors.first('place_of_work')"></error-label>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group" :class="{'has-danger': errors.has('contact')}">
                            <label>Contact</label>
                            <input v-model="newOwner.contact" name="contact" v-validate="'required'" type="text" class="form-control" placeholder="Enter Contact Here">
                            <error-label :message="errors.first('contact')"></error-label>
                        </div>
                    </div>
                <div class="col-12 col-md-6">
                        <div class="form-group" :class="{'has-danger': errors.has('email')}">
                            <label>Email</label>
                            <input v-model="newOwner.email" name="email" v-validate="'required|email'" type="text" class="form-control" placeholder="Enter email here">
                            <error-label :message="errors.first('email')"></error-label>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group" :class="{'has-danger': errors.has('postal_address')}">
                            <label>Postal Address</label>
                            <input v-model="newOwner.postal_address" v-validate="'required'" name="postal_address" type="text" class="form-control" placeholder="Enter Owner's Postal Address Here">
                            <error-label :message="errors.first('postal_address')"></error-label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group" :class="{'has-danger': errors.has('residential_address')}">
                            <label>Residential Address</label>
                            <input v-model="newOwner.residential_address" name="residential_address" type="text" class="form-control" v-validate="'required'" placeholder="Enter Owner's Residential Address Here">
                            <error-label :message="errors.first('residential_address')"></error-label>
                        </div>
                    </div>
                </div>

                <div class="form-group" :class="{'has-danger': errors.has('transfer_letter')}">
                    <label>Upload Transfer Letter</label>
                    <div class="d-flex" style="height:50px;">
                        <input v-model="transerLetterText" v-validate="'required'" disabled name="transfer_letter" type="text" class="form-control disabled" placeholder="Upload Transfer Letter">
                        <label
                            for="transfer-letter"
                            class="btn btn-primary d-flex justify-content-center align-items-center"
                            style="height:50px;width:50px;border-radius:50%;">
                            <i class="mdi mdi-file"></i>
                        </label>
                    </div>
                    <input @change="uploadTransferLetter" type="file" id="transfer-letter" style="display:none" accept="application/pdf,application/doc,application/docx">
                </div>
            </template>
        </div>

        <div class="tab-pane" v-if="currentTab == 'existing'">
            <p class="text-center">Search for an existing owner</p><br>
            <label>Enter Name, email or phone</label>

            <div class="row">
                <div class="col-md-8">
                    <div class="form-group d-flex mb-5">
                        <input type="text" v-model="existing_owner" class="form-control search" placeholder="Enter Keyword">
                        <button type="button" @click.prevent="searchOwner" class="btn btn-primary search">Search <i class="mdi mdi-search"></i></button>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group" style="margin-top:-25px;" :class="{'has-danger': errors.has('transfer_letter')}">
                        <label>Upload Transfer Letter</label>
                        <div class="d-flex" style="height:50px;">
                            <input v-model="transerLetterText" v-validate="'required'" disabled name="transfer_letter" type="text" class="form-control disabled" placeholder="Upload Transfer Letter">
                            <label
                                for="transfer-letter"
                                class="btn btn-primary d-flex justify-content-center align-items-center"
                                style="height:50px;width:50px;border-radius:50%;">
                                <i class="mdi mdi-file"></i>
                            </label>
                        </div>
                        <input @change="uploadTransferLetter" type="file" id="transfer-letter" style="display:none" accept="application/pdf,application/doc,application/docx">
                    </div>
                </div>
            </div>

            <div class="table-responsive" v-if="searchedOwners.length">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="pt-1 pl-0"> Owners </th>
                            <th class="pt-1"> Name </th>
                            <th class="pt-1"> Email </th>
                            <th class="pt-1"> Contact </th>
                            <th class="pt-1"> Residential Address </th>
                            <th class="pt-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in searchedOwners"
                            :key="index" class="owner-row"
                            :class="{
                                'active': selectedOwner && selectedOwner.id == item.id
                            }">
                            <td class="py-1 pl-0">
                                <img class="ml-3" style="height:90px;width:90px;" :src="item.image" alt="profile">
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.email}}</td>
                            <td>{{item.contact}}</td>
                            <td>{{item.residential_address}}</td>
                            <td>
                                <button type="button" class="btn btn-success btn-sm" @click="selectOwner(item)">
                                    <i class="mdi mdi-check-circle"></i> Select
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="text-center mt-5" v-if="searchedOwnersNotFound">
                No result matches your search
            </p>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        shouldValidate: {
            type: Boolean,
            default: false
        },

        currentOwner: {
            type: [Object, null],
            default: null
        }
    },

    data () {
        return {
            existing_owner: '',
            transerLetterText: '',
            newOwner: {
                name: '',
                email: '',
                image: '',
                contact: '',
                place_of_work: '',
                postal_address: '',
                transfer_letter: '',
                residential_address: '',
            },
            currentTab: 'existing',

            searchedOwners: [],
            selectedOwner: null,
            searchedOwnersNotFound: false
        }
    },

    watch: {
        /**
         * Watches on the validate prop
         *
         * @returns {Undefined}
         */
        shouldValidate () {
            if (this.shouldValidate) {
                this.validateForm();
            }
        }
    },

    methods: {
        ...mapActions({
            queryForOwners: 'Owners/search'
        }),

        /**
         * Selects an owner item and emits
         *
         * @param {Object} item
         * @returns {Undefined}
         */
        selectOwner (item) {
            if (this.currentOwner && this.currentOwner.id == item.id) {
                this.notify('This person already owns this vehicle', 'error');
                this.selectedOwner = null;
                this.$emit('onSelectedOwner', null);
            } else {
                this.selectedOwner = item;
                // this.newOwner = item;
                this.$emit('onSelectedOwner', item);
            }

        },

        /**
         * Switches tab and performs some cool stuffs
         *
         * @param {String} tab
         * @returns {Undefined}
         */
        switchTab (tab) {
            this.currentTab = tab;
            this.$emit('onTabChange', tab);
        },

        /**
         * Searches for owner by keyword
         *
         * @return {Undefined}
         */
        searchOwner () {
            if (!this.existing_owner) return;

            this.queryForOwners({keyword: this.existing_owner})
            .then(response => {
                // console.log(response);
                this.searchedOwnersNotFound = response.length ? false : true;
                this.searchedOwners = response;
            }).catch(error => {
                this.notify(this.buildErrors(error), 'error');
            })
        },

        /**
         * Validates form
         *
         * @returns {Undefined}
         */
        validateForm (silent = false) {
            if (this.currentTab == 'existing') {
                if (!silent) {
                    if (!this.selectedOwner) {
                        this.notify('You must select the person to change ownership to', 'error');
                    }
                }

                let response = !!this.selectedOwner;

                if (response && !this.selectedOwner.transfer_letter) {
                    this.notify('Please upload the transfer letter, its required', 'error');
                    response = false;
                }

                this.$emit('onDoneValidating', {
                    valid: response,
                    payload: this.selectedOwner,
                    silent
                });
            } else {
                this.$validator.validateAll().then(result => {
                    if (!silent) {
                        if (!result) {
                            this.notify('All fields are required, make sure you provide the fields to register a new owner', 'error');
                        }
                    }

                    this.$emit('onDoneValidating', {
                        valid: result,
                        payload: this.newOwner,
                        silent
                    });
                }).catch(() => {});
            }
        },

        /**
         * Uploads transfre letter
         *
         * @param {Object} event
         * @returns {Undefined}
         */
        uploadTransferLetter (event) {
            let files = event.target.files;

            if (files && files[0]) {

                if (files[0].size > Math.pow(10, 6)) {
                    this.transerLetterText = `${files[0].name} - (${Number(files[0].size / Math.pow(10, 6)).toFixed(2)} MB)`;
                } else if (files[0].size > Math.pow(10, 3)) {
                    this.transerLetterText = `${files[0].name} - (${Number(files[0].size / Math.pow(10, 3)).toFixed(2)} KB)`;
                } else {
                     this.transerLetterText = `${files[0].name} - (${Number(files[0].size).toFixed(2)} Bytes)`;
                }

                this.newOwner.transfer_letter = files[0];

                if (this.selectedOwner) {
                    this.selectedOwner.transfer_letter = files[0];
                }
            } else {
                this.newOwner.transfer_letter = null;
                this.transerLetterText = '';

                if (this.selectedOwner) {
                    this.selectedOwner.transfer_letter = '';
                }
            }

            this.validateForm(true);
        },
    }
}
</script>

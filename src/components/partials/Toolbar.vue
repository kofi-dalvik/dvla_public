<template>
    <div class="row">
        <div class="col-sm-12 col-md-4">
            <div class="dataTables_length" id="order-listing_length">
                <label>Per page</label>
                <select
                    class="form-control"
                    v-model="show">
                        <option
                            v-for="i in 10"
                            :key="i"
                            :value="i * 5">
                                {{ i * 5 }}
                        </option>
                </select>
            </div>
        </div>

        <div class="col-sm-12 col-md-8">
            <div id="order-listing_filter" class="dataTables_filter">
                <div class="input-group mb-3">
                    <input type="text"
                        class="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-add"
                        v-model="keyword"
                        @keyup.enter="$emit('search', keyword)">

                    <div class="input-group-append">
                        <button class="btn btn-info" type="button" @click.prevent.stop="$emit('search', keyword)"><i class="mdi mdi-magnify"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: 20,
                keyword: ''
            }
        },

        watch: {
            show(value) {
                this.$emit('show', value);
            }
        }
    }
</script>

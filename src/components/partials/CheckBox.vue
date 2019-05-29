<template>
    <div class="app-check-box a-center" @click="check">
        <label class="mr-1" style="margin-top:5px;" v-if="label">{{ label }}</label>
        <i class="mdi mdi-checkbox-marked-outline" :class="classes" v-if="isChecked"></i>
        <i class="mdi mdi-checkbox-blank-outline" :class="classes" v-else></i>
    </div>
</template>

<script>
export default {
    // props: ['label', 'value', 'initialValue', 'checkClass'],

    props: {
        label: String, //text to be shown beside the input

        /**
         * string to specify which class to apply to our little check
         */
        checkClass: String,

        /**
         * This will be obtained from vmodel binding
         */
        value: [String, Boolean, Number, Array, null],

        /**
         * This is the value you passed to represent this little guy
         */
        initialValue: [String, Boolean, Number, Array, null],
    },

    data () {
        return {
            isChecked: false,
            classes: 'text-primary'
        }
    },

    methods: {
        check() {
            this.isChecked = !this.isChecked;

            if (this.isChecked) {
                if (this.value && Array.isArray(this.value)) {
                  this.$emit('input', [...this.value, this.initialValue]);
                } else {
                    this.$emit('input', true);
                }
            } else {
                if (this.value && Array.isArray(this.value)) {
                    this.$emit('input', this.value.filter(item => item != this.initialValue));
                } else {
                    this.$emit('input', false);
                }
            }
        },

        init() {
            if (this.value && Array.isArray(this.value)) {
                this.isChecked = this.value.indexOf(this.initialValue) > -1
            } else {
                this.isChecked = !!this.value;
            }

            if (this.checkClass) {
                this.classes = this.checkClass;
            }
        }
    },

    mounted() {
        this.init();
    }
}
</script>

<style lang="scss" scoped>
.app-check-box{
    display: inline-flex;
    cursor: pointer;
    label{
        cursor: pointer;
    }

    .mdi{
        margin-top: 5px;
        font-size: 18px;
    }
}
</style>

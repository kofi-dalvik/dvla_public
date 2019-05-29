<template>
    <div class="img-preview">
        <img :src="previewUrl">
        <label class="btn btn-fill btn-info" :for="id">
            <i class="mdi mdi-folder-multiple-image"></i>
        </label>
        <span style="margin-top:5px;display:inline-block;">{{imageFilename}}</span>
        <input @change="selectImage" :id="id" accept="image/*" type="file" style="display:none;" name="image">
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        src: {
            type: String,
            default: 'https://via.placeholder.com/200'
        }
    },

    data () {
        return {
            previewUrl: 'https://via.placeholder.com/200',
            imageFilename: 'Select Image',
        }
    },

    watch: {
        src () {
            this.previewUrl = this.src
        }
    },

    methods: {
        selectImage(event) {
            let files = event.target.files;
            let errors = [];

            if (files && files[0]) {
                this.previewImage(files[0]);
            } else {
                this.previewImage(null);
            }
        },

        /**
         * Previews the uploaded image
         *
         * @return {Undefined}
         */
        previewImage(file) {

            this.$emit('input', file);

            if (!file) {
                this.previewUrl = 'https://via.placeholder.com/200';
                this.imageFilename = '';
                this.$emit('onPreview', this.previewUrl);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewUrl = e.target.result;
                this.imageFilename = file.name;

                this.$emit('onPreview', this.previewUrl);
            }

            reader.readAsDataURL(file);
        },
    },

    mounted () {
        if (this.src) {
            this.previewUrl = this.src;
        }
    }
}
</script>

<style lang="scss">
.img-preview{
    // background: red;
    width: 200px;
    height: 200px;
    position: relative;
    // border-radius: 50%;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 20px;
    text-align: center;

    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 5px solid #dddddd;
    }

    label{
        cursor: pointer;
        box-shadow: 2px 2px 10px rgba(black, 0.3);
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 10px;
        border-radius: 40px;
    }

    span{
        color: #85C1E9;
        font-size: 13px;
    }
}
</style>

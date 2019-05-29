<template>
    <div class="card imgs mb-2" :class="{'bordered': withBorder}" v-if="images.length">
        <div class="card-body">
            <h4 class="card-title">Images taken from the scene</h4>
            <div class="d-flex flex-wrap">
                <img v-for="(image, index) in images" :key="index" :src="image.name">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            default: () => []
        },

        withBorder: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.imgs{
    &.bordered{
        box-shadow: none;
        border: 1px solid #dddddd;
        // border-radius: 0;
        // background: #F3F3F9;

        .card-body{
            padding: 10px;
        }

        .card-title{
            font-size: 13px;
        }
    }

    img{
        width: 150px;
        height: 150px;
        object-fit: cover;

        margin: 5px;
    }
}
</style>

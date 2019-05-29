<template>
	<label>
		<p v-show="show" class="error mt-2 text-danger">
			{{ message }}
		</p>
	</label>
</template>

<script>
	export default {
		props: ['message'],

		computed: {
			show() {
				return !!this.message;
			}
		}
	}
</script>

<style scoped>
</style>
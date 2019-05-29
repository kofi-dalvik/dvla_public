<template>
	<footer class="footer">
		<div class="d-sm-flex justify-content-center justify-content-sm-between">
			<span class="text-muted text-center text-sm-left d-block d-sm-inline-block">
				Copyright &copy; {{ currentYear }}  All rights reserved.
			</span>

			<span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
				<i class="mdi mdi-office-building"></i> Computer Science Department, KNUST
			</span>
		</div>
	</footer>
</template>

<script>
	export default {
		data() {
			return {
				currentYear: new Date().getFullYear()
			}
		}
	}
</script>

<style scoped>
</style>
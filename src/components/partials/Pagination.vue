<template>
	<div class="row" :class="{'justify-content-center': !!small}">
		<div class="col-sm-12 col-md-5" v-if="!small">
			<div class="dataTables_info" id="order-listing_info" role="status" aria-live="polite">
				Showing {{ pageDetails.from }} to {{ pageDetails.to }} of {{ pageDetails.total }} entries
			</div>
		</div>

			<div class="col-sm-12" :class="{'col-md-7': !small, 'col-md-12': small}">
				<div class="dataTables_paginate paging_simple_numbers" id="order-listing_paginate">
					<ul class="pagination">
						<li
							class="paginate_button page-item previous"
							id="order-listing_previous">
								<a
									data-dt-idx="0"
									tabindex="0"
									class="page-link"
									@click.self.stop="navigate(prevPage, $event)"
									:disabled="pageDetails.currentPage == 1">
										Previous
								</a>
						</li>

						<template v-if="pageDetails.lastPage < 16">
							<li
								v-for="(i, index, count)  in pageDetails.lastPage"
								:class="{active: i == pageDetails.currentPage}"
								:key="count"
								class="paginate_button page-item">
									<a
										data-dt-idx="1"
										tabindex="0"
										class="page-link"
										@click.self.stop="navigate(i, $event)"
										:disabled="i == pageDetails.currentPage">
											{{ i }}
									</a>
							</li>
						</template>

						<template v-else>
							<template v-if="pageDetails.currentPage != 1">
								<li class="paginate_button page-item">
									<a
										data-dt-idx="1"
										tabindex="0"
										class="page-link"
										@click.self.stop="navigate(1, $event)">
											1
									</a>
								</li>

								<li class="paginate_button page-item">
									<a
										data-dt-idx="1"
										tabindex="0"
										class="page-link"
										disabled="disabled">
											&hellip;
									</a>
								</li>
							</template>

							<li
								class="paginate_button page-item active">
									<a
										data-dt-idx="1"
										tabindex="0"
										class="page-link"
										@click.self.stop="navigate(pageDetails.currentPage, $event)"
										disabled="disabled">
											{{ pageDetails.currentPage }}
									</a>
							</li>

							<template v-if="pageDetails.currentPage != pageDetails.lastPage">
								<li class="paginate_button page-item">
									<a
										data-dt-idx="1"
										tabindex="0"
										class="page-link"
										disabled="disabled">
											&hellip;
									</a>
								</li>

								<li class="paginate_button page-item">
									<a
										data-dt-idx="1"
										tabindex="0"
										class="page-link"
										@click.self.stop="navigate(pageDetails.lastPage, $event)"
										:disabled="pageDetails.lastPage == pageDetails.currentPage">
											{{ pageDetails.lastPage }}
									</a>
								</li>
							</template>
						</template>

						<li
							class="paginate_button page-item next"
							id="order-listing_next">
								<a
									data-dt-idx="2"
									tabindex="0"
									class="page-link"
									@click.self.stop="navigate(nextPage, $event)"
									:disabled="pageDetails.currentPage == pageDetails.lastPage">
										Next
								</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
</template>

<script>
	export default {
		props: ['pageDetails', 'routeName', 'small'],

		computed: {
			prevPage() {
				return this.pageDetails.currentPage != 1 ? this.pageDetails.currentPage - 1 : 1;
			},

			nextPage() {
				return this.pageDetails.currentPage != this.pageDetails.lastPage ? this.pageDetails.currentPage + 1 : this.pageDetails.lastPage;
			}
		},

		methods: {
			navigate(pageNumber, event) {
				if ($(event.target).attr('disabled') === 'disabled') {
					return;
				}

				let query = {
					page: pageNumber,
					per_page: this.pageDetails.perPage
				};

				this.$emit('navigate', query);
			}
		}
	}
</script>

<style scoped>
	.pagination-info {
		margin-top: 20px;
		color: #999999;
	}

	a {
		cursor: pointer !important;
	}

	a[disabled=disabled] {
		cursor: not-allowed !important;
	}
</style>
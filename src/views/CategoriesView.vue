<template>
	<main class="main">
		<div class="container">
			<h1>Категории товаров</h1>
			<CategoryCards 
				:class="{'loading-mask': isLoadingCategories}" 
				:items="$store.state.category.list"
				style="--mask-size: 24% 172px; --mask-height: 1024px;"
			/>
		</div>
	</main>
</template>

<script>
	import CategoryCards from '@components/CategoryCards.vue'

	export default {
		components: {
			CategoryCards
		},

		data() {
			return {
				isLoadingCategories: true
			}
		},
		
		beforeMount() {

			this.MethodsGetCategories();

		},

		computed: {

			doneLocations() {

				return this.$store.getters['main/doneLocation'];

			}

		},

		watch: {

			doneLocations() {
				
				this.MethodsGetCategories();

			}

		},
		
		methods: {

			MethodsGetCategories() {

				let urlCategories = `${this.$store.state.main.getURL.categories}/?city_id=${this.$store.state.main.location.id}`;				


				if (this.$store.state.category.id !== this.$store.state.main.location.id) {
					
					this.isLoadingCategories = true;
					this.$store.state.category.list = [];

					
					this.$axios
						.get(urlCategories)
						.then((response) => {
							
							this.$store.state.category.id 	= this.$store.state.main.location.id;
							this.$store.state.category.list = response.data.tags.filter(variable => variable.children.length > 0); 
						
						})
						.catch((error) => {

							console.log(error);
						
						})
						.finally(() => {
							
							this.isLoadingCategories = false;

						});

				} else {

					this.isLoadingCategories = false;

				}


				this.$store.state.category.products.tags = []; 
				this.$store.state.category.products.list = [];
				this.$store.state.category.sub.name 	 = 'Подкатегория';

			}

		},
	}
</script>
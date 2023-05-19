<template>
	<main class="main">
		<div class="category-inner container">
			<div class="category-inner__header">
				<router-link 
					to="/" 
					class="btn btn--arrow"
					title="Вернуться к списку категорий"
					aria-label="Back to category list"
				>
					<SvgIcon class="icon" name="arrow-primary"></SvgIcon>
				</router-link>

				<h1 
					:class="{ 'loading-mask --lm-text': isLoadingTitle }"
					style="--mask-size: 100%;"
				>{{ $store.state.category.sub.name }}</h1>
			</div>
			
			<div class="category-inner__main">
				<div class="category-inner__col --aside" v-if="isShowAside">
					<nav 
						:class="['category-nav', { 'loading-mask': isLoadingTags }]"
						style="--mask-height: 400px; --mask-size: 100% 9%;"
					>
						<router-link 
							v-for="(variable, index) in $store.state.category.products.tags"
							:key="index"
							:class="['category-nav__item btn', {'active': isActive}]"
							:to="(index == 0) ? `/category/${variable.slug}` : { name: 	'sub-category', params: { subCategorySlug: variable.slug } }"
						>{{ (index == 0) ? 'Все продукты' : variable.name }}</router-link>
					</nav>
				</div>
				
				<div 
					:class="['category-inner__col --main', { 'loading-mask': isLoadingProducts }]"
					style="--mask-height: 500px; --mask-size: 32% 512px"
				>
					<div class="category-inner__products" v-if="!isStatusEmpty">
						<ProductCard
							class="category-inner__product"							
							v-for="(variable, index) in $store.state.category.products.list"
							:key="index"
							:params="{
								name: 	   variable.present_name,
								category:  variable.category.name,
								image:	   variable.main_image_thumb_300,
								comment:   variable.comment_name,
								price:     variable.price,
								allowed:   variable.allowed,
								available: variable.available,
								tags:	   variable.tags,    
							}"
						/>
					</div>

					<h2 v-if="isStatusEmpty">Увы..Пока ничего нету.</h2>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped>
	.category-inner__header {
		display: flex;
		align-items: center;
		margin: 0px 0px 20px;
	}

	.category-inner__header h1 {
		margin: 0px 0px 0px 10px;
	}

	.category-inner__main {
		display: flex;
		align-items: flex-start;
	}

	.category-inner__col.--aside {
		top: 20px;
		position: sticky;

		width: 240px;
		min-width: 240px;
		flex-basis: 240px;
		margin: 0px 35px 0px 0px;
	}

	.category-inner__col.--main {
		flex-grow: 1;
	}

	.category-inner__products {
		margin: -12px;
		display: flex;
		flex-wrap: wrap;
	}

	.category-inner__product {
		margin: 12px;
		width: calc((100% / 3) - 24px);
		flex-basis: calc((100% / 3) - 24px);
	}

	.category-nav {
		display: flex;
		flex-direction: column;
	}

	.category-nav__item {
		color: #000;
		font-size: 16px;
		font-weight: normal;
		padding: 8px 12px;
		justify-content: flex-start;

		border-style: solid;
		border-color: transparent;
		border-width: 1px 0px 0px 0px;
	}

	.category-nav__item.router-link-exact-active {
		color: #202648;
		background-color: #e9eef3;
	}

	.category-nav__item + .category-nav__item {
		border-color: #e9eef3;
	}


	/* *** Адаптивная часть *** */


	/* lg_s */
	@media screen and (max-width: 1280px) {		
		.category-inner__col.--main.loading-mask:before {
			background-size: 48% 520px;
		}
		.category-inner__product {
			width: calc((100% / 2) - 24px);
			flex-basis: calc((100% / 2) - 24px);
		}
	}

	/* medium_m */
	@media screen and (max-width: 980px) {
		.category-inner__main {
			align-items: inherit;
			flex-direction: column;
		}

		.category-inner__col.--aside {
			top: 0px;
			z-index: 10;
			width: 100%;
			flex-basis: 100%;
			margin: 0px 0px 20px;
		}

		.category-inner__col.--main.loading-mask:before {
			background-size: var(--mask-size);
		}

		.category-nav {
			flex-direction: row;			
			overflow-x: auto;
			margin: 0px -20px;
			padding: 5px 20px;
			white-space: nowrap;
			background-color: var(--bg-secondary);
		}

		.category-nav.loading-mask {
			min-height: 46px;
		}

		.category-nav.loading-mask:before {
			background-size: 15% 75%;
		}

		.category-nav__item {
			border-width: 1px;
			border-color: #e9eef3;
			border-radius: 100px;
		}

		.category-nav__item + .category-nav__item {
			margin: 0px 0px 0px 10px;
		}

		.category-inner__product {
			width: calc((100% / 3) - 24px);
			flex-basis: calc((100% / 3) - 24px);
		}
	}

	/* small_m */
	@media screen and (max-width: 650px) {

		.category-inner__col.--main.loading-mask:before {
			background-size: 48% 512px;
		}

		.category-inner__product {
			width: calc((100% / 2) - 24px);
			flex-basis: calc((100% / 2) - 24px);
		}
	}

	/* small_s */
	@media screen and (max-width: 480px) {
        .category-inner__col.--main.loading-mask:before {
            background-size: 50% 512px;
        }
        .category-inner__product {
			width: calc((100% / 1) - 24px);
			flex-basis: calc((100% / 1) - 24px);
        } 
    }
</style>

<script>
	import SvgIcon 	   from '@components/SvgIcon.vue'
	import ProductCard from '@components/ProductCard.vue'

	export default {
		components: {
			SvgIcon,
			ProductCard
		},

        props: {
            params: Object,
        }, 
		
		data() {
			return {
				isShowAside:       true,
				isStatusEmpty:     false,
				
				isLoadingTitle:    true,
				isLoadingTags:     true,
				isLoadingProducts: true
			}
		},

		beforeMount() {
			
			let urlTags 	= `${this.$store.state.main.getURL.categories}/${this.$route.params.categorySlug}/?city_id=${this.$store.state.main.location.id}`,
				urlProducts = `${this.$store.state.main.getURL.categories}/${this.$route.params.subCategorySlug || this.$route.params.categorySlug}/?city_id=${this.$store.state.main.location.id}`;
			

			this.MethodGetTags(urlTags);
			this.MethodGetProducts(urlProducts);

		},

		beforeRouteUpdate(to) {
			
			let urlProducts = `${this.$store.state.main.getURL.categories}/${to.params.subCategorySlug || to.params.categorySlug}/?city_id=${this.$store.state.main.location.id}`;

			this.isStatusEmpty 	   = false;
			this.isLoadingProducts = true;

			this.$store.state.category.products.list = [];

			this.MethodGetProducts(urlProducts);

		},

		computed: {

			doneLocation() {

				return this.$store.getters['main/doneLocation'];

			}

		},

		watch: {

			doneLocation() {
				
				let urlTags 	= `${this.$store.state.main.getURL.categories}/${this.$route.params.categorySlug}/?city_id=${this.$store.state.main.location.id}`,
					urlProducts = `${this.$store.state.main.getURL.categories}/${this.$route.params.subCategorySlug || this.$route.params.categorySlug}/?city_id=${this.$store.state.main.location.id}`;
				
				
				this.isLoadingTitle    = true;
				this.isLoadingTags     = true;
				this.isLoadingProducts = true;

				this.$store.state.category.products.list = [];
				this.$store.state.category.products.tags = [];
				
				this.MethodGetTags(urlTags);
				this.MethodGetProducts(urlProducts);

			}

		},

		methods: {

			MethodGetTags(path) {
				
				this.$store.state.category.name     = this.$route.params.categorySlug;
				this.$store.state.category.sub.slug = this.$route.params.subCategorySlug;
				
				this.$axios
					.get(path)
					.then((response) => {
						
						let data = response.data;
						
						this.$store.state.category.products.tags = data.tags; 
					
					})
					.catch((error) => {

						console.log(error);
					
					})
					.finally(() => {
						
						this.isLoadingTags = false;						

					});

			},


			MethodGetProducts(path) {

				this.$store.state.category.sub.slug = this.$route.params.subCategorySlug;
				

				this.$axios
					.get(path)
					.then((response) => {
						
						let data = response.data;
						
						this.isStatusEmpty = (data.products.length == 0);
						this.$store.state.category.sub.name = data.tags[0].name;
						this.$store.state.category.products.list = data.products;
					
					})
					.catch((error) => {

						console.log(error);
					
					})
					.finally(() => {
						
						this.isLoadingTitle    = false;
						this.isLoadingProducts = false;

					});

			},

		},
	}
</script>
import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView                 	  from '../views/CategoriesView.vue'
import CategoryView                 	  from '../views/CategoryView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	
	routes: [
		{
			path: '/',
			name: 'home',
			component: CategoriesView
		},

		{
			path: '/category/:categorySlug',
			name: 'category',
			component: CategoryView,
			children: [
				{
					path: ':subCategorySlug',
					name: 'sub-category',
					fullName: '',
					component: CategoryView
				}
			]
		},
	],

	scrollBehavior() {
		// always scroll to top
		return { top: 0 }
	},
})

export default router
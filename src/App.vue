<script>
	import { RouterView } from 'vue-router'
	import LayoutHeader   from './components/layout/LayoutHeader.vue'

	export default {
		components: {
			RouterView,
			LayoutHeader,
		}
	}
</script>

<template>
	<LayoutHeader/>
	<RouterView />
</template>
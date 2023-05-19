<template>
	<svg aria-hidden="true">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script>
	import { computed } from 'vue';

	export default {
		name: 'SvgIcon',
		props: {
			prefix: {
				type: String,
				default: 'icon',
			},

			name: {
				type: String,
				required: true,
			},
		},

		setup(props) {
			const symbolId = computed(() => `#${props.prefix}-${props.name}`);
			return {
				symbolId
			};
		},
	};
</script>
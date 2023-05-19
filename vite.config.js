import { fileURLToPath, URL } 	from 'node:url'
import path 				  	from 'path'
import { defineConfig } 	  	from 'vite'
import vue 					  	from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import legacy 					from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {

	return {

		base: (command === 'serve') ? '/' : '/tw-nlstar/',
	
		plugins: [
			vue(),
			
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]'
			}),
			
			legacy({
				targets: ['defaults', 'not IE 11'],
			}),
		],
	
		resolve: {
			alias: {
				'@': 		   fileURLToPath(new URL('./src', 			  import.meta.url)),
				'@json': 	   fileURLToPath(new URL('./src/assets/json', import.meta.url)),
				'@fonts': 	   fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
				'@components': fileURLToPath(new URL('./src/components',  import.meta.url)),
			}
		},
	
		server: {
			port: 8080,
		},
	
		preview: {
			port: 8080,
		},
	
	}
})
import { defineConfig, minimal2023Preset as preset } from "@vite-pwa/assets-generator/config"

export default defineConfig({
	preset: {
		...preset,
		transparent: {
			sizes: [64, 192, 512],
			favicons: [[48, 'favicon.ico']],
			padding: 0
		},
		maskable: {
			sizes: [512],
			padding: 0
		},
		apple: {
			sizes: [180],
			padding: 0
		}
	},
	images: [
		"public/logo.svg",
	]
})

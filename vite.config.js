import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
	name,
	repository,
	version,
} from "./package.json";

// Set the version and build information.
const gitCommit = JSON.stringify(execSync("git rev-parse HEAD").toString().trimEnd());
const buildTime = Date.now();
const appName = JSON.stringify(name);
const appVersion = JSON.stringify(version);
const repo = JSON.stringify(repository.url);



export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_");

	return {
		define: {
			"import.meta.env.VITE_RANGELOG_APP_BUILD": gitCommit,
			"import.meta.env.VITE_RANGELOG_APP_BUILD_TIME": buildTime,
			"import.meta.env.VITE_RANGELOG_APP_NAME": appName,
			"import.meta.env.VITE_RANGELOG_APP_VERSION": appVersion,
			"import.meta.env.VITE_RANGELOG_APP_REPO": repo,
		},
		plugins: [
			solidPlugin(),
			tailwindcss(),
			VitePWA({
				registerType: "autoUpdate",
				workbox: {
					// Critical: exclude /_/ from fallback, for pocketbase super user login.
					navigateFallbackDenylist: [/^\/_\//, /^\/api\//],
					cleanupOutdatedCaches: true,
					clientsClaim: true,
					globPatterns: [
						"**/*.{js,css,html,ico,png,svg,woff2}",
					],
					maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
					skipWaiting: true,
					runtimeCaching: [
						{
							urlPattern: /\/api\/files\/files\//,
							handler: "CacheFirst",
							options: {
								cacheName: "pb-user-images",
								expiration: {
									maxEntries: 50,
									maxAgeSeconds: 90 * 24 * 60 * 60,
								},
								cacheableResponse: {
									statuses: [
										0,
										200,
									],
								},
							},
						},
					],
				},
				includeAssets: [
					"favicon.ico",
					"apple-touch-icon.png",
					"masked-icon.svg",
				],
				manifest: {
					background_color: "#0F0E14",
					display: "standalone",
					icons: [
						{
							src: "/pwa-64x64.png",
							sizes: "64x64",
							type: "image/png",
						},
						{
							src: "/pwa-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "/pwa-512x512.png",
							sizes: "512x512",
							type: "image/png",
						},
						{
							src: "/maskable-icon-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "maskable",
						},
					],
					name: "Rangelog",
					short_name: "rangelog",
					start_url: `${env.VITE_RANGELOG_URL_PROTOCOL}://${env.VITE_RANGELOG_URL_SUBDOMAIN}.${env.VITE_RANGELOG_URL_DOMAIN}`,
					theme_color: "#0F0E14",
				},
			})
		],
		server: {
			port: env.VITE_RANGELOG_URL_PORT,
			host: true,
		},
		resolve: {
			alias: {
				"~": resolve(__dirname, "./src"),
				"infrastructure": resolve(__dirname, "./infrastructure")
			}
		},
	}
});

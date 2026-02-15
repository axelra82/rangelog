/** @type {import('tailwindcss').Config} */
import { animation, keyframes } from "./tailwind-config";

export default {
	darkMode: ["variant", [".dark &", '[data-kb-theme="dark"] &']],
	content: ["./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "oklch(var(--border))",
				input: "oklch(var(--input))",
				ring: "oklch(var(--ring))",
				background: "oklch(var(--background))",
				foreground: "oklch(var(--foreground))",
				primary: {
					DEFAULT: "oklch(var(--primary))",
					foreground: "oklch(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "oklch(var(--secondary))",
					foreground: "oklch(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "oklch(var(--destructive))",
					foreground: "oklch(var(--destructive-foreground))"
				},
				info: {
					DEFAULT: "oklch(var(--info))",
					foreground: "oklch(var(--info-foreground))"
				},
				success: {
					DEFAULT: "oklch(var(--success))",
					foreground: "oklch(var(--success-foreground))"
				},
				warning: {
					DEFAULT: "oklch(var(--warning))",
					foreground: "oklch(var(--warning-foreground))"
				},
				error: {
					DEFAULT: "oklch(var(--error))",
					foreground: "oklch(var(--error-foreground))"
				},
				muted: {
					DEFAULT: "oklch(var(--muted))",
					foreground: "oklch(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "oklch(var(--accent))",
					foreground: "oklch(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "oklch(var(--popover))",
					foreground: "oklch(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "oklch(var(--card))",
					foreground: "oklch(var(--card-foreground))"
				},
				blue: {
					50: "oklch(var(--blue-50) / <alpha-value>)",
					100: "oklch(var(--blue-100) / <alpha-value>)",
					200: "oklch(var(--blue-200) / <alpha-value>)",
					300: "oklch(var(--blue-300) / <alpha-value>)",
					400: "oklch(var(--blue-400) / <alpha-value>)",
					500: "oklch(var(--blue-500) / <alpha-value>)",
					600: "oklch(var(--blue-600) / <alpha-value>)",
					700: "oklch(var(--blue-700) / <alpha-value>)",
					800: "oklch(var(--blue-800) / <alpha-value>)",
					900: "oklch(var(--blue-900) / <alpha-value>)",
					950: "oklch(var(--blue-950 / <alpha-value>))"
				},
				green: {
					50: "oklch(var(--green-50) / <alpha-value>)",
					100: "oklch(var(--green-100) / <alpha-value>)",
					200: "oklch(var(--green-200) / <alpha-value>)",
					300: "oklch(var(--green-300) / <alpha-value>)",
					400: "oklch(var(--green-400) / <alpha-value>)",
					500: "oklch(var(--green-500) / <alpha-value>)",
					600: "oklch(var(--green-600) / <alpha-value>)",
					700: "oklch(var(--green-700) / <alpha-value>)",
					800: "oklch(var(--green-800) / <alpha-value>)",
					900: "oklch(var(--green-900) / <alpha-value>)",
					950: "oklch(var(--green-950 / <alpha-value>))"
				},
				orange: {
					50: "oklch(var(--orange-50) / <alpha-value>)",
					100: "oklch(var(--orange-100) / <alpha-value>)",
					200: "oklch(var(--orange-200) / <alpha-value>)",
					300: "oklch(var(--orange-300) / <alpha-value>)",
					400: "oklch(var(--orange-400) / <alpha-value>)",
					500: "oklch(var(--orange-500) / <alpha-value>)",
					600: "oklch(var(--orange-600) / <alpha-value>)",
					700: "oklch(var(--orange-700) / <alpha-value>)",
					800: "oklch(var(--orange-800) / <alpha-value>)",
					900: "oklch(var(--orange-900) / <alpha-value>)",
					950: "oklch(var(--orange-950 / <alpha-value>))"
				},
				red: {
					50: "oklch(var(--red-50) / <alpha-value>)",
					100: "oklch(var(--red-100) / <alpha-value>)",
					200: "oklch(var(--red-200) / <alpha-value>)",
					300: "oklch(var(--red-300) / <alpha-value>)",
					400: "oklch(var(--red-400) / <alpha-value>)",
					500: "oklch(var(--red-500) / <alpha-value>)",
					600: "oklch(var(--red-600) / <alpha-value>)",
					700: "oklch(var(--red-700) / <alpha-value>)",
					800: "oklch(var(--red-800) / <alpha-value>)",
					900: "oklch(var(--red-900) / <alpha-value>)",
					950: "oklch(var(--red-950 / <alpha-value>))"
				}
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--kb-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--kb-accordion-content-height)" },
					to: { height: 0 }
				},
				"content-show": {
					from: { opacity: 0, transform: "scale(0.96)" },
					to: { opacity: 1, transform: "scale(1)" }
				},
				"content-hide": {
					from: { opacity: 1, transform: "scale(1)" },
					to: { opacity: 0, transform: "scale(0.96)" }
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" }
				},
				...keyframes,
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"content-show": "content-show 0.2s ease-out",
				"content-hide": "content-hide 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
				...animation,
			}
		}
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("tailwindcss-animate")
	]
}

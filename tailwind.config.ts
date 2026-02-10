/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "1024px",
			xl: "1440px",
			"lg-landscape": { raw: "(min-width: 1024px) and (orientation: landscape)" },
		},
		fontSize: {
			xs8: [
				"0.05rem",
				{
					letterSpacing: "0.2px",
				},
			],
			xs7: [
				"0.15rem",
				{
					letterSpacing: "0.4px",
				},
			],
			xs6: [
				"0.25rem",
				{
					letterSpacing: "0.6px",
				},
			],
			xs5: [
				"0.35rem",
				{
					letterSpacing: "0.8px",
				},
			],
			xs4: [
				"0.45rem",
				{
					letterSpacing: "0.10px",
				},
			],
			xs3: [
				"0.55rem",
				{
					letterSpacing: "0.12px",
				},
			],
			xs2: [
				"0.65rem",
				{
					letterSpacing: "0.15px",
				},
			],
			xs: [
				"0.75rem",
				{
					letterSpacing: "0.25px",
				},
			],
			sm: [
				"0.875rem",
				{
					letterSpacing: "0.45px",
				},
			],
			base: [
				"1rem",
				{
					letterSpacing: "0.75px",
				},
			],
			lg: [
				"1.125rem",
				{
					letterSpacing: "0.5px",
				},
			],
			xl: [
				"1.25rem",
				{
					letterSpacing: "0.2px",
				},
			],
			xl2: [
				"1.5rem",
				{
					letterSpacing: "0",
				},
			],
			xl3: [
				"1.875rem",
				{
					letterSpacing: "0.12px",
				},
			],
			xl4: [
				"2.25rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl5: [
				"3rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl6: [
				"3.75rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl7: [
				"4.5rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl8: [
				"6rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl9: [
				"8rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl10: [
				"10rem",
				{
					letterSpacing: "-0.25px",
				},
			],
			xl11: [
				"12rem",
				{
					letterSpacing: "-0.25px",
				},
			],
		},
		extend: {
			fontFamily: {
				sans: ["system-ui", "sans-serif"],
			},
			lineHeight: {
				normal: "normal",
				initial: "initial",
				inherit: "inherit",
				unset: "unset",
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				black: "hsl(var(--color-black) / <alpha-value>)",
				white: "hsl(var(--color-white) / <alpha-value>)",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				}
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: "calc(var(--radius) - 4px)"
			},
			opacity: {
				1: "0.015",
				2: "0.025",
				3: "0.035",
				4: "0.045",
			},
			blur: {
				xl4: "82px",
				xl5: "96px",
				xl6: "128px",
			},
			fill: {
				current: "currentColor",
			},
			spacing: {
				xs: "0.25rem",
				sm: "0.5rem",
				md: "1rem",
				lg: "2rem",
				xl: "3rem",
			},
			stroke: {
				current: "currentColor",
			},
			zIndex: {
				"-1": "-1",
				1: "1",
				99: "99",
				dialog: "101",
				"dialog-backdrop": "100",
				"loading-dialog": "100",
				toast: "999",
				"viewer-tool-buttons": "99",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
	],
};

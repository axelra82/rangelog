import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import solid from "eslint-plugin-solid";
import tseslint, { parser } from "typescript-eslint";

import defaultJsRules from "./eslint/default-js-rules.js";
import defaultTsRules from "./eslint/default-ts-rules.js";

const createConfig = (options = {}) => {
	const {
		customConfig,
		ignores = [],
	} = options;

	const defaultIgnores = [
		"dist/**",
		"node_modules/**",
	];

	const configs = [
		js.configs.recommended,
		defaultJsRules,
	];

	// TypeScript parser configuration
	configs.push({
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser,
			parserOptions: {
				projectService: {
					project: true,
					tsconfigRootDir: import.meta.dirname,
				},
			},
		},
	});

	// TypeScript recommended rules
	configs.push(
		...tseslint.configs.recommended.map(config => ({
			...config,
			files: config.files || ["**/*.ts", "**/*.tsx"],
		})),
	);

	// Stylistic rules
	const stylisticConfig = stylistic.configs.customize({
		arrowParens: true,
		braceStyle: "1tbs",
		commaDangle: "always-multiline",
		indent: [
			"tab",
			{
				SwitchCase: 1,
				VariableDeclarator: 1,
				offsetTernaryExpressions: true,
				ignoredNodes: [
					"ConditionalExpression",
					"TSConditionalType",
					"TSIntersectionType",
					"TSMappedType",
					"TSTypeAliasDeclaration > *",
					"TSUnionType",
				],
			},
		],
		quotes: "double",
		semi: true,
	});

	const stylisticConfigForTs = {
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			...stylisticConfig.rules,
			"@stylistic/jsx-one-expression-per-line": [
				"error",
				{
					"allow": "single-line",
				},
			],
			"@stylistic/operator-linebreak": [
				"error",
				"after",
				{
					overrides: {
						"?": "before",
						":": "before",
						"|": "before", // Keep | at the beginning of lines for unions
						"&": "before", // Keep & at the beginning of lines for unions
					},
				},
			],
		},
	};

	stylisticConfigForTs.plugins = stylisticConfig.plugins;

	configs.push(stylisticConfigForTs);

	// Custom TypeScript rules
	const tsRulesConfig = {
		files: ["**/*.ts", "**/*.tsx"],
		rules: defaultTsRules.rules || {},
	};

	configs.push(
		tsRulesConfig,
		{
			files: ["**/*.tsx", "**/*.jsx"],
			plugins: {
				solid,
				import: importPlugin,
			},
			settings: {
				"import/resolver": {
					typescript: {
						// uses nearest tsconfig.json
						project: [
							"./tsconfig.json",
							"./apps/*/tsconfig.json",
							"./infrastructure/*/tsconfig.json",
							"./packages/*/tsconfig.json",
						],
					},
				},
			},
			rules: {
				"import/no-unresolved": "error",
				...solid.configs.recommended.rules,
			},
			ignores: [
				...defaultIgnores,
				...ignores,
			],
			...customConfig,
		});

	// configs.push({
	// 	plugins: { tailwindcss },
	// 	rules: {
	// 		...tailwindcss.configs.recommended.rules,
	// 	},
	// });

	// Common ignores for all projects

	return configs;
};

const eslintConfig = createConfig();

export default eslintConfig;

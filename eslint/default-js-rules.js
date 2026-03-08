import eslintPluginImport from "eslint-plugin-import";
import eslintPluginImportNewline from "eslint-plugin-import-newlines";
import eslintPluginSimpleSort from "eslint-plugin-simple-import-sort";
import eslintPluginSolid from "eslint-plugin-solid";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";

export default {
	plugins: {
		import: eslintPluginImport,
		"import-newlines": eslintPluginImportNewline,
		"simple-import-sort": eslintPluginSimpleSort,
		solid: eslintPluginSolid,
		tailwindcss: eslintPluginTailwindcss,
	},
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	rules: {
		"comma-dangle": [
			"error",
			"always-multiline",
		],
		"comma-style": [
			"error",
			"last",
		],
		"consistent-return": 0,
		"eol-last": [
			"error",
			"always",
		],
		"import/first": "error",
		"import/extensions": 0,
		"import/newline-after-import": "error",
		"import/no-cycle": 0,
		"import/no-extraneous-dependencies": 0,
		"import/no-unresolved": ["error", {
			// Ignore "." and "./"
			ignore: [
				"^\\./?.*$",
				"^virtual:", // Vite virtual modules
			],
		}],
		"import/no-duplicates": "error",
		"import/prefer-default-export": 0,
		"indent": "off",
		"no-tabs": 0,
		"linebreak-style": [
			"error",
			"unix",
		],
		"max-len": 0,
		"no-nested-ternary": 0,
		"no-multi-spaces": "error",
		"no-shadow": "off",
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_", // Ignore arguments starting with _
				varsIgnorePattern: "^(_|handler$)", // Ignore variables starting with _ or named "handler" (usually in lambdas)

			},
		],
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
		"tailwindcss/no-custom-classname": 0,
		"quotes": [
			"error",
			"double",
		],
		"preserve-caught-error": 0,
		// "import-newlines/enforce": "error",
		// [
		// 	"error",
		// 	// {
		// 	// 	"items": 2,
		// 	// 	"max-len": Infinity,
		// 	// 	"semi": false
		// 	// }
		// ],
		// "indent": [
		// 	"error",
		// 	"tab",
		// 	{
		// 		"SwitchCase": 1,
		// 	},
		// ],
	},
};

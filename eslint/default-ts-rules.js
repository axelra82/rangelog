export default {
	rules: {
		"@typescript-eslint/no-floating-promises": [
			"error",
			{
				ignoreIIFE: true
			}
		],
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: false
			}
		],
		"@typescript-eslint/no-shadow": [
			"error",
			{
				"ignoreTypeValueShadow": true
			},
		],
		"@typescript-eslint/no-unsafe-assignment": 0,
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_", // Ignore arguments starting with _
				varsIgnorePattern: "^(_|handler$)", // Ignore variables starting with _ or named "handler" (usually in lambdas)
			}
		],
		"preserve-caught-error": 0,
	},
};

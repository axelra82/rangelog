export const notImplemented = (functionName?: string) => () => {
	throw new Error(
		`Function ${functionName ? `<${functionName}>` : "<NOT_PROVIDED>"} not implemented`,
	);
};

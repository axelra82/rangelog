export const notImplemented = (functionName?: string) => () => {
	throw Error(
		`Function ${functionName ? `<${functionName}>` : "<NOT_PROVIDED>"} not implemented`,
	);
};

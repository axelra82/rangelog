export const substring = (string: string, start = 0, end = 1) => string.substring(start, end);

export const getInitials = (string: string) => {
	let value = string;
	const spaced = value.split(" ");

	if (spaced.length < 2) {
		value = substring(value, 0, 2);
	} else {
		value = `${substring(spaced[0], 0, 1)}${substring(spaced[1], 0, 1)}`;
	}

	return value.toUpperCase();
};

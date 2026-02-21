/**
	* Useful async delay function for development.
	*
	* @async
	* @param {number} [ms=1000]
	* @returns {Promise<void>}
	*/
export const delay = async (ms: number = 1000): Promise<void> => new Promise((resolve) => (setTimeout(resolve, ms)));

export const downloadFile = (url: string, name: string) => {
	const link = document.createElement("a");
	link.href = `${url}&download=1`;
	link.download = name;
	link.click();
}

/**
	* Useful async delay function for development.
	*
	* @async
	* @param {number} [ms=1000]
	* @returns {Promise<void>}
	*/
export const delay = async (ms: number = 1000): Promise<void> => new Promise((resolve) => (setTimeout(resolve, ms)));

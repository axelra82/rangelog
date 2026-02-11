/**
 * @file Contains scaffold user CRUD functions. Usage TBD.
 * @author Axel Roussille Åberg <axel@openpoint.se>
 */

export const pocketbaseCreateUser = async (props: Record<string, unknown>[]): Promise<Record<string, unknown>[]> => new Promise((resolve) => {
	resolve(props);
});

export const pocketbaseReadUser = async (props: string[]): Promise<Record<string, unknown>[]> => new Promise((resolve) => {
	resolve([{
		...props,
	}]);
});

export const pocketbaseUpdateUser = async (props: Record<string, unknown>[]): Promise<Record<string, unknown>[]> => new Promise((resolve) => {
	resolve([{
		...props,
	}]);
});

export const pocketbaseDeleteUser = async (props: string[]): Promise<string[]> => new Promise((resolve) => {
	resolve(props);
});

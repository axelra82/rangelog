
export interface UserCollectionItem {
	activities: number;
	admin: boolean;
	avatar?: string;
	claims: number;
	created: string;
	email: string;
	emailVisibility: boolean;
	id: string;
	name?: string;
	password: string;
	passwordConfirm?: string;
	tokenKey: string;
	updated: string;
	verified: boolean;
	weapons: number;
}

export type UserCreateInput = Pick<
	UserCollectionItem,
	"avatar" | "email" | "emailVisibility" | "name" | "password" | "passwordConfirm"
>;

export type UserUpdateInput = Pick<
	UserCollectionItem,
	"email" | "name" | "password"
>;

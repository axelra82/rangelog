export interface FileCollectionItem {
	id: string;
	owner: string;
	name: string;
	source: string;
	size: number;
	type: string;
	created: string;
}

export type FileCreateInput = Omit<
	FileCollectionItem,
	"id" | "created" | "source"
> & {
	source: File;
};

export type FileUpdateInput = Pick<
	FileCollectionItem,
	"name"
>;

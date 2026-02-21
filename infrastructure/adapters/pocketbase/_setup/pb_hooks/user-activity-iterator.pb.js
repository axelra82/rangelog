/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((event) => {
	try {
		const userId = event.record.get("owner");
		if (!userId) {
			return;
		}

		const collection = event.record.collection().name;

		const result = new DynamicModel({ total: 0 });
		$app.db()
			.newQuery(`SELECT COUNT(*) as total FROM ${collection} WHERE owner = {:owner}`)
			.bind({ owner: userId })
			.one(result);

		const total = parseInt(result.total) || 0;

		const user = $app.findRecordById("users", userId);
		if (!user) {
			return;
		}

		user.set(collection, total);
		$app.save(user);
	} catch (error) {
		console.error("CREATE: failed:", error);
	}

	event.next();
}, "activities", "weapons");

onRecordAfterDeleteSuccess((event) => {
	try {
		const userId = event.record.get("owner");
		if (!userId) {
			return;
		}

		const collection = event.record.collection().name;

		const result = new DynamicModel({ total: 0 });
		$app.db()
			.newQuery(`SELECT COUNT(*) as total FROM ${collection} WHERE owner = {:owner}`)
			.bind({ owner: userId })
			.one(result);

		const total = parseInt(result.total) || 0;

		const user = $app.findRecordById("users", userId);
		if (!user) {
			return;
		}

		user.set(collection, total);
		$app.save(user);
	} catch (error) {
		console.error("DELETE: failed:", error);
	}

	event.next();
}, "activities", "weapons");

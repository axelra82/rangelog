/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((event) => {
	try {
		const record = event.record;
		const collection = record.collection();

		const userCountCollections = ["activities", "claims", "weapons"];
		if (userCountCollections.includes(collection.name)) {
			const userId = record.get("owner");
			if (userId) {
				const user = $app.findRecordById("users", userId);

				if (user) {
					const result = new DynamicModel({ total: 0 });
					$app
						.db()
						.newQuery(
							`SELECT COUNT(*) as total FROM ${collection.name} WHERE owner = {:owner}`
						)
						.bind({ owner: userId })
						.one(result);

					const total = parseInt(result.total) || 0;


					user.set(collection.name, total);
					$app.save(user);
				}
			}
		}

		if (collection.name === "activity_weapons") {
			const weaponId = record.get("weapon");
			if (weaponId) {
				const weapon = $app.findRecordById("weapons", weaponId);

				if (weapon) {
					const activityStats = new DynamicModel({
						total: 0,
						rounds: 0,
					});

					$app
						.db()
						.newQuery(`
							SELECT
								COUNT(*) as total,
								COALESCE(SUM(rounds), 0) as rounds
							FROM activity_weapons
							WHERE weapon = {:weapon}
						`)
						.bind({ weapon: weaponId })
						.one(activityStats);

					const totalWeaponActivities = parseInt(activityStats.total) || 0;
					const totalRounds = parseInt(activityStats.rounds) || 0;

					weapon.set("activities", totalWeaponActivities);
					weapon.set("rounds", totalRounds);
					$app.save(weapon);
				}
			}
		}
	} catch (error) {
		console.error("CREATE hook failed: ", error);
	}

	event.next();
});

onRecordAfterDeleteSuccess((event) => {
	try {
		const record = event.record;
		const collection = record.collection();

		// File cleanup. Find all relation fields pointing to "files".
		for (const field of collection.fields) {
			if (field.type() !== "relation") {
				continue;
			}

			// Check if this relation points to the "files" collection.
			const relatedCollection = $app.findCollectionByNameOrId(field.collectionId);

			if (
				!relatedCollection
				|| relatedCollection.name !== "files"
			) {
				continue;
			}

			// Get the value, could be a single ID string or an array of IDs.
			const raw = record.get(field.name);
			if (!raw) {
				continue;
			}

			const fileRecordIds = Array.isArray(raw) ? raw : [raw];

			for (const fileRecordId of fileRecordIds) {
				if (!fileRecordId) {
					continue;
				}

				try {
					const fileRecord = $app.findRecordById("files", fileRecordId);

					if (!fileRecord) {
						continue;
					}
					// Handles physical file cleanup automatically.
					$app.delete(fileRecord);
				} catch (error) {
					console.error(`Failed to delete files record "${fileRecordId}":`, error);
				}
			}
		}

		const userCountCollections = ["activities", "claims", "weapons"];
		if (userCountCollections.includes(collection.name)) {
			const userId = record.get("owner");

			if (userId) {
				const user = $app.findRecordById("users", userId);

				if (user) {
					const result = new DynamicModel({ total: 0 });
					$app
						.db()
						.newQuery(
							`SELECT COUNT(*) as total FROM ${collection.name} WHERE owner = {:owner}`
						)
						.bind({ owner: userId })
						.one(result);

					const total = parseInt(result.total) || 0;
					user.set(collection.name, total);
					$app.save(user);
				}
			}
		}

		if (collection.name === "activity_weapons") {
			const weaponId = record.get("weapon");
			if (weaponId) {
				const weapon = $app.findRecordById("weapons", weaponId);

				if (weapon) {
					const activityStats = new DynamicModel({
						total: 0,
						rounds: 0,
					});

					$app
						.db()
						.newQuery(`
							SELECT
								COUNT(*) as total,
								COALESCE(SUM(rounds), 0) as rounds
							FROM activity_weapons
							WHERE weapon = {:weapon}
						`)
						.bind({ weapon: weaponId })
						.one(activityStats);

					const totalWeaponActivities = parseInt(activityStats.total) || 0;
					const totalRounds = parseInt(activityStats.rounds) || 0;

					weapon.set("activities", totalWeaponActivities);
					weapon.set("rounds", totalRounds);
					$app.save(weapon);
				}
			}
		}
	} catch (error) {
		console.error("DELETE hook failed: ", error);
	}

	event.next();
});

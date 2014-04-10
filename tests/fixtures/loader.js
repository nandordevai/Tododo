var Server = require("mongodb").Server,
	Db = require("mongodb").Db;

function dieIf(err, msg) {
	if (err) {
		console.log(msg);
		process.exit(1);
	}
}

function loadCollections(db, fixture, callback) {
	try {
		data = require("./" + fixture).data;
	} catch (e) {
		dieIf(true, "Cannot load fixture: " + fixture);
	}
	Object.keys(data).forEach(function(collectionName, i) {
		db.createCollection(collectionName, function(err, collection) {
			dieIf(err, "Error creating collection " + collectionName);
			collection.insert(data[collectionName], function(err, result) {
				dieIf((err && data[collectionName].length > 0), "Error inserting collection " + collectionName);
				if (i == Object.keys(data).length - 1) { // We’re async baby
					callback();
					db.close();
				}
			});
		});
	});
}

function loadFixture(fixture, callback) {
	if (fixture === undefined) {
		fixture = 'default';
	}
	var db = new Db("tododo_test", new Server("localhost", 27017), { safe: true });
	db.open(function(err, db) {
		dieIf(err, "Error connecting to database");
		db.dropDatabase(function(err, result) {
			dieIf(err, "Error dropping database");
			loadCollections(db, fixture, callback);
		});
	});
}

if (process.argv[1] == __filename) {
	var fixture = (process.argv.length > 2) ? process.argv[2] : 'default';
	loadFixture(fixture, function() {
		console.log("Fixture '%s' loaded", fixture);
	});
}

module.exports = {
	loadFixture: loadFixture
};

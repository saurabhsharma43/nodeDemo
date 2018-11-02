const MongoClient = require('mongodb').MongoClient;
module.exports = async function(){
	const client = await MongoClient.connect(url);
    const db = client.db('nodeapiwithmongodb');
	return db;
});
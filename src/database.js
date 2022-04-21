import { MongoClient } from 'mongodb';
import 'dotenv/config';

const username = process.env['DB_USERNAME'];
const pwd = process.env['PWD']; 

async function main(){
    const uri = `mongodb+srv://${username}:${pwd}@cluster0.ycngz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
 
    const client = new MongoClient(uri);
 
    try {
        await client.connect();
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);
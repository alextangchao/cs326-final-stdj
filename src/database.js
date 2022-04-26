import { MongoClient } from 'mongodb';
import 'dotenv/config';
import crypto from 'crypto';

const username = process.env['DB_USERNAME'];
const pwd = process.env['PWD']; 

const uri = `mongodb+srv://${username}:${pwd}@cluster0.ycngz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function main(){
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

export function crypto_hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function addUserToDB(user) {
    try {
        await client.connect();
        user.password = crypto_hash(String(user.password));
        await client.db("foodandumass").collection("user").insertOne(user);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
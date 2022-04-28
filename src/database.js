import {MongoClient, ServerApiVersion} from 'mongodb';
import 'dotenv/config';
import crypto from 'crypto';


export class DB_CRUD {
    constructor() {}

    async connect(db_url, db_name) {
        try {
            this.client = await MongoClient.connect(db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1
            });
            this.db = this.client.db(db_name);
        } catch (e) {
            console.error(e);
        }
    }

    async addUserToDB(user) {
        user.password = crypto_hash(String(user.password));
        await this.db.collection("user").insertOne(user);
    }

    //image
    async addImage(image) {
        const result = await this.db.collection("image").insertOne({data: image});
        return result.insertedId
    }

    async getImage(id) {
        return await this.db.collection("image").find({_id: id});
    }

    async deleteImage(id) {
        return await this.db.collection("image").deleteOne({_id: id});
    }
}

export function crypto_hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
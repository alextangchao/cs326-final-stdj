import {MongoClient, ServerApiVersion, GridFSBucket, ObjectId} from 'mongodb';
import 'dotenv/config';
import crypto from 'crypto';


export class DB_CRUD {
    constructor() {
    }

    async connect(db_url, db_name) {
        try {
            this.client = await MongoClient.connect(db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1
            });
            this.db = this.client.db(db_name);
            this.gfs = new GridFSBucket(this.db, {bucketName: 'image'});
        } catch (e) {
            console.error(e);
        }
    }

    async addUserToDB(user) {
        user.password = crypto_hash(String(user.password));
        await this.db.collection("user").insertOne(user);
    }

    //image
    getImage(id) {
        return this.gfs.openDownloadStream(ObjectId(id));
    }

    async checkImage(id) {
        return this.gfs.find({_id: ObjectId(id)}).toArray();
    }

    async deleteImage(id) {
        return this.gfs.delete(ObjectId(id));
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
}
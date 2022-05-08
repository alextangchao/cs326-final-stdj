import { MongoClient, ServerApiVersion, GridFSBucket, ObjectId } from "mongodb";
import "dotenv/config";
import crypto from "crypto";

export class DB_CRUD {
    constructor() {}

    async connect(db_url, db_name) {
        try {
            this.client = await MongoClient.connect(db_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
            });
            this.db = this.client.db(db_name);
            this.gfs = new GridFSBucket(this.db, { bucketName: "image" });
        } catch (e) {
            console.error(e);
        }
    }

    //user
    async addUserToDB(user) {
        user.password = crypto_hash(String(user.password));
        await this.db.collection("user").insertOne(user);
    }

    async getUsers() {
        return await this.db.collection("user").find().toArray();
    }

    async getUser(id) {
        return await this.db.collection("user").find(ObjectId(id)).toArray();
    }

    async updateUser(id, password, img_id) {
        const res = await this.db
            .collection("user")
            .updateOne({ username: id }, { $set: { password, img_id } });
        return res;
    }

    async deletUser(id) {
        const res = await this.db
            .collection("user")
            .deleteOne({ username: id });
        return res;
    }
    //review
    async addReview(review) {
        return await this.db.collection("review").insertOne(review);
    }

    async deleteReview(id) {
        return await this.db
            .collection("review")
            .deleteOne({ _id: ObjectId(id) });
    }

    async getReview(id) {
        return await this.db
            .collection("review")
            .find({ _id: ObjectId(id) })
            .toArray();
    }

    async getReviewByLocation(location) {
        if (location === "index") {
            return await this.db.collection("review").find().toArray();
        }
        return await this.db
            .collection("review")
            .find({ location: location })
            .toArray();
    }

    async getReviewByUserID(user_id) {
        return await this.db
            .collection("review")
            .find({ user_id: user_id })
            .toArray();
    }

    async updateReview(id, review) {
        const filter = { _id: ObjectId(id) };
        const updateReview = {
            $set: review,
        };
        const options = { upsert: false };
        return await this.db
            .collection("review")
            .updateOne(filter, updateReview, options);
    }

    //image
    getImage(id) {
        return this.gfs.openDownloadStream(ObjectId(id));
    }

    async checkImage(id) {
        return this.gfs.find({ _id: ObjectId(id) }).toArray();
    }

    async deleteImage(id) {
        return this.gfs.delete(ObjectId(id));
    }
}

export function crypto_hash(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
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
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

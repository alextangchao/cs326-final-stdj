import passport from 'passport';
import LocalStrategy from 'passport-local';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import { crypto_hash } from './database.js';
import jwt from 'jsonwebtoken'

const username = process.env['DB_USERNAME'];
const pwd = encodeURIComponent(process.env['PWD']);
const salt = process.env['SALT']

const uri = `mongodb+srv://${username}:${pwd}@cluster0.ycngz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

export async function auth_setup() {
    passport.use(new LocalStrategy(
        async function verify(username, password, done) {
            try {
                await client.connect();
                const user = { username: username, password: crypto_hash(password) };
                const matched = await client.db("foodandumass").collection("user").findOne(user);
                if (!matched) { return done(null, false, { message: 'Incorrect username or password.' }); }
                return done(null, { _id: matched._id });
            } catch (e) {
                return done(e);
            } finally {
                await client.close();
            }
        }
    ));
}

export async function login_return_token(request, response) {
    await passport.authenticate('local', async function(err, user, info) {
        if (err) response.status(404).json(err);

        if (user) {
            const body = { _id: user._id };
            const token = jwt.sign({ user: body }, salt);
            return response.json({ token });
        } else {
            response.status(401).json(info);
        }
    })(request, response);
}
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {  MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import { crypto_hash } from './database.js';

const username = process.env['DB_USERNAME'];
const pwd = process.env['PWD']; 

const uri = `mongodb+srv://${username}:${pwd}@cluster0.ycngz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export async function auth_setup() {
    passport.use(new LocalStrategy(
        async function verify(username, password, done) {
            try {
                await client.connect();
                const user = { username: username, password: crypto_hash(password) };
                const count = await client.db("foodandumass").collection("user").find(user).count();
                if (count === 0) { return done(null, false, { message: 'Incorrect username or password.' }); }
                return done(null, user);
            } catch (e) {
                return done(e);
            } finally {
                await client.close();
            }
        }
    ));
}
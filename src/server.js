import 'dotenv/config';
import express, { response } from 'express';
import logger from 'morgan';
import { faker } from '@faker-js/faker';
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import passport from 'passport';
import { auth_setup } from './auth.js';
import { addUserToDB } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dining_hall = ['hampshire', 'franklin', 'berkshire', 'worcester']
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(join(__dirname, 'client')));

const fake_user = {
    id: 0,
    name: faker.name.findName(),
    pfp_id: faker.datatype.uuid(),
    password: faker.animal.type()
};

const fake_review_1 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    created_date: faker.date.past(),
    location: faker.random.arrayElement(dining_hall)
}

const fake_review_2 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    created_date: faker.date.past(),
    location: faker.random.arrayElement(dining_hall)
}

const fake_review_3 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    created_date: faker.date.past(),
    location: faker.random.arrayElement(dining_hall)
}

const fake_image_id = {
    id: faker.datatype.uuid()
};

const FILE_PATH = "/client/img/food.png";


const fake_review_list = [fake_review_1, fake_review_2, fake_review_3]

// app.get('/', async (request, response) => {
//     response.send('Hello World!');
// })

// USERS
app.put('/user/update', async (request, response) => {
    response.status(200).json(fake_user);
});

app.delete('/user/delete', async (request, response) => {
    response.status(200).json(fake_user);
});

app.get('/user', async (request, response) => {
    response.status(200).json(fake_user);
});

// return all the reviews post by this user
app.get('/user/reviews', async (request, response) => {
    const options = request.query;
    response.status(200).json(fake_review_list);
});

// setup passport local strategy
auth_setup();

app.post('/user/login', passport.authenticate('local', {
    successRedirect: '/index.html',
    failureRedirect: '/login.html'
}));

app.post('/user/register', async (request, response) => {
    const options = request.body;
    if ('username' in options && 'password' in options) {
        const user = { username: options.username, passowrd: options.password };
        // to do handle images
        await addUserToDB(user);
        response.status(200).json(user);
    } else {
        response.status(400).json({ error: "Bad Requset: Missing params"});
    }
});

// REVIEWS
app.post('/review/create', async (request, response) => {
    response.status(200).json(fake_review_1);
});

app.post('/review', async (request, response) => {
    response.status(200).json(fake_review_1);
});

app.get('/review/location', async (request, response) => {
    const options = request.query;
    response.status(200).json(fake_review_list);
});

app.put('/review/update', async (request, response) => {
    response.status(200).json(fake_review_1);
});

app.delete('/review/delete', async (request, response) => {
    response.status(200).json(fake_review_1);
});

// IMAGE
app.post('/image/create', async function (req, response) {
    response.status(200).json(fake_image_id);
});

app.get('/image', async function (req, response) {
    response.sendFile(__dirname + FILE_PATH);
});

app.delete('/image/delete', async function (req, response) {
    response.status(200).json(fake_image_id);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

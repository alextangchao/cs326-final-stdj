import express, { response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dining_hall = ['hampshire', 'franklin', 'berkshire', 'worcester']
const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(join(__dirname, 'client')));

const fake_user = {
    id: 0,
    name: faker.name.findName(),
    pfp_id: faker.datatype.uuid()
};

const fake_review_1 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number( { min:1, max:5 } ),
    created_date: faker.date.past(),
    location:  faker.random.arrayElement(dining_hall)
}

const fake_review_2 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number( { min:1, max:5 } ),
    created_date: faker.date.past(),
    location:  faker.random.arrayElement(dining_hall)
}

const fake_review_3 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number( { min:1, max:5 } ),
    created_date: faker.date.past(),
    location:  faker.random.arrayElement(dining_hall)
}

const fake_image_id = {
    id: faker.datatype.uuid()
};

const FILE_PATH = "/client/img/food.png";

app.use('/', express.static('./src/client'));



const fake_review_list = [fake_review_1, fake_review_2, fake_review_3]

app.get('/', async (request, response) => {
    response.send('Hello World!');
})

// USERS
app.put('/user/update', async (request, response) => {
    response.status(200).json(fake_user);
});

app.delete('/user/delete', async (request, response) => {
    response.status(200).json(fake_user);
});

// REVIEWS
app.post('/review/create', async (request, response) => {
    response.status(200).json(fake_review_1);
});

app.post('/review/id', async (request, response) => {
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

app.get('/image/:image_id', async function (req, response) {
    response.sendFile(__dirname + FILE_PATH);
});

app.delete('/image/delete', async function (req, response) {
    response.status(200).json(fake_image_id);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

import express, { response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exp from 'constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('client'));

const fake_user = {
    id: 0,
    name: faker.name.findName(),
    pfp_id: faker.datatype.uuid()
};

const fake_review = {
    id: faker.datatype.uuid(),
    user_id: 0,
    review_text: faker.lorem.paragraph(),
    review_img_id: faker.datatype.uuid(),
    created_date: faker.date.past()
};

const fake_image_id = {
    id: faker.datatype.uuid()
};

const FILE_PATH = "/client/img/food.png";

app.use('/', express.static('./src/client'));

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
app.put('/review/update', async (request, response) => {
    response.status(200).json(fake_review);
});

app.delete('/review/delete', async (request, response) => {
    response.status(200).json(fake_review);
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

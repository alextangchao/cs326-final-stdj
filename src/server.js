import express, { response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

const dining_hall = ['hampshire', 'franklin', 'berkshire', 'worcester']
const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fake_user = {
    id: 0,
    name: faker.name.findName(),
    pfp_id: faker.datatype.uuid()
}

const fake_review_1 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.random.number(100),
    review_img_id: faker.datatype.uuid(),
    created_date: faker.date.past(),
    location:  faker.random.arrayElement(dining_hall)
}

const fake_review_2 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.random.number(100),
    review_img_id: faker.datatype.uuid(),
    created_date: faker.date.past(),
    location:  faker.random.arrayElement(dining_hall)
}

const fake_review_3 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.random.number(100),
    review_img_id: faker.datatype.uuid(),
    created_date: faker.date.past(),
    location:  faker.random.arrayElement(dining_hall)
}

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

app.post('/review/location', async (request, response) => {
    response.stutas(200).json(fake_review_list);
});

app.put('/review/update', async (request, response) => {
    response.status(200).json(fake_review_1);
});

app.delete('/review/delete', async (request, response) => {
    response.status(200).json(fake_review_1);
});

app.listen(port, () => {
    console.log(`Server started on poart ${port}`);
});
import express, { response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

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

const fake_review = {
    id: faker.datatype.uuid(),
    user_id: 0,
    review_text: faker.lorem.paragraph(),
    review_img_id: faker.datatype.uuid(),
    created_date: faker.date.past()
}

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

app.listen(port, () => {
    console.log(`Server started on poart ${port}`);
});
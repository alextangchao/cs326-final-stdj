import express, { response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// USERS
app.put('/user/update', async (request, response) => {
    
});

app.delete('/user/delete', async (request, response) => {

});

// REVIEWS
app.put('/review/update', async (request, response) => {

});

app.delete('/review/delete', async (request, response) => {
    
});

app.listen(port, () => {
    console.log(`Server started on poart ${port}`);
});
import 'dotenv/config';
import express, {response} from 'express';
import logger from 'morgan';
import {faker} from '@faker-js/faker';
import cors from "cors";
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import {auth_setup, login_return_token} from './auth.js';
import {DB_CRUD} from './database.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const username = process.env['DB_USERNAME'];
const pwd = encodeURIComponent(process.env['PWD']);
const DB_URL = `mongodb+srv://${username}:${pwd}@cluster0.ycngz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const DB_NAME = "foodandumass";

const db_crud = new DB_CRUD();
await db_crud.connect(DB_URL, DB_NAME);

const dining_hall = ['hampshire', 'franklin', 'berkshire', 'worcester']
const app = express();
const port = process.env.PORT || 3000;
const storage = new GridFsStorage({
    db: db_crud.db,
    file: (req, file) => {
        return {
            bucketName: 'image',
            filename: file.originalname
        }
    }
});
const upload = multer({storage});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(join(__dirname, 'client')));

const fake_user = {
    id: 0, name: faker.name.findName(), pfp_id: faker.datatype.uuid(), password: faker.animal.type()
};

const fake_review_1 = {
    id: faker.datatype.uuid(),
    user_id: 0,
    user_name: faker.name.findName(),
    review_text: faker.lorem.paragraph(),
    review_num: faker.datatype.number(100),
    review_img_id: faker.datatype.uuid(),
    rating: faker.datatype.number({min: 1, max: 5}),
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
    rating: faker.datatype.number({min: 1, max: 5}),
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
    rating: faker.datatype.number({min: 1, max: 5}),
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
await auth_setup();

app.post('/user/login', login_return_token);

app.post('/user/register', async (request, response) => {
    const options = request.body;
    if ('username' in options && 'password' in options) {
        const user = {username: options.username, password: options.password};
        // to do handle images
        await db_crud.addUserToDB(user);
        response.status(200).json(user);
    } else {
        response.status(400).json({error: "Bad Requset: Missing params"});
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
app.post('/image/create', upload.single('image'), async function (req, response) {
    // console.log("image create", req.file);
    if (req.file === undefined || req.file.id === undefined) {
        response.status(400).json({error: "Bad Requset: Missing params"});
    } else {
        response.status(200).json({id: req.file.id});
    }
});

app.get('/image', async function (req, response) {
    const id = req.query.id;
    if (id === undefined || id === null) {
        response.status(400).json({error: "Bad Requset: Missing params"});
    } else {
        const image = await db_crud.checkImage(id);
        if (image.length === 0) {
            response.status(400).json({error: "Bad Requset: Image not exist"});
        } else {
            db_crud.getImage(id).pipe(response);
        }
    }
});

app.delete('/image/delete', async function (req, response) {
    const id = req.body.id;
    if (id === undefined || id === null) {
        response.status(400).json({error: "Bad Requset: Missing params"});
    } else {
        const image = await db_crud.checkImage(id);
        if (image.length === 0) {
            response.status(400).json({error: "Bad Requset: Image not exist"});
        } else {
            await db_crud.deleteImage(id);
            response.status(200).json({id: id});
        }
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

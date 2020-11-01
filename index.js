import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors'
import db from './app/models/index.js';
import dbConfig from './app/config/db.config.js';
import { authRoute } from './app/routes/auth.routes.js';
import { userRoute } from './app/routes/user.routes.js';
import mongoose from 'mongoose'

const app = express();
const port = 5000;

let corsOption = {
    origin: "http://localhost:4000"
};

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

authRoute(app);
userRoute(app);

const Role = db.role;

const user =  "username";
const password = "password"

const path = "string";

db.mongoose.connect(path, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Successfully connect to MongoDB")
                initial();
            })
            .catch(err => {
                console.error("Connection Error", err);
                process.exit();
            })

const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to collection")
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to collection")
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to collection")
            });
        }
    })
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
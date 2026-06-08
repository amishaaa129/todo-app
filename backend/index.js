import dotenv from 'dotenv';
dotenv.config({path:'../.env'});
import { app } from './app.js';
import connectDB from './db/index.js';

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log('server running on port 5000');
    })
})
.catch((error) => {
    console.log("mongodb connection failed ", error);
});
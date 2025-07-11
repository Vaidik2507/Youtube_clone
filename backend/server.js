import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './Router/router.js';

mongoose.connect(process.env.MONGODB_URL);

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to youtube');
})

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening');
})
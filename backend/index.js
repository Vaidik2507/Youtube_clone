import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to youtube');
})

app.listen(3000, () => {
    console.log('listening');
})
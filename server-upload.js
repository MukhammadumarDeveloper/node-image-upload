const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const mongoose = require('mongoose');
const Image = require('./models/image');
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/file-upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('error', console.log);

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const id = uuid();
            const filePath = `images/${id}${ext}`;
            Image.create({
                filePath
            })
                .then(() => {
                    cb(null, filePath)
                })
        }
    }
)
const upload = multer({ storage });

const app = express();
app.use(express.static('public'));
app.use(express.static('uploads'));

app.post('/upload', upload.array('avatar'), (req, res) => {
    path.join()
    return res.redirect('/');
});

app.get('/api/images', async (req, res) => {
    try {
        const images = await Image.find({});
        return res.status(200).json(images);
    } catch (error) {
        return res.status(404).json(error);
    }
});

app.get('/images', (req, res) => {
    Image.find({})
        .then((images) => {

        })
})

app.delete('/images/:id', async (req, res) => {
    try {
        await Image.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json('ok deleted!');
    } catch (error) {
        return res.status(400).json(error);
    }
})

// Open your browser and go to url: http://localhost:3001
app.listen(3001, () => console.log('App listening at 3001 port...'))
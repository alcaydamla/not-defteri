const express = require('express');
require('dotenv').config();
const cors = require('cors'); 
const notRoute = require('./routes/notlar');
const kullaniciRoute = require('./routes/kullanici');
const mongoose = require('mongoose');

const app = express(); 

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Veritabanı Bağlandı');

        const server = app.listen(process.env.PORT, () => {
            console.log(`${process.env.PORT}. port dinleniyor`);
        });

        process.on('SIGINT', () => {
            console.log('Received SIGINT. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGTERM', () => {
            console.log('Received SIGTERM. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    })
    .catch(err => {
        console.error('Veritabanı bağlantı hatası:', err.message);
    });


app.use('/api/notlar', notRoute);
app.use('/api/kullanici', kullaniciRoute);

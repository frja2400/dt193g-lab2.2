'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();
const serieRoutes = require('./routes/serieRoutes');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'] // Tillåt anrop från Netlify
            }
        }
    });

    // Anslut till MongoDB
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB: ' + error);
    });


    // Registrera routes
    serieRoutes(server);

    // Root-route för live-servern
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response(`
                <h1>Välkommen till mitt Serie-API!</h1>
                <p>Se README.md för information om webbtjänsten, endpoints och instruktioner om installation.</p>
            `).type('text/html');
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
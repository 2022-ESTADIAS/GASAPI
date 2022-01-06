const express  = require('express');
const app = express();




const placesRoutes = require('./routes/places.routes');

app.use(placesRoutes);




module.exports = {
    app
}



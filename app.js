const express  = require('express');
const app = express();




const Routes = require('./routes/routes');

app.use(Routes);




module.exports = {
    app
}



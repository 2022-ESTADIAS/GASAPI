const express  = require('express');
const cors = require('cors');
const app = express();


app.use(cors());


const Routes = require('./routes/routes');
app.use(Routes);




module.exports = {
    app
}



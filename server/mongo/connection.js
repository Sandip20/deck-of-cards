const config = require('../../config/env');
const mongoose = require('mongoose');
mongoose.connect(config.MONGO_URL, (err) => {
    if (err)
        console.log(err);
    else
        console.log('connected to ' + config.MONGO_URL);
})
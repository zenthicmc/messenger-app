const mongoose = require('mongoose');
option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(process.env.MONGODB_URI, option,);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database Connected');
})

require('../src/models/User');
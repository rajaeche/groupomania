const mongoose = require('mongoose');

const uri = `mongodb+srv://rajaeche2:g303Pbf1ZtIN7LO8@cluster0.wehshrb.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('Connexion à mongoDB réussi!'))
    .catch((err) => console.log('Connexion à mongoDB échoué!', err));
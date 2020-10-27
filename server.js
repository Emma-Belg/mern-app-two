const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const path = require('path');

const routes = require('./routes/api')
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/mern_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then();

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected :)');
});

app.use(express.json());
//the 'extended' asks if we want to look deep into the object
//if you have a nested object then you should set this to true
app.use(express.urlencoded({extended: false}))

/*//this is a simple way to solve cors errors but is not ideal
const cors = require('cors');
app.use(cors());
//The better way is to add a proxy to the frontend that tells it
to use the backend port. You do this by adding '"proxy": "http://localhost:8080"'
to the package.json of the FRONT END app.
This means that will search for all on the front end port but
whenever it cannot find it's own port (3000 in this case), it will
remap all 'unknown requests' to the port defined in the proxy*/

/*//Saving Data to our mongo DB
const data = {
    title: 'new test',
    body: 'dummy data'
};

const newBlogPost = new BlogPost(data);
/!*newBlogPost.save((error) => {
    if (error) {
        console.log('Oops, something wrong happened');
    } else {
        console.log('Data has been saved.')
    }
});*!/*/


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

//morgan is used to log HTTP requests in terminal
app.use(morgan('tiny'));
app.use('/api', routes);
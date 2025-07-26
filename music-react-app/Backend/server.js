const express= require('express');   // Importing express
const mongoose= require('mongoose');   // Importing mongoose
const fav_routes= require('./routes/favourites') // Importing the routes file
const cors = require('cors');   // Importing cors


const app= express();

app.use(express.json());   // Middleware to parse JSON (important if you're sending JSON from frontend)

app.use(cors());   // It tells your Express backend to allow requests from any origin.

mongoose.connect('mongodb://localhost/Music-Library')   // Connecting the mongodb database
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Failed to connect to MongoDb"))

app.use('/favourites', fav_routes);   //Whenever there is a request with endpoint 'favourites'
                                                    //send it to the route
                                                    
// Starting the server at port 8000                                                  
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});




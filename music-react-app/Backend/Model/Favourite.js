const mongoose= require('mongoose');

const fav_Schema= new mongoose.Schema({
    name: String,
    image: String
});

module.exports= mongoose.model("Favourite", fav_Schema);
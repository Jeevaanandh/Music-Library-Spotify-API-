const express= require('express');
const router= express.Router();
const Favourite= require("../Model/Favourite");

// Displaying all the favourites
router.get("/", async function(req,res){  
    const fav= await Favourite.find();
    res.json(fav);
});

router.post("/", async function(req,res){
    const name= req.body.name;
    const present= await Favourite.findOne({name})
    if(present){
        return res.status(200).json({ message: "Already in favourites" });
    }
    const fav= new Favourite({
        name: req.body.name,
        image: req.body.image
    });

    const newfav= await fav.save();   // saving the new task in the database
    res.json({message: "Added"});
});

module.exports = router;  

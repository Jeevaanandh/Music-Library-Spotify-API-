import React from "react";
import {useState, useEffect} from "react"


function Favourites_Page(props){

    const [fav_arr, setFavArr]= useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/favourites`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => setFavArr(data))

    }, [])



    return(
        <div>
            {fav_arr.map((fav) => (

                <>
                    <div className="Fav_div2" key={fav._id}>
                        
                        <img src={fav.image} className="fav-img"></img>
                        <h4 className="fav_name">{fav.name}</h4>
                    </div>
                    <hr></hr>
                
                
                </>
                
            ))}

        </div>
    )

}

export default Favourites_Page
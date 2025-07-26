import React from "react";
import {useState} from "react"

function SearchBar(props){

    const [input, setInput] = useState("");
    

    function HandleChange(e){
        setInput(e.target.value);
    }

    async function Search(){
        //Getting the artist Id of the searched artist. Since we can only access the artists based on their unique Id's
        
        const artist_id=  await fetch('https://api.spotify.com/v1/search?q='+input+'&type=artist',{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + props.token
            }
        })
        .then(res => res.json())
        .then(data => {return data.artists.items[0].id});  // Returns the artist Id to artist_id

        fetch('https://api.spotify.com/v1/artists/'+ artist_id + '/albums' + '?include_groups=album&market=US&limit=50',{
            method: "GET",
            headers:{
                'Authorization':'Bearer ' + props.token

            }
        })
        .then(res => res.json())
        .then(data => {console.log(data);
            props.set_Album(data.items)})
    }

    return(
        <div className="search">
            <input type="text" className="search_bar" placeholder="Search..." onChange={HandleChange}></input>
            <button className="search-btn" onClick={Search}>Find</button>
            <button className="show-fav" onClick={() =>{
                props.setshowfav(true)
            }}>Show Favourites</button>
        </div>
    )

}

export default SearchBar;
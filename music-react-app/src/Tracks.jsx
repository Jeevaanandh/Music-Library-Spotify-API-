import React from "react";
import {useState, useEffect} from "react"

function Tracks(props){
    const album_id= props.selected_album.id;
    const [tracks, setTracks]= useState([]);

    


    

    useEffect(()=> {
        fetch('https://api.spotify.com/v1/albums/' + album_id +'/tracks',{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + props.token
            }
        })
        .then(res => res.json())
        .then(data=> setTracks(data.items))


    },[])


    console.log(tracks);

    return(
        <div className="parent-div">
            {tracks.map((track, index) => (
                <>
                    <h4 className="track-name" onClick={() =>{
                        

                        fetch('https://api.spotify.com/v1/me/player/queue?uri='+ track.uri,{
                            method: "POST",
                            headers:{
                                'Authorization':'Bearer ' + props.token
                            }
                        })
                        .then(res => res.json())
                        .then(data => console.log(data.error.message))

                    }}>{index+1}. {track.name}</h4>
                    <hr></hr>
                </>
                
            ))}

        </div>
    )

}

export default Tracks
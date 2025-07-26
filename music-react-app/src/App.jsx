import SearchBar from "./SearchBar"
import Tracks from "./Tracks";
import Favourites_Page from "./Favourites_Page";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {

  const client_id = import.meta.env.VITE_CLIENT_ID;

  const client_secret= import.meta.env.VITE_CLIENT_SECRET;
  const [access_token, setAccess]= useState("");
  const [albums, setAlbum]= useState([]);

  const [show_tracks, setShowTracks]= useState(false);

  const [cur_album, setCurAlbum]= useState(null);

  const [fav_added, setFavAdded]= useState(false);

  const [show_fav, setShowFav]= useState(false);

  function GoBack(){
    setShowTracks(false);
    setFavAdded(false);
    setShowFav(false);
  }

  function AddFav(){
    if(!fav_added){
      fetch(`http://localhost:8000/favourites`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: cur_album.name,
              image: cur_album.images[1].url
            })

        })
        .then(res => res.json())
        .then(data=> console.log(data.message))
    }

    else{
      // Remove from favourites
    }
    setFavAdded(!fav_added);
  }


  useEffect(() =>{
    fetch("https://accounts.spotify.com/api/token",{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      body: "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret

    })
    .then(res => res.json())
    .then(data => setAccess(data.access_token))

  }, [])

  

  return(
    <div>

      <div className={`Main_Block ${show_tracks || show_fav ? "blocked" : ""}`}>
          <SearchBar token={access_token} album_arr={albums} set_Album={setAlbum} fav_show={show_fav} setshowfav={setShowFav}></SearchBar>
      <Container className="Main-Container">

        <Row className="mx-2 row row-cols-4">

          {albums.map((album) =>(

            <Card onClick={() =>{
              setCurAlbum(album);
              setShowTracks(true);
            }} className="album-card">
              <Card.Img src= {album.images[0].url}></Card.Img>
              <Card.Title>{album.name}</Card.Title>
            </Card>

          ))}

        </Row>
        
      </Container>
      </div>

      
      {show_tracks && (
        <div className="Tracks_div">
          <div className="tracks_col"> 
            <button className="back-btn" onClick={GoBack}>Back</button>
            <button className="add-fav" onClick={AddFav}>{!fav_added ? `Add To Favourites` : `Remove from favourites`}</button>
          </div>
          
          <br></br>
          <br></br>
          <Tracks selected_album={cur_album} token={access_token} tracks_bool={show_tracks} />
          
        </div>
      )}


      {show_fav && (
        <div className="Fav_div">
          <button className="back-btn" onClick={GoBack}>Back</button>

          <br></br>
          <br></br>
          <Favourites_Page showfav={show_fav} setshowfav= {setShowFav}></Favourites_Page>

        </div>
      )}

      

    </div>
  )
  
  
}

export default App

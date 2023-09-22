import { useEffect, useState } from 'react'
import './App.css'
import CardDesign from './cards'; 

function App() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch("https://api.rawg.io/api/games?key=abce582b7da24e519dc8a1a07095d009")
      .then(response => response.json())
      .then(data => setGames(data.results));
  }, []);

  return (
    <div id="app" className="container"> 
      {games.map((game) => (
        <CardDesign data-image={game.background_image} >
          <h1 slot="header">{game.name}</h1>
          <p slot="content">Rating: <span>{game.rating} </span></p>
          <p slot="content">Released: <span>{game.released} </span></p>
        </CardDesign>
      ))}
      <CardDesign /> 
    </div>
  );
}

export default App;

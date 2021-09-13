import React, { useEffect, useState } from 'react';
import './App.css';
import PrintaSwapi from './PrintaSwapi';

function App() {
  
  const [starwarsX, setStarwarsX] = useState([])
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    async function fetchStarwars(){
      setLoading(false);
      const resp = await fetch('https://swapi.dev/api/films')
      const star = await resp.json()      
      const star10 = star.results.slice(0,10)      
      setStarwarsX(star10);             
    }
    setTimeout(fetchStarwars,1000);
    setLoading(true);
            
  },[]); 

  return (
        <div>
          <h1>STAR WARS </h1>
          {loading ? <h3> ---- loading ---- </h3> : <div></div>}
       <PrintaSwapi      
        starwars={starwarsX}        
        /> 
      </div>  
  ) 
}

export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetList from './PlanetList';
import PlanetDetail from './PlanetDetail';
import './App.css';


const App = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const NASA_API_KEY = 'gZddT9VluGaDLSqWcxgbWCE3LccEtroFWFUQwUcF'; // Replace with your NASA API key

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/');
        const planetData = response.data.bodies.filter(body => body.isPlanet);

        const formattedPlanets = await Promise.all(
          planetData.map(async (planet) => {
            const imageResponse = await axios.get(
              `https://images-api.nasa.gov/search?q=${encodeURIComponent(planet.englishName)}&media_type=image`,
              {
                headers: { 'Content-Type': 'application/json' },
              }
            );

            const imageLink = imageResponse.data.collection.items[0]?.links?.[0]?.href;
            return {
              id: planet.id,
              name: planet.englishName,
              image: imageLink || '', 
              details: {
                semimajorAxis: planet.semimajorAxis,
                meanRadius: planet.meanRadius,
                mass: planet.mass,
              },
            };
          })
        );

        setPlanets(formattedPlanets);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };

  return (
    <div className="App">
      <h1>Solar System Planets App</h1>
      <div className="container">
        <div className="left-panel">
          <PlanetList planets={planets} onPlanetClick={handlePlanetClick} />
        </div>
        <div className="right-panel">
          <PlanetDetail selectedPlanet={selectedPlanet} />
        </div>
      </div>
    </div>
  );
};

export default App;
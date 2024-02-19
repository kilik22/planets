import React, { useState, useEffect } from 'react';

const PlanetList = ({ planets, onPlanetClick }) => {
  return (
    <ul>
      {planets.map((planet) => (
        <li key={planet.id} onClick={() => onPlanetClick(planet)}>
          {planet.name}
        </li>
      ))}
    </ul>
  );
};

export default PlanetList;
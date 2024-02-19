import React, { useState, useEffect } from 'react';

const PlanetDetail = ({ selectedPlanet }) => {
  return (
    <div>
      {selectedPlanet ? (
        <div>
          <h2>{selectedPlanet.name}</h2>
          <img src={selectedPlanet.image} alt={selectedPlanet.name} style={{ maxWidth: '100%' }} />
          <p>Semimajor Axis: {selectedPlanet.details?.semimajorAxis}</p>
          <p>Mean Radius: {selectedPlanet.details?.meanRadius}</p>
          {selectedPlanet.details?.mass && (
            <p>
              Mass: {selectedPlanet.details.mass.massValue} x 10^
              {selectedPlanet.details.mass.massExponent}
            </p>
          )}
        </div>
      ) : (
        <p>Select a planet to see details.</p>
      )}
    </div>
  );
};


export default PlanetDetail;
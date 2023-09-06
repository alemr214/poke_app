import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data", error);
      });
  }, [pokemonName]);

  return (
    <div className="card">
      {pokemonData && (
        <>
          <img
            className="card-img-top"
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
          <div className="card-body bg-light">
            <h5 className="card-title">{pokemonData.name}</h5>
            <p className="card-text">
              Types:{" "}
              {pokemonData.types.map((type) => (
                <span key={type.slot} className="badge bg-info me-1">
                  {type.type.name}
                </span>
              ))}
            </p>
            <button type="button" class="btn btn-primary">
              More info
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;

import React from "react";

function PokemonCard({ pokemon, handlePokemonClick, selectedPokemon }) {
  return (
    <div
      className="card mb-3"
      style={{ cursor: "pointer" }}
      onClick={() => handlePokemonClick(pokemon.name)}
    >
      {selectedPokemon && selectedPokemon.id === +pokemon.url.split("/")[6] ? (
        <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
          className="card-img-top"
        />
      ) : (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split("/")[6]
          }.png`}
          alt={pokemon.name}
          className="card-img-top"
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
      </div>
    </div>
  );
}

export default PokemonCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const List = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=18") // Cambia el límite según sea necesario
      .then((response) => {
        const names = response.data.results.map((pokemon) => pokemon.name);
        setPokemonList(names);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list", error);
      });
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-6 g-4">
      {pokemonList.map((pokemonName, index) => (
        <div className="col" key={index}>
          <Card pokemonName={pokemonName} />
        </div>
      ))}
    </div>
  );
};

export default List;

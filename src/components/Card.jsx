import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=18") // Call PokeAPI
      .then((response) => {
        const names = response.data.result.map((pokemon) => pokemon.name); // Pass pokemons name
        setPokemonList(names); // Keeping pokemons
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list", error); // Error message
      });
  }, []);

  return (
    <div class="card">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  );
}

export default Card;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Pagination from "./Pagination";

const List = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 18; // Cantidad de Pokémon por página

  useEffect(() => {
    const offset = (currentPage - 1) * pokemonPerPage;
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`
      )
      .then((response) => {
        const names = response.data.results.map((pokemon) => pokemon.name);
        setPokemonList(names);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list", error);
      });
  }, [currentPage]);

  return (
    <div className="container">
      <div className="row row-cols-2 row-cols-lg-6 row-cols-md-4 g-4">
        {pokemonList.map((pokemonName, index) => (
          <div className="col" key={index}>
            <Card pokemonName={pokemonName} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          currentPage={currentPage}
          pokemonPerPage={pokemonPerPage}
          totalPokemon={807} // Cambia este número al total real de Pokémon
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default List;

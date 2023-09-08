import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import PokemonCard from "./Card";
import PokemonModal from "./Modal";
import Pagination from "./Pagination";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const itemsPerPage = 18;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        setPokemonList(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    fetchData();
  }, [currentPage]);

  const handlePokemonClick = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error("Pokémon not found:", error);
      setSelectedPokemon(null);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonList]);

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 g-4">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.name} className="col">
            <PokemonCard
              pokemon={pokemon}
              handlePokemonClick={handlePokemonClick}
              selectedPokemon={selectedPokemon}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <PokemonModal selectedPokemon={selectedPokemon} closeModal={closeModal} />
    </div>
  );
}

export default PokemonList;

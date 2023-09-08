import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonList]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Pokémon por nombre o ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={handleSearch}
        style={{ marginLeft: "10px" }}
      >
        Buscar
      </button>
      <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 g-4">
        {selectedPokemon && (
          <div className="col">
            <div className="card mb-3">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                alt={selectedPokemon.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{selectedPokemon.name}</h5>
                <p className="card-text">
                  Tipo:{" "}
                  {selectedPokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="badge bg-primary me-2"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.name} className="col">
            <div
              className="card mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                {selectedPokemon && selectedPokemon.name === pokemon.name && (
                  <p className="card-text">
                    Tipo:{" "}
                    {selectedPokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="badge bg-primary me-2"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PokemonList;

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
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.name} className="col">
            <div
              className="card mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              {selectedPokemon &&
              selectedPokemon.id === +pokemon.url.split("/")[6] ? (
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
          </div>
        ))}
      </div>
      {/* Modal */}
      {selectedPokemon && (
        <div
          className="modal fade show"
          id="pokemonModal"
          tabIndex="-1"
          aria-labelledby="pokemonModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="pokemonModalLabel">
                  Información del Pokémon - {selectedPokemon.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6">
                    <h5>Nombre: {selectedPokemon.name}</h5>
                    <p>
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
                    <h5>Habilidades:</h5>
                    <ul>
                      {selectedPokemon.abilities.map((ability) => (
                        <li key={ability.ability.name}>
                          {ability.ability.name}
                        </li>
                      ))}
                    </ul>
                    <h5>Poderes:</h5>
                    <ul>
                      {selectedPokemon.moves.slice(0, 5).map((move) => (
                        <li key={move.move.name}>{move.move.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonList;

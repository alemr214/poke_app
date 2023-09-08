import React from "react";

function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
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
    </div>
  );
}

export default SearchBar;

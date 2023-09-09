import React from "react";

function Modal({ selectedPokemon, closeModal }) {
  if (!selectedPokemon) {
    return null;
  }

  return (
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
                    <li key={ability.ability.name}>{ability.ability.name}</li>
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
  );
}

export default Modal;

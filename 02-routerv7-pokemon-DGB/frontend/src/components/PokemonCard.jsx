import { usePokemon } from "../context/PokemonContext";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
    
    const { addToFavorites } = usePokemon();
    const { pokemons } = props;

  return (
    <>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="bg-white shadow-md rounded-md p-6">
            <div className="relative group">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto transform group-hover:scale-120 transition-transform duration-500"
              />
            </div>
            <h2 className="text-xl font-semibold text-center capitalize mt-2">
              {pokemon.name}
            </h2>
            {/* Aquí van los botones  */}
            <div className="flex justify-center space-x-2 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition-all duration-150"
                // onClick={hand} aquí llamaré a la función del contexto para añadir a favoritos
                onClick={() => addToFavorites(pokemon)}
              >
                Añadir a Favoritos
              </button>
            
              {/* // tiene que ir a /search/${pokemon.name} */}
            
              <Link
                to={`/search/${pokemon.name}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
    </>
  )
}

export default PokemonCard
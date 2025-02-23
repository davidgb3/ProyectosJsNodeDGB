import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import { ROUTES } from "../routes/paths";
const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = usePokemon();

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-4">Favoritos</h1>
        <p>No tienes pokemons en favoritos actualmente</p>
        <Link
          className="text-blue-800 hover:underline block mt-4 "
          to={ROUTES.HOME}
        >
          Volver a la página de inicio
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tus Pokemons favoritos</h1>
      {/* grid con las tarjetas de los pokemons */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-amber-100 rounded-lg p-4 shadow-amber-200 shadow-lg"
          >
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center capitalize mt-2">
              {pokemon.name}
            </h2>
            {/* botones */}
            <div className="mt-4 space-y-2">
              <Link
                to={`${ROUTES.SEARCH}/${pokemon.name}`}
                className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition-all duration-150"
              >
                Ver Detalles
              </Link>
              <button
                onClick={() => removeFromFavorites(pokemon.id)}
                className="cursor-pointer w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition-all duration-150"
              >
                Eliminar Favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

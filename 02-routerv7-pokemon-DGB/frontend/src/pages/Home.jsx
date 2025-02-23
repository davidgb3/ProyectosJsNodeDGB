import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import PokemonCard from "../components/PokemonCard";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  const fetchPokemons = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_BACKEND_URL}/pokemons?page=${page}&limit=100`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      // seteo en el estado los pokemonDetails
      setPokemons(data);
    } catch (error) {
      console.log("Error fetching pokemons", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6 underline">Pokemons disponibles</h1>
      {/* Grid de las tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta individual de cada Pokemon */}
        {pokemons.length > 0 ? (
          <>
            <PokemonCard pokemons={pokemons} />
            {/* Botones de paginación */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 h-fit hover:bg-gray-400"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="text-xl font-semibold mr-2">{page}</span>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded h-fit hover:bg-gray-400"
                onClick={handleNextPage}
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-2xl italic font-semibold text-center text-gray-600">
            No hay pokemons disponibles.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;

import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getImageUrl, getMovieDetails } from "../services/tmdb";
import { PropagateLoader } from "react-spinners";

const MovieDetail = () => {
  const { id } = useParams();
  // Hook para traer las películas populares
  const { data, loading, error } = useFetch(() => getMovieDetails(Number(id), [id]));

  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      {loading && <div><PropagateLoader /></div>}
      {error && <div className="text-red-600 text-center">Error al cargar la película: {error.message}</div>}
      {data && (
        <article className="max-w-4xl mx-auto">
          <header className="relative h-96 mb-8">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={getImageUrl(data?.backdrop_path, "original")}
              alt={data?.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg">
              <div className="absolute bottom-0 text-white p-6">
                <h1 className="text-4xl font-bold">{data.title}</h1>
                <p className="text-xl">{data.release_date} | {data.runtime} minutos</p>
                <p className="text-lg">{data.vote_average.toFixed(1)} ⭐️</p>
              </div>
            </div>
          </header>

          <div className="flex flex-row items-center justify-center gap-6">
            <img
              className="w-75 h-full object-cover rounded-lg"
              src={getImageUrl(data?.poster_path, "original")}
              alt={data?.title}
            />
            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Sinopsis</h2>
                <p className="text-lg">{data?.overview}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
                {/* Aquí se cargan las reseñas */}
                <p className="font-bold italic text-2xl">No hay reseñas</p>
              </div>
            </section>
          </div>
        </article>
      )}
    </div>
  )
}

export default MovieDetail
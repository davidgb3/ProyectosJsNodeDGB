import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-800">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4">¡Oops!</h1>
          <div className="mb-6">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png"
              alt="Magikarp"
              className="w-32 h-32 mx-auto animate-bounce"
            />
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-2">
            Ha ocurrido un error inesperado
          </p>
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

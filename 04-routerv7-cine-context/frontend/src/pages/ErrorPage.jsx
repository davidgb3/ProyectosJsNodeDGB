import { Link } from "react-router-dom";
import { ROUTES } from "../router/paths";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl p-8 text-center">
        <div className="mb-8">
          <div className="mb-4">
            <span className="text-8xl">😕</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ¡Ups! Algo salió mal
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            La página que estás buscando no existe o ha ocurrido un error.
          </p>

          <Link 
            to={ROUTES.MOVIELIST}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage
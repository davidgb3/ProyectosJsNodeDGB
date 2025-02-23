import {  NavLink } from "react-router-dom";
import { ROUTES } from "../routes/paths";
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-600 to-blue-600 shadow-lg">
      {/* ICONO */}
      <div className="container mx-auto p-4 justify-between flex items-center">
        <NavLink to={ROUTES.HOME} className="text-white text-2xl font-bold hover:text-black hover:text-3xl transition-all duration-150">
          POKÉDEX
        </NavLink>
        {/* Contenedor navegación */}
        <div className="space-x-4">
          {/* isActive (callback) */}
          <NavLink
            to={ROUTES.HOME}
            className={({
              isActive,
            }) => `text-white  hover:text-black text-2xl hover:text-3xl hover:font-semibold transition-all duration-150  
            ${isActive ? "font-bold text-3xl" : ""}`}
          >
            Inicio
          </NavLink>
          <NavLink
            to={ROUTES.SEARCH}
            className={({
              isActive,
            }) => `text-white  hover:text-black text-2xl hover:text-3xl hover:font-semibold transition-all duration-150  
            ${isActive ? "font-bold text-3xl" : ""}`}
          >
            Buscar
          </NavLink>
          <NavLink
            to={ROUTES.FAVORITES}
            className={({
              isActive,
            }) => `text-white  hover:text-black text-2xl hover:text-3xl hover:font-semibold transition-all duration-150  
            ${isActive ? "font-bold text-3xl" : ""}`}
          >
            Favoritos
          </NavLink>
          <NavLink
            to={ROUTES.ABOUT}
            className={({
              isActive,
            }) => `text-white  hover:text-black text-2xl hover:text-3xl hover:font-semibold transition-all duration-150  
            ${isActive ? "font-bold text-3xl" : ""}`}
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

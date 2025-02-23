import { NavLink } from "react-router-dom"
import { ROUTES } from "../router/paths"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-sky-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-start">          
          <div className="flex justify-between h-16">
            {/* Seccion izq del nav */}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-4 ml-10">
                <NavLink to="/movies" className="text-lg font-bold">VideoClub</NavLink>
                <NavLink to={ROUTES.MOVIELIST} className="hover:text-amber-600">Movies</NavLink>
                <NavLink to={ROUTES.SEARCH} className="hover:text-amber-600">Search</NavLink>
                {isAuthenticated ? (<NavLink to={ROUTES.REVIEWS} className="hover:text-amber-600">Reviews</NavLink>) : ('')}
                {isAuthenticated ? (<NavLink to={ROUTES.FAVOURITES} className="hover:text-amber-600" >Favourites</NavLink>) : ('')}
                <NavLink to={ROUTES.ABOUT} className="hover:text-amber-600" >About</NavLink>
            
            </div>
            <div className="flex space-x-4 ml-10">
              {!isAuthenticated ? (<NavLink to={ROUTES.LOGIN} className="hover:text-amber-600">Iniciar Sesión</NavLink>) : ('')}
              {!isAuthenticated ? (<NavLink to={ROUTES.REGISTER} className="hover:text-amber-600" >Registrarse</NavLink>) : ('')}
              {isAuthenticated ? (<NavLink to={ROUTES.LOGIN} onClick={handleLogout} className="hover:text-amber-600" >Cerrar Sesión</NavLink>) : ('')}
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
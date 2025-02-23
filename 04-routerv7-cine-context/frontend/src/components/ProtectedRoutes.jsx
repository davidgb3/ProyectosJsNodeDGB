import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { ROUTES } from "../router/paths";

const ProtectedRoutes = ({children}) => {

  const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return(
        <Navigate to={ROUTES.MOVIELIST}/>
    )
  } return children;
}

export default ProtectedRoutes
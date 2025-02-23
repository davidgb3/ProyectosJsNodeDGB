import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import Search from "../pages/Search";
import Reviews from "../pages/Reviews";
import Favourites from "../pages/Favourites";
import { ROUTES } from "./paths";
import AboutPage from "../pages/AboutPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "../components/ProtectedRoutes";


export const router = createBrowserRouter([
    {
        path:ROUTES.HOME,
        element: <RootLayout />,
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element: <Navigate to={ROUTES.LOGIN} replace/>
            },
            {
                path: ROUTES.LOGIN,
                element: <Login/>
            },
            {
                path: ROUTES.REGISTER,
                element: <Register/>
            },
            {
                path:ROUTES.MOVIELIST,
                element: <Home/>
            },
            {
                path:ROUTES.SEARCH,
                element: (
                    <ProtectedRoutes>
                      <MovieDetail/>
                    </ProtectedRoutes>
                )
            },
            {
                path:ROUTES.SEARCHBYNAME,
                element:<Search/>
            },
            {
                path:ROUTES.REVIEWS,
                element:(
                    <ProtectedRoutes>
                      <Reviews/>
                    </ProtectedRoutes>
                )
            },
            {
                path:ROUTES.FAVOURITES,
                element:(
                    <ProtectedRoutes>
                      <Favourites/>
                    </ProtectedRoutes>
                )
            },
            {
                path:ROUTES.ABOUT,
                element:<AboutPage/>
            }
        ]
    }
]);

export default router;
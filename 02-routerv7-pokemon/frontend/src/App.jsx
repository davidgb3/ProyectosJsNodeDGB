import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { PokemonProvider } from "./context/PokemonContext";
import { router } from "./routes/router";
const App = () => {
  return (
    <>
      <PokemonProvider>
        <Toaster position="top-right" duration={2000} />
        <RouterProvider router={router} />
      </PokemonProvider>
    </>
  );
};

export default App;

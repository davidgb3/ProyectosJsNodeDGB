import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
// creamos el contexto.
const PokemonContext = createContext();
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function PokemonProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/favorites`);
        if (!response.ok) {
          throw new Error("Error al obtener favoritos");
        }
        const data = await response.json();
        setFavorites(data);
    } catch (error) {
      throw new Error("Error al obtener favoritos", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  
  // añadir pokemons a favoritos.

  const addToFavorites = async (pokemon) => {
    // comprobar si el pokemon ya está en favoritos.
    if (favorites.some((p) => p?.id === pokemon.id)) {
      // pokemon ya repetido en favorites. Luego mensaje de eror
      toast.error(`El pokemon ${pokemon.name} ya está en favoritos`, {
        style: {
          background: "red",
          color: "white",
          border: "1px solid black",
        },
        icon: "⭐",
      });
      return;
    }
    // añadimos el pokemon a favoritos.;
    const response = await fetch(`${VITE_BACKEND_URL}/addFavorite/${pokemon.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast.error(`El pokemon ${pokemon.name} no se añadió a favoritos`, {
        style: {
          background: "red",
          color: "white",
          border: "1px solid black",
        },
      });
    };
    await fetchFavorites(); // actualizamos los favoritos.
    // toast que todo ok.
    toast.success(`Pokemon ${pokemon.name} añadido a favoritos`, {
      style: {
        background: "green",
        color: "white",
        border: "1px solid black",
      },
      icon: "⭐",
    });
  };

  const removeFromFavorites = async (pokemonId) => {
    const response = await fetch(`${VITE_BACKEND_URL}/deleteFavorite/${pokemonId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      toast.error("Error al eliminar el pokemon de favoritos", {
        style: {
          background: "red",
          color: "white",
          border: "1px solid black",
        },
      });
    };
    await fetchFavorites(); // actualizamos los favoritos.
    // sonner mensaje de OK
    toast.info("Pokemon eliminado de favoritos", {
      style: {
        background: "blue",
        color: "white",
        border: "1px solid black",
      },
      icon: "🗑️",
    });
  };

  return (
    <PokemonContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

//// ------------ Hook para consumir el contexto ------------
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon debe ser usado dentro de un PokemonProvider");
  }
  return context;
};

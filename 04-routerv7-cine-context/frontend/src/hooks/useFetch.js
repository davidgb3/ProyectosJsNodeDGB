// hooke que se encar de cualquier petición de una API

import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (fetchFunction, dependencies=[]) => {
    // estado para guardar la data
    const [data, setData] = useState(null);
    // estado para guardar el loading
    const [loading, setLoading] = useState(false);
    // estado para guardar el error
    const [error, setError] = useState(null);

    const fetchData = async() => {
        try {
            // función para hacer la petición de la api
            const result = await fetchFunction();
            setData(result);
        } catch (error) {
            setError(error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController(); // creo objeto para abortar la petición
        setLoading(true);
        fetchData();
      return () => {
        // cuando desmonto el componente aborto la petición 
        abortController.abort();
      }
    }, dependencies);

    return { data, loading, error };    
};
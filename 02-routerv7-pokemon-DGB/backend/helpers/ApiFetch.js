
const apiFetch = async(url) => {
    try {
        const reponse = await fetch(`${url}`);
        if (!reponse.ok) {
            throw new Error(`Error al obtener los datos: ${reponse.status}`);
        }
        return await reponse.json();
    } catch (error) {
        console.error('Error al obtener los datos',error);
    }
};

export default apiFetch;
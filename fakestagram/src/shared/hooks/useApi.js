import { useCallback } from "react";
import axios from "axios";

/**
    Este hook se encarga de realizar peticiones a la API.
    Recibe la URL a la que se va a hacer la petición, el método HTTP a utilizar,
    los datos a enviar en la petición y si la petición requiere un token.
    Retorna la respuesta de la petición.

    @param {string} url - URL a la que se va a hacer la petición
    @param {string} method - Método HTTP a utilizar.
    @param {Object} data - Datos a enviar en la petición.
    @param {boolean} requiresToken - Indica si la petición requiere usar el token del usuario.
    @returns {Object} - Objeto con la función makeRequest.
*/
const useApi = () => {
  const makeRequest = useCallback(async (url, method = 'GET', data = null, requiresToken = false) => {
    let headers = {
      "Content-Type": "application/json",
    };
    if (requiresToken) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await axios({
        url: `http://64.23.228.143:3001/api/${url}`,
        method,
        headers,
        data,
      });
      return response;
    } catch (error) {
      console.error("Error en la request:", error);
      throw error;
    }
  }, []);

  return { makeRequest };
};

export default useApi;

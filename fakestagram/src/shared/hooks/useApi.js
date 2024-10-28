import { useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const doRequest = useCallback(async (url, method = 'GET', data = null, requiresToken = false, contentType = 'application/json') => {
    let headers = {
      "Content-Type": contentType,
    };
    if (contentType === 'multipart/form-data') {
      headers = {};
    }
    if (requiresToken) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await axios({
      url: `http://64.23.228.143:3001/api/${url}`,
      method,
      headers,
      data,
    });
    return response;
  }, []);

  return { doRequest };
};

export default useApi;

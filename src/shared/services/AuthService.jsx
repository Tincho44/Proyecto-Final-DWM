// useAuthService.js
import useApi from "../hooks/useApi";

const useAuthService = () => {
  const { doRequest } = useApi();

  const register = async (username, email, password) => {
    const response = await doRequest(
      "auth/register",
      "POST",
      { username, email, password },
      false
    );
    
    return response;
  };

  const login = async (email, password) => {
    const response = await doRequest(
      "auth/login",
      "POST",
      { email, password },
      false
    );
    return response;
  };

  return { login, register };
};

export default useAuthService;

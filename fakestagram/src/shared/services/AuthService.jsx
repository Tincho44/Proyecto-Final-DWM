import useApi from "../hooks/useApi";

export const AuthService = () => {
  const { doRequest } = useApi();

  const register = async (username, email, password) => {
    try {
      const response = await doRequest(
        "/auth/register", 
        "POST", 
        { username, email, password },
        false
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await doRequest(
        "/auth/login", 
        "POST", 
        { email, password },
        false
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { register, login };
};

export default AuthService;
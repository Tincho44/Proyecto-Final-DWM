import useApi from "../hooks/useApi";

const useUserService = () => {
  const { doRequest } = useApi();

  const getAllUsers = async () => {
    const response = await doRequest("user/all", "GET", null, true);
    return response;
  };


  return { getAllUsers };
};

export default useUserService;

import useApi from "../hooks/useApi";

const useUserService = () => {
  const { doRequest } = useApi();


  const getAllUsers = async () => {
    const response = await doRequest("user/all", "GET", null, true);
    return response;
  };


  return { getAllUsers };

  const getUserProfile = async (userId) => {
    const response = await doRequest(
      `user/profile/${userId}`,
      "GET",
      null,
      false 
    );
    return response;
  };

  const editUserProfile = async (profileData) => {
    const response = await doRequest(
      `user/profile/edit`,
      "PUT",
      profileData,
      false
    );
    return response;
  };

  return { getUserProfile, editUserProfile };
};

export default useUserService;

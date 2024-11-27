import useApi from "../hooks/useApi";

const useNotificationService = () => {
  const { doRequest } = useApi();

 
  const getNotifications = async () => {
    const response = await doRequest(
      "notifications", 
      "GET", 
      null, 
      true 
    );
    return response;
  };

  const addNotification = async (notification) => {
    const response = await doRequest(
      "notifications", 
      "POST", 
      notification, 
      true 
    );
    return response;
  };

  return {
    getNotifications,
    addNotification,
  };
};

export default useNotificationService;

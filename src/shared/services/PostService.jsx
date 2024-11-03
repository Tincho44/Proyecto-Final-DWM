import useApi from "../hooks/useApi";

const usePostService = () => {
  const { doRequest } = useApi();

  const uploadPost = async (formData) => {
    const response = await doRequest(
      "posts/upload",
      "POST",
      formData,
      true
    );
    return response;
  };

  const getFeed = async () => {
    const response = await doRequest(
      "posts/feed",
      "GET",
      null,
      true
    );
    return response;
  };

  const likePost = async (postId) => {
    const response = await doRequest(
      `posts/${postId}/like`,
      "POST",
      null,
      true
    );
    return response;
  };

  const unlikePost = async (postId) => {
    const response = await doRequest(
      `posts/${postId}/unlike`,
      "POST",
      null,
      true
    );
    return response;
  };

  return { uploadPost, getFeed, likePost, unlikePost };
};

export default usePostService;

import useApi from "../hooks/useApi";

const useCommentService = () => {
  const { doRequest } = useApi();

  const createComment = async (postId, content) => {
    const response = await doRequest(
      `posts/${postId}/comments`,
      "POST",
      { content },
      false 
    );
    return response;
  };

  const deleteComment = async (postId, commentId) => {
    const response = await doRequest(
      `posts/${postId}/comments/${commentId}`,
      "DELETE",
      null,
      false 
    );
    return response;
  };

  const getComment = async (commentId) => {
    const response = await doRequest(
      `posts/comments/${commentId}`,
      "GET",
      null,
      true 
    );
    return response;
  };

  

  return { createComment, deleteComment, getComment };

  
  
};


export default useCommentService;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import useCommentService from '../services/useCommentService';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../shared/context/AuthContext';

const CommentsPage = () => {
  const { postId } = useParams();
  const { getComments, createComment } = useCommentService();
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(postId, token);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [postId, token]);

  const onSubmit = async (data) => {
    await createComment(postId, data.content, token);
    setComments((prevComments) => [...prevComments, { content: data.content, author: 'Usuario' }]);
  };

  return (
    <div>
      <CommentForm 
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
      />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsPage;

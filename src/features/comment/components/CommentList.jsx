import CommentItem from './CommentItem';
import css from '../styles/Comment.module.css';
import PropTypes from 'prop-types';

const CommentList = ({ comments }) => {
  return (
    <div className={css.commentList}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.func.isRequired,
};


export default CommentList;

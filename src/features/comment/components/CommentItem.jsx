import css from '../styles/Comment.module.css';
import PropTypes from 'prop-types';

const CommentItem = ({ comment }) => {
  return (
    <div className={css.commentItem}>
      <p>{comment.content}</p>
      <small>{comment.author}</small>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.func.isRequired,
};

export default CommentItem;

import css from '../styles/Comment.module.css';
import PropTypes from 'prop-types';

const CommentForm = ({ register, handleSubmit, onSubmit, errors, isValid }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.commentForm}>
      <div className={css.formGroup}>
        <textarea
          placeholder="Escribe tu comentario..."
          {...register('content', {
            required: 'El comentario es obligatorio',
          })}
        />
        {errors.content && <span className={css.error}>{errors.content.message}</span>}
      </div>
      <button type="submit" disabled={!isValid}>
        Publicar Comentario
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default CommentForm;

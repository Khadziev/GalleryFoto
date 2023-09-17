import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { loadGalleryId } from '../../redux/features/gallery/gallery';
import {
  createComments,
  getComments,
} from '../../redux/features/comments/comments';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeContext } from '../theme/ThemeProviderWrapper';

const useStyles = makeStyles({
  commentsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '0.5rem',
    width: '50%',
    alignSelf: 'center',
  },
  commentItem: {
    border: '1px solid lightgray',
    borderRadius: 8,
    padding: '0.5rem',
    backgroundColor: 'white',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
  },
  commentUser: {
    fontWeight: 'bold',
  },
  showAllButton: {
    marginBottom: '1rem',
    alignSelf: 'center',
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#3897f0',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  commentForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  commentInput: {
    marginRight: '1rem',
  },
  submitButton: {
    background: '#3897f0',
    color: '#ffffff',
    fontWeight: 'bold',
    '&:hover': {
      background: '#167abc',
    },
  },
  // Добавленный стиль для текста комментариев в зависимости от темы
  commentTextLight: {
    color: 'black',
  },
  commentTextDark: {
    color: '#167abc',
  },
});

function Comments({ id }) {
  const comments = useSelector((state) => state.comments.comments);
  const token = useSelector((state) => state.application.token);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isDarkTheme } = useContext(ThemeContext); // Получение значения isDarkTheme из контекста

  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState(false);
  const [displayedComments, setDisplayedComments] = useState(3);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    dispatch(getComments(id));
    dispatch(loadGalleryId(id));
  }, [dispatch, id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!token) {
      setAlert(true);
    } else {
      await dispatch(createComments(id, comment));
      setComment('');
      await dispatch(getComments(id));
    }
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  const handleShowLessComments = () => {
    setShowAllComments(false);
  };

  const filteredComments = comments.filter((item) => item.galleryId === id);

  const commentText = isDarkTheme
    ? classes.commentTextDark
    : classes.commentTextLight;

  return (
    <>
      <div className={classes.commentsContainer}>
        {filteredComments
          .slice(
            0,
            showAllComments ? filteredComments.length : displayedComments
          )
          .map((item) => (
            <div key={item._id} className={classes.commentItem}>
              <Typography
                variant="body2"
                color="textSecondary"
                className={commentText}
              >
                <span className={classes.commentUser}>{item.userId.name}</span>:{' '}
                {item.text}
              </Typography>
            </div>
          ))}
      </div>
      {comments.length > 3 && !showAllComments && (
        <button
          className={classes.showAllButton}
          onClick={handleShowAllComments}
        >
          Показать все комментарии ({filteredComments.length})
        </button>
      )}
      {showAllComments && (
        <button
          className={classes.showAllButton}
          onClick={handleShowLessComments}
        >
          Свернуть комментарии
        </button>
      )}
      <div className={classes.commentForm}>
        <TextField
          className={classes.commentInput}
          label="Оставьте комментарий"
          variant="outlined"
          size="small"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className={classes.submitButton}
          variant="contained"
          onClick={handleComment}
        >
          Отправить
        </Button>
      </div>
    </>
  );
}

export default Comments;

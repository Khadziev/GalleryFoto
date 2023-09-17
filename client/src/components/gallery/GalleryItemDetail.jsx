import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { loadGalleryId } from '../../redux/features/gallery/gallery';
import Comments from '../comment/Comments';
import ErrorFallback from '../common/ErrorFallback';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    marginTop: '15px',
  },
  photoContainer: {
    marginBottom: '1rem',
  },
  photo: {
    border: '1px solid lightgray',
    borderRadius: 8,
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    maxWidth: '500px',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '500px',
  },
  caption: {
    textAlign: 'center',
    margin: '1rem 0',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  commentsContainer: {
    marginTop: '1rem',
  },
}));

function GalleryItemDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.gallery.token);
  const gallery = useSelector((state) =>
      state.gallery.items.find((item) => item._id === id)
  );

  const classes = useStyles();

  useEffect(() => {
    dispatch(loadGalleryId(id, token));
  }, [dispatch, id, token]);
  return (
    <div className={classes.container}>
      {gallery ? (
        <>
          <div className={classes.photoContainer}>
            <img
              className={classes.photo}
              src={`/${gallery.pathImages}`}
              alt=""
            />
          </div>
          <div className={classes.infoContainer}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.caption}
            >
              <strong>{gallery.name}</strong>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.caption}
            >
              {gallery.description}
            </Typography>
            <div className={classes.commentsContainer}>
              <Comments id={id} />
            </div>
          </div>
        </>
      ) : (
        <ErrorFallback />
      )}
    </div>
  );
}

export default GalleryItemDetail;

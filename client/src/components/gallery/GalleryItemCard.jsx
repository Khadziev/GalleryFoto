import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
  TableCell,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useStyles } from './useStyles';

function GalleryItemCard({ item, index, handleLike, handleDelete }) {
  const id = useSelector((state) => state.application.id);
  const classes = useStyles();

  return (
    <Card className={`${classes.card} ${classes.cardHover}`}>
      <NavLink to={`/gallery/${item._id}`}>
        <CardMedia
          component="img"
          height={index % 3 === 0 ? '400' : '200'}
          image={`/${item.pathImages}`}
          alt={item.name}
          className={classes.cardImgTop}
        />
        <div className={classes.cardReveal}>
          <div className={classes.cardBody}>
            <Typography
              variant="body2"
              component="div"
              className={classes.cardTitle}
            >
              {item.user.name}
              {item.name}
            </Typography>
          </div>
        </div>
      </NavLink>
      <CardActions className={classes.cardActions}>
        <Button
          onClick={() => handleDelete(item._id)}
          startIcon={<DeleteIcon />}
        ></Button>
        <Button
          className={classes.like}
          onClick={() => handleLike(item._id)}
          startIcon={
            item.likes.find((itemId) => id === itemId) ? (
              <FavoriteIcon className={classes.icon} />
            ) : (
              <FavoriteBorderIcon className={classes.icon} />
            )
          }
        >
          <span className={classes.countLikes}>{item.likes.length}</span>
        </Button>
        <TableCell className={classes.date}>
          {new Date(item.createdAt).toLocaleString('ru-RU', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </TableCell>
      </CardActions>
    </Card>
  );
}

export default GalleryItemCard;

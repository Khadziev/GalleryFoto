import React from 'react';
import { Grid } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import GalleryItemCard from './GalleryItemCard';
import { useStyles } from './useStyles';

function GalleryGrid({ gallery, handleLike, handleDelete }) {
  const classes = useStyles();


  return (
    <PerfectScrollbar>
      <Grid container spacing={3}>
        {gallery.map((item, index) => (
          <Grid item xs={12} sm={6} md={index % 3 === 0 ? 8 : 4} key={item._id}>
            <GalleryItemCard
              item={item}
              index={index}
              handleLike={handleLike}
              handleDelete={handleDelete}
              classes={classes}
            />
          </Grid>
        ))}
      </Grid>
    </PerfectScrollbar>
  );
}

export default GalleryGrid;

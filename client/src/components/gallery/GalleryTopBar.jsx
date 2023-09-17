import React from 'react';
import { Typography, Select, MenuItem, Button } from '@material-ui/core';
import { useStyles } from './useStyles';

function GalleryTopBar({ handleSort, sortOption, handleClickOpen }) {
  const classes = useStyles();

  
  return (
    <div className={classes.centerContent}>
      <Select value={sortOption} onChange={handleSort}>
        <MenuItem value="name">По имени</MenuItem>
        <MenuItem value="date">По дате создания</MenuItem>
        <MenuItem value="description">По описанию</MenuItem>
      </Select>
      <Typography variant="h1" className={classes.h1}>
        Добавленные в этот раздел фотографии видны всем посетителям
      </Typography>
      <Button className={classes.button} onClick={handleClickOpen}>
        Добавить фото
      </Button>
    </div>
  );
}

export default GalleryTopBar;

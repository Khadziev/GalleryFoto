import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addImage, postGallery } from '../../redux/features/gallery/gallery';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
    width: 800,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(2),
    },
  },
  img: {
    width: 70,
    height: 50,
    borderRadius: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
  },
  marginRight: 20,
  addLogo: {
    fontSize: 40,
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

function GalleryUploadDialog({ open, setOpen }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.application.token);
  const classes = useStyles();
  const userId = useSelector((state) => state.application.id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  };

  const handleAddName = (e) => {
    setName(e.target.value);
  };

  const handleAddDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePostChild = () => {
    dispatch(postGallery({ name, description, likes: [], user: userId }));
    setName('');
    setDescription('');
  };

  if (token) {
    return (
      <div className={classes.container}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>Введите имя и URL изображения</DialogContentText>
            <TextField
              value={name}
              autoFocus
              margin="dense"
              id="name"
              label="Имя"
              type="text"
              fullWidth
              onChange={handleAddName}
            />
            <input
              autoFocus
              id="icon-button-file"
              type="file"
              onChange={handleAddImage}
            />
            <TextField
              value={description}
              autoFocus
              margin="dense"
              id="name"
              label="Расскажите о фотографии"
              type="text"
              fullWidth
              onChange={handleAddDescription}
            />
            {errorMessage && (
              <DialogContentText color="error">
                {errorMessage}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Закрыть
            </Button>
            <Button onClick={handlePostChild} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}

export default GalleryUploadDialog;

import React, { useEffect, useState } from "react";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { createEvent } from "../redux/features/event";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
    width: 800,
    margin: "auto",
  },
  img: {
    width: 70,
    height: 50,
    borderRadius: 100,
    // border: 3, solid, green,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
  },
  marginright: 20,

  addLogo: {
    fontSize: 40,
  },
}));

function AddEvent({ open, setOpen }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.items);
  const classes = useStyles();

  const [text, setText] = useState("");

  // для открытия закрытия
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddText = (e) => {
    setText(e.target.value);
  };

  const handlePostEvent = () => {
    dispatch(createEvent({ text, id }));
    setText("");
  };

  return (
    <div className={classes.container}>
      <Container className={classes.paper}>
        <grid container spacing={6} className={classes.addLogo}></grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Анкета</DialogTitle>
        <DialogContent>
          <DialogContentText>Ведите события</DialogContentText>
          <TextField
            value={text}
            autoFocus
            margin="dense"
            id="name"
            label="События"
            type="text"
            fullWidth
            onChange={handleAddText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handlePostEvent} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddEvent;

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Button,
  DialogContentText
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addImage, postData } from "../../redux/features/data/data";

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
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  }
}));

function AddData({ open, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const children = useSelector((state) => state.child.items);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  };

  return (
      <div className={classes.container}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <DialogContentText>Введите имя и URL изображения</DialogContentText>
            <TextField
                value={name}
                margin="dense"
                label="Название"
                fullWidth
                onChange={(e) => setName(e.target.value)}
            />
            <input type="file" onChange={handleAddImage} />
            <TextField
                value={age}
                margin="dense"
                label="Дата создания фото"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setAge(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => setOpen(false)}>
              Закрыть
            </Button>
            <Button color="primary" onClick={() => {
              dispatch(postData({ name, age }));
              setName("");
              setAge("");
            }}>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default AddData;

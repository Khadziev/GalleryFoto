import React, { useEffect, useState } from "react";
import {
    Avatar,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fab,
    makeStyles, Table, TableBody,
    TableCell, TableContainer, TableRow,
    TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
//import {deleteChild, postChild} from '../redux/features/child';
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import {deleteGallery, postGallery} from "../../redux/features/gallery";




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

function AddGallery({open, setOpen}) {
    const dispatch = useDispatch();

    const gallery = useSelector((state) => state.gallery.items);
    const loading = useSelector((state) => state.child.loading);
    const classes = useStyles();


    const [imageURL, setImage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")




    const handleClose = () => {
        setOpen(false);
    };

    const handleAddImage = (e) => {
        setImage(e.target.value)
    }

    const handleAddName = (e) => {
        setName(e.target.value)
    }

    const handleAddDescription = (e) => {
        setDescription(e.target.value)
    }


    const handlePostChild = () => {
        dispatch(postGallery({name: name, imageURL: imageURL, description: description}))
    }

    const handleDelete = (id) => {
        dispatch(deleteGallery(id))
    }
    return (
        <div className={classes.container}>
            <Container className={classes.paper}>
                <grid container spacing={6} className={classes.addLogo}>
                </grid>
            </Container>
            <TableContainer component={classes.paper}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {gallery.map((item) => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Avatar>
                                            <img
                                                className={classes.img}
                                                src={`${item.imageURL}`}
                                                alt="logo"
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell  align="right">{item.name}</TableCell>
                                    <TableCell>
                                        <button onClick={() => handleDelete(item._id)}>
                                            удалить
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Анкета</DialogTitle>
                <DialogContent>
                    <DialogContentText>Ведите имя, url изображения, возраст и пол ребенка</DialogContentText>
                    <TextField
                        value={name}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Имя Ребенка"
                        type="text"
                        fullWidth
                        onChange={handleAddName}

                    />
                    <TextField
                        value={imageURL}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="URL изображения"
                        type="text"
                        fullWidth
                        onChange={handleAddImage}
                    />
                    <TextField
                        value={description}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="расскажите о фотографии"
                        type="text"
                        fullWidth
                        onChange={handleAddDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                    <Button onClick={handlePostChild} color="primary" >
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddGallery;




















import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserChild } from "../redux/features/child";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AddEvent from "./AddEvent";
import {deleteEvent, loadEvent} from "../redux/features/event";


const useStyles = makeStyles({
    container: {
        width: "100%",

    },
});

function IdChild() {
    const classes = useStyles();
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const event = useSelector((state) => state.event.items);
    const child = useSelector((state) => {
        return state.child.items.find((item) => item._id === id);
    });

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteEvent(id));
    };

    useEffect(() => {
        dispatch(loadUserChild());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadEvent());
    }, [dispatch]);

    return (
        <div className={classes.container}>
            {" "}
            <Typography align="center">
                <Button onClick={handleClickOpen}><h6>добавить события ребенка</h6></Button>
            </Typography>
            <Typography align="center">
                <img style={{minHeight: '50vh'}} src={child?.imageURL} />
            </Typography>
            <Typography align="center" color='blue' variant="h4">
                {" "}
                {child?.name}
            </Typography>
            <Typography align='center' variant='h6' > {child?.age} : года</Typography>
            {/*<Typography align='center' variant='h3' > Пол:{child?.gender}</Typography>*/}
            {event.map((item) => {
                return (
                    <>
                        <Typography align="center" variant="h6">
                            {" "}
                            событие:{item.text}
                        </Typography>

                        <Button onClick={() => handleDelete(item._id)}>❌</Button>
                    </>
                );
            })}
            <AddEvent open={open} setOpen={setOpen} child={child} id={id} />
        </div>
    );
}

export default IdChild;

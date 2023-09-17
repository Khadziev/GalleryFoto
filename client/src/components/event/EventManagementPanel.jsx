import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { deleteEvent } from "../../redux/features/event/event";
import EventCreationForm from "./EventCreationForm";

const useStyles = makeStyles((theme) => ({
    eventContainer: {
        marginBottom: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventText: {
        padding: theme.spacing(1),
        border: '1px solid black',
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    addButton: {
        marginBottom: theme.spacing(4),
        textShadow: 'none',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        },
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        transition: '0.3s',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
        marginLeft: theme.spacing(2),
    },
}));

function EventManagementPanel({ id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const event = useSelector((state) => state.event.items);
    const dispatch = useDispatch();

    const handleDelete = (eventId) => {
        dispatch(deleteEvent(eventId));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.addButton}
                    onClick={handleClickOpen}
                    disableRipple
                >
                    Добавить событие
                </Button>
            </Typography>
            {event.map((item) => (
                <div key={item._id} className={classes.eventContainer}>
                    <Typography align="center" variant="h6" className={classes.eventText}>
                        событие: {item.text}
                    </Typography>
                    <Button
                        className={classes.deleteButton}
                        onClick={() => handleDelete(item._id)}
                    >
                        Удалить
                    </Button>
                </div>
            ))}
            <EventCreationForm open={open} setOpen={setOpen} id={id} />
        </>
    );
}

export default EventManagementPanel;

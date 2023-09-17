import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from '../../redux/features/data/data';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import EventManagementPanel from "../../components/event/EventManagementPanel";
import { loadEvent } from "../../redux/features/event/event";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childImage: {
    width: '50vh', // ширина равна 50% высоты экрана
    height: '50vh',
    margin: theme.spacing(3, 0),
    borderRadius: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  eventText: {
    marginBottom: theme.spacing(2),
  },
}));

function DataId() {
  const classes = useStyles();
  const { id } = useParams();

  const dataId = useSelector((state) => {
    return state.child.items.find((item) => item._id === id);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadEvent());
  }, [dispatch]);

  return (
      <div className={classes.container}>
        {dataId && dataId.pathImages && (
            <Avatar alt="" src={`/${dataId.pathImages}`} className={classes.childImage} />
        )}
        <Typography align="center" color="primary" variant="h4">
          {dataId?.name}
        </Typography>
        <Typography align="center" variant="h6">
          {dataId?.age} : год
        </Typography>
        <EventManagementPanel id={id} />
      </div>
  );
}

export default DataId;

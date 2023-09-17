import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import {loadUserData, fetchDataById, deleteData} from '../../redux/features/data/data';
import AddData from '../Data/AddData';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    marginTop: 32,
    margin: 15,
  },
  pos: {
    marginBottom: 12,
    textAlign: 'center',
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: '100%',
    height: theme.spacing(30),
    margin: 'auto',
    borderRadius: theme.spacing(2),
    objectFit: 'cover',
  },

  emptyStateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  emptyStateText: {
    marginLeft: theme.spacing(1),
    animation: '$pulsate 1.2s linear infinite',
    background: 'green',
    color: 'rgb(245,245,245)',
    textShadow: '0 -1px rgba(0,0,0,.1)',
  },
  '@keyframes pulsate': {
    '50%': {
      color: '#fff',
      textShadow: '0 -1px rgba(0,0,0,.3), 0 0 5px #ffd, 0 0 8px #fff',
    },
  },
}));

function UserProfile() {
  const token = useSelector((state) => state.application.token);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const children = useSelector((state) => state.child.items);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchDataById({ id }));
    } else {
      dispatch(loadUserData());
    }
  }, [dispatch, id]);

  const handleDelete = (childId) => {
    dispatch(deleteData(childId));
  };

  if (token) {
    return (
      <div>
        <Typography align="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={handleClickOpen}
          >
            Добавить фото
          </Button>
        </Typography>
        {children.length > 0 ? (
          <Grid container justifyContent="center" spacing={2}>
            {children.map((item) => (
                <Grid item key={item._id}>
                  <Card className={classes.root}>
                    <CardContent>
                      <NavLink to={`/data/${item._id}`}>
                        <Avatar
                            alt=""
                            src={item.pathImages}
                            variant="rounded" 
                            className={classes.avatar}
                        />
                      </NavLink>
                      <Typography
                          variant="h6"
                          component="h3"
                          className={classes.pos}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                      >
                        Фото сделано в: {item.age}
                      </Typography>
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        ) : (
          <div className={classes.emptyStateContainer}>
            <Typography variant="h5" className={classes.emptyStateText}>
              Ваш личный кабинет пока пуст
            </Typography>
          </div>
        )}
        <AddData open={open} setOpen={setOpen} />
      </div>
    );
  } else {
    return null;
  }
}

export default UserProfile;

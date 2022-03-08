import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import AddChild from "../AddChild";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildById, loadUserChild } from "../../redux/features/child";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 32,
    margin: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: 20,
  },
}));

function Admin(props) {
  const token = useSelector((state) => state.application.token);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const child = useSelector((state) => state.child.items);
  const loading = useSelector((state) => state.child.loading);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(loadUserChild(id));
  }, [dispatch]);

  if (token) {
    return (
      <div>
        <Typography align="center">
          <Button onClick={handleClickOpen}>Добавить ребенка</Button>
        </Typography>
        <Grid container justifyContent="center" spacing={spacing}>
          {child.map((item) => (
            <Card className={classes.root}>
              <CardContent>
                <NavLink to={`/child/${item._id}`}>
                  <Typography style={{ height: "100%" }}>
                    <img className="img" src={item.imageURL} />
                  </Typography>
                </NavLink>

                <Typography
                  style={{ textAlign: "center" }}
                  className={classes.pos}
                  color="textSecondary"
                >
                  <h3> имя:{item.name}</h3>
                </Typography>

                <Typography
                  style={{ textAlign: "center" }}
                  color="textSecondary"
                >
                  <h4> Возрат:{item.age}</h4>
                </Typography>
                {/*<Typography style={{textAlign: 'center'}} color="textSecondary">*/}
                {/*    <h4>Пол:{item.gender}</h4>*/}
                {/*</Typography>*/}
              </CardContent>
            </Card>
          ))}
        </Grid>
        <AddChild open={open} setOpen={setOpen} />
      </div>
    );
  }
}

export default Admin;

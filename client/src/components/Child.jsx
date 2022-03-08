import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";

import {NavLink, useParams} from "react-router-dom";
import AddGallery from "./Gallery/AddGallery";
import {loadGallery} from "../redux/features/gallery";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        minWidth: 275,
    },
    container: {
        width: "80%",
        display: "flex",
    },
    media: {
        height: 140,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    marginLeft: 30,

    pos: {
        marginBottom: 12,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        marginTop: 20,
    },
    img: {
        height: 200,
    },
}));

function Child(props) {
    const [open, setOpen] = React.useState(false);
    const {id} = useParams();
    const [spacing, setSpacing] = React.useState(2);
    const gallery = useSelector((state) => state.gallery.items);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
        dispatch(loadGallery());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            <div className={'req'} style={{marginLeft: 700}}><Button onClick={handleClickOpen}>Добавить фото</Button>
            </div>
            <div class="row row-cols-2 row-cols-md-4 g-4">
                {gallery.map(item => {
                    return (
                        <div style={{marginTop: 40, marginLeft: 40}}>
                            <NavLink to={`/child/${item._id}`}>
                                <Card style={{width: '18rem'}}>
                                    <Card.Img variant="card-img-top" src={item.imageURL}/>
                                </Card>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <AddGallery open={open} setOpen={setOpen}/>
        </div>
    )

}

export default Child;


//
// import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { useDispatch, useSelector } from "react-redux";
// import { Container, Grid, Paper } from "@material-ui/core";
// import { loadChild } from "../../redux/features/child";
// import { NavLink, useParams } from "react-router-dom";
// import AddChild from "./AddChild";
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: 20,
//     minWidth: 275,
//   },
//   container: {
//     width: "80%",
//     display: "flex",
//   },
//   media: {
//     height: 140,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   marginLeft: 30,
//
//   pos: {
//     marginBottom: 12,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     marginTop: 20,
//   },
//   img: {
//     height: 200,
//   },
// }));
//
// function Child(props) {
//   const [open, setOpen] = React.useState(false);
//   const token = useSelector((state) => state.application.token);
//   const { id } = useParams();
//   const [spacing, setSpacing] = React.useState(2);
//   const child = useSelector((state) => state.child.items);
//   const dispatch = useDispatch();
//   const classes = useStyles();
//
//   useEffect(() => {
//     dispatch(loadChild());
//   }, [dispatch]);
//
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//
//   if (token) {
//     return (
//         <div>
//           <Container maxWidth="xl">
//             <Grid item xs={12}>
//               <Grid item xs={12}>
//                 <Paper className={classes.paper}><h1>лучшие фотографии</h1></Paper>
//               </Grid>
//               {/*<Button onClick={handleClickOpen}>Добавить ребенка</Button>*/}
//               <Grid container justifyContent="center" spacing={spacing}>
//                 {child.map((item) => (
//                     <Card className={classes.root}>
//                       <CardContent>
//                         <NavLink to={`/child/${item._id}`}>
//                           <Typography style={{ height: "100%" }}>
//                             <img className="img" src={item.imageURL} />
//                           </Typography>
//                         </NavLink>
//                       </CardContent>
//                       <CardActions>
//                       </CardActions>
//                     </Card>
//                 ))}
//                 <AddChild open={open} setOpen={setOpen} />
//               </Grid>
//             </Grid>
//           </Container>
//         </div>
//     );
//   }
// }
//
// export default Child;
//

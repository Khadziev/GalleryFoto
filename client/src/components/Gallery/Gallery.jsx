import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {loadGallery} from "../../redux/features/gallery";
import AddGallery from "./AddGallery";
import Grid from "@material-ui/core/Grid";

function Gallery(props) {
    const [open, setOpen] = React.useState(false);
    const gallery = useSelector((state) => state.gallery.items);
    const dispatch = useDispatch();
    const [spacing, setSpacing] = React.useState(2);

    useEffect(() => {
        dispatch(loadGallery());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadGallery());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (

        <div>
            <Typography variant="h6" align='center' color='blue' gutterBottom>
                добавленные в этот раздел фотографии видны всем посетителям
            </Typography>
            <div className={'req'} style={{marginLeft:600}}><Button onClick={handleClickOpen}>Добавить фото</Button></div>

        <div style={{width: '1000',height: '1000', display:'flex', marginTop:20}}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={spacing}>
            {gallery.map((item) => {
                return (

                    <Card sx={{maxWidth: 345 , padding: '20'}}>
                        <CardMedia style={{ marginTop:40, padding:10}}
                            component="img"
                            height="250"
                            src={item.imageURL}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                           {/* <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>*/}
                        </CardActions>
                    </Card>
                );
            })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
            <AddGallery open={open} setOpen={setOpen} />
        </div>
    );
}

export default Gallery;
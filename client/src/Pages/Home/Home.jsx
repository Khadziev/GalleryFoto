import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import b from '../../assets/images/22.jpg';
import c from '../../assets/images/23.jpg';
import g from '../../assets/images/2.jpg';
import { makeStyles } from "@material-ui/core/styles";
import MediaCarousel from "../../components/common/MediaCarousel";
import InspirationalBlock from "../../components/common/InspirationalBlock";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
        maxWidth: 1300,
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: theme.spacing(2),
        },
    },
    carouselWrapper: {
        height: 700,
        [theme.breakpoints.down('sm')]: {
            height: 500,
        },
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <MediaCarousel />
                <InspirationalBlock />
            </div>
            <div className={classes.carouselWrapper}>
                <Carousel variant="dark" className="w-100">
                    <Carousel.Item>
                        <img className="d-block w-100" src={c} alt="First slide" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={g} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={b} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}

export default Home;

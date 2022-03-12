import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import d from './assets/4.jpg'
import a from './assets/1.jpg'
import b from './assets/2.jpg'
import c from './assets/3.webp'
import g from './assets/g.webp'
//import index from '../index.css'
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {logout} from "../redux/features/application";
import Quote from "./Quote";
import Die from "./Die";

const useStyles = makeStyles((theme) => ({
    img:{
        bgImgWrapper: {
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0
        }
    }
}))


function Home(props) {
    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggedOut(false);
        dispatch(logout());
    };
    return (
        <div>
            <div>
                <Die/>
                <Quote/>
            </div>
        <div style={{width: 1300, height: 700, margin:'auto', marginTop: 20}}>
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={c}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={g}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={b}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
        </div>

    );
}
export default Home;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import video1 from '../../assets/video/Plex.mp4';
import Carousel from 'react-bootstrap/Carousel';
import video0 from '../../assets/video/Beach - 29982.mp4';

const videos = [
  {
    id: 0,
    video: video1,
  },
  {
    id: 1,
    video: video0,
  },
];

const useStyles = makeStyles((theme) => ({
  mainFeaturesPost: {
    marginTop: 10,
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),

    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundOverlay: 'rgba(0,0,0,.3)',
  },
  mainFeaturesPostContent: {
    position: 'relative',
    padding: theme.spacing(10),
    margitTop: theme.spacing(8),
  },
  slideImg: {
    width: '100%',
    // maxWidth: "1440px",
    height: '500px',
    userSelect: 'none',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  slider: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    fontSize: '30px',
  },
  slide: {
    width: '100%',
  },
}));

function MediaCarousel() {
  const [current, setCurrent] = useState(0);
  const classes = useStyles();

  const handleSelect = (selectedIndex) => {
    setCurrent(selectedIndex);
  };

  return (
    <div className={classes.slider}>
      <Carousel
        prevLabel=""
        nextLabel=""
        activeIndex={current}
        onSelect={handleSelect}
        className={classes.slide}
      >
        {videos.map((item) => (
          <Carousel.Item key={item.id} className={classes.slideImg}>
            <video
              src={item.video}
              autoPlay
              className={classes.slideImg}
              loop
              playsInline
              muted
              poster={item.img}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default MediaCarousel;

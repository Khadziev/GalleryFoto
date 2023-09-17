import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    marginBottom: 10,
    border: '1px solid lightgray',
    overflow: 'hidden',
    height: '200',
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardReveal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    height: '100%',
    bottom: '-100%',
    transition: 'bottom .2s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cardImgTop: {
    transition: 'transform .5s ease-in-out',
  },
  cardHover: {
    '&:hover $cardReveal': {
      bottom: 0,
    },
    '&:hover $cardImgTop': {
      transform: 'scale(1.3)',
    },
  },
  cardBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: '.75rem',
    margin: 0,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
  h1: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    color: 'transparent',
    transition: 'all 1s',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: '11px',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '50%',
      left: '-100%',
      width: '100%',
      height: '2px',
      backgroundColor: 'tomato',
      transform: 'translateY(-50%)',
      transition: 'all 1s',
    },
    '&:hover': {
      color: '#0beca1',
      '&::before': {
        left: '100%',
      },
    },
  },
  button: {
    background: 'linear-gradient(to right, #2912ad, #17035f)',
    borderRadius: 8,
    color: 'white',
    padding: '10px 20px',
    marginTop: '10px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(to right, #FF4B2B, #FF416C)',
    },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  like: {
    color: 'red',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    marginRight: 5,
  },
  countLikes: {
    marginLeft: 5,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
});

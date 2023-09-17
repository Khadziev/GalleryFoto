import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeContext } from '../theme/ThemeProviderWrapper';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  mainButtons: {
    marginTop: theme.spacing(4),
  },
  glowingText: {
    textShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
    background: 'linear-gradient(45deg, #3A48FD, #95968D, white)',
    backgroundSize: '200% 200%',
    animation: '$gradientAnimation 6s ease infinite',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  lightTheme: {
    '&.light': {
      background: 'linear-gradient(45deg, blue, white, white)',
    },
  },
  darkTheme: {
    '&.dark': {
      background: 'linear-gradient(45deg, #FF8E53, white, white)',
    },
  },
  '@keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

function InspirationalBlock() {
  const classes = useStyles();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={classes.mainContent}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          className={`${classes.glowingText} ${
            isDarkTheme ? classes.darkTheme : classes.lightTheme
          }`}
        >
          миг из жизни
        </Typography>
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          paragraph
          className={`${classes.glowingText} ${
            isDarkTheme ? classes.darkTheme : classes.lightTheme
          }`}
        >
          Добро пожаловать в нашу блоговую площадку, где мы делимся своими
          идеями, опытом и взглядами на разнообразные темы. Ваше путешествие в
          мир новых знаний и вдохновения начинается здесь!
        </Typography>

        <div className={classes.mainButtons}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item>
              <Button
                href="https://citaty.info/topic/deti"
                style={{ textDecoration: 'none' }}
                variant="contained"
                color="primary"
              >
                Источник
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="https://pixabay.com/ru/photos/search/%D0%B4%D0%B5%D1%82%D0%B8/"
                variant="outlined"
                color="primary"
              >
                фотоотпечаток
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default InspirationalBlock;

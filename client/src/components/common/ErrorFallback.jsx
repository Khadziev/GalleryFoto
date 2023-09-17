import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  errorMessage: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
});

const ErrorFallback = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.errorMessage}>Произошла непредвиденная ошибка</h2>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Вернуться назад
      </Button>
    </div>
  );
};

export default ErrorFallback;

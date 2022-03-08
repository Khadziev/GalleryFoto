import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/features/application";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Link from "react-router-dom/es/Link";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export default function SignupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmailUp] = useState("");
  const [name, setNameUp] = useState("");
  const signingUp = useSelector((state) => state.application.signingUp);
  const error = useSelector((state) => state.application.error);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      textDecoration: "none",
    },
  }));

  const classes = useStyles();
  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createUser(login, password, name, email, history));
  };
  const handleChangeEmail = (e) => {
    setEmailUp(e.target.value);
  };

  const handleChangeName = (e) => {
    setNameUp(e.target.value);
  };

  useEffect(() => {
    document.title = "Регистрация";
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        {error}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={name}
                  onChange={handleChangeName}
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={email}
                  onChange={handleChangeEmail}
                  id="email"
                  label="Адрес электронной почты"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="login"
                  name="login"
                  variant="outlined"
                  value={login}
                  onChange={handleChangeLogin}
                  required
                  fullWidth
                  id="login"
                  label="Логин"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={password}
                  onChange={handleChangePassword}
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Я хочу получать по почте информацию о новых волонтерских программах"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={signingUp}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                У вас уже есть аккаунт? {"  "}
                <Link href="/login" variant="body2">
                  Войти
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

// <div>
//     {error}
//     <div>
//         <input type="text" placeholder="Имя" value={name} onChange={handleChangeName}/>
//     </div>
//     <div>
//         <input type="text" placeholder="Адрес электронной почты" value={email} onChange={handleChangeEmail}/>
//     </div>
//     <div>
//         <input type="text" placeholder="ввдедите логин" value={login} onChange={handleChangeLogin}/>
//     </div>
//     <div>
//         <input type="password" placeholder="введите пароль" value={password} onChange={handleChangePassword}/>
//     </div>
//     <button onClick={handleSubmit} disabled={signingUp}>регистрация</button>
// </div>

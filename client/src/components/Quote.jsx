import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../redux/features/application";


const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: "56.25%",

    },
    cardContent: {
        flexGrow: 1,

    },
    cardGrid: {
        marginTop: theme.spacing(4)
    }

}))

function Quote(props) {

    const token = useSelector((state) => state.application.token);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isLoggedOut, setIsLoggedOut] = useState(true);


    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggedOut(false);
        dispatch(logout());
    };


        return (
            <>
                <div className={classes.mainContent}>
                    <Container maxWidth='md'>
                        <Typography variant="h2" align='center' color='textPrimary' gutterBottom>
                            миг из жизни</Typography>
                        <Typography variant="h4" align='center' color='textSecondary' paragraph>
                            Жизнь слишком коротка, чтобы тратить время на то,
                            чтобы найти все ответы. Вместо этого, наслаждайтесь всеми вопросами!
                        </Typography>

                        <div className={classes.mainButtons}>
                            <Grid container spacing={5} justify='center'>
                                <Grid item>
                                    <Button
                                        href="https://citaty.info/topic/deti" style={{textDecoration: 'none'}}
                                        variant='contained' color='primary'>Источник</Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        href="https://pixabay.com/ru/photos/search/%D0%B4%D0%B5%D1%82%D0%B8/"
                                        variant='outlined' color='primary'>фотоотпечаток</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>

            </>
        );

}

export default Quote;
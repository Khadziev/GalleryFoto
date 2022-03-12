import React from 'react';
import {Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles((theme) => ({
    mainFeaturesPost: {
        marginTop:10,
        position:"relative",
        color:theme.palette.common.white,
        marginBottom:theme.spacing(4),

        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"
    },
    overlay: {
        pasition:"absolute",
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundOverlay:"rgba(0,0,0,.3)"
    },
    mainFeaturesPostContent: {
        position:"relative",
        padding:theme.spacing(10),
        margitTop:theme.spacing(8)
    },

}))

function Die(props) {
    const classes = useStyles();
    return (
        <main>
            <Paper className={classes.mainFeaturesPost}
                   style={{backgroundImage:`url(https://images.unsplash.com/photo-1640622658353-c6cecbe91488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`}}>
                                               {/*  `url(https://source.unsplash.com/1600x900/?nature,water`}}*/}
                <Container fixed>
                    <div className={classes.overlay}/>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturesPostContent}>
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color="inherit"
                                    gutterBottom
                                >
                                    {/*Блог*/}
                                </Typography>
                                <Typography
                                    component="h5"
                                    color="inherit"
                                    paragraph
                                >
                                    Я бы хотел, чтобы вы уважали детей. Дети все заслуживают самого большого уважения,
                                    на какое вы только способны, потому что они так свежи, так невинны, так близки к божественному.
                                    Пора отдать им уважение, а не заставлять их уважать испорченных и развращённых людей – хитрых, лживых,
                                    полных дерьма – просто потому, что они старше.

                                </Typography>
                                {/*<Button variant='contained' color='secondary'>следующее</Button>*/}
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </main>
    );
}
export default Die;
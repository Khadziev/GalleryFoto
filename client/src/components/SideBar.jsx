import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FaceIcon from '@material-ui/icons/Face';
import Box from '@material-ui/core/Box';

import WcIcon from '@material-ui/icons/Wc';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
//import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    list: {
        width: 250,
        height: "100%"
    },
    fullList: {
        width: 'auto',
    },
    buttonSidBar: {
        marginLeft: 1220,
        backgroundColor: '#1073b2',
        marginTop:10,

        '&:hover': {
            backgroundColor: '#ff1f1f'
        }

    }
});

export default function SideBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        // top: false,
        // left: false,
        // bottom: false,
        right: false,
    });

    const [value, setValue] = React.useState(2);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div style={{background: '#333'}}
             className={clsx(classes.list, {
                 [classes.fullList]: anchor === 'top' || anchor === 'bottom',
             })}
             role="presentation"
             onClick={toggleDrawer(anchor, false)}
             onKeyDown={toggleDrawer(anchor, false)}

        >
            <List >
                <a href="https://mosgorzdrav.ru/ru-RU/news/default/card/3291.html" style={{textDecoration: 'none'}}>
                    {[ <h5 style={{color: 'white', }}> Счастье детям </h5>].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{color: 'white'}}> <WcIcon /> </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </a>


            </List>

            <List>
                <a href="https://www.championat.com/lifestyle/article-4122395-kakoj-vid-sporta-vybrat-dlja-rebjonka-v-kakuju-sekciju-otdat-rebjonka.html" style={{textDecoration: 'none'}}>
                    {[ <h5 style={{color: 'white', }}> Спорт для ребенка </h5>].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{color: 'white'}}> <ChildCareIcon /> </ListItemIcon>

                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </a>
            </List>

            <List >
                <a href="https://zdorovye-detey.ru/services/vyzov-vracha-na-dom.html" style={{textDecoration: 'none'}}>
                    {[ <h5 style={{color: 'white', }}> Вызов врача на дом </h5>].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{color: 'white'}}> <LocalHospitalOutlinedIcon /> </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </a>
            </List>

            <List >
                <a href="https://agulife.ru/calendopedia/principy-zdorovogo-pitaniya-malyshei" style={{textDecoration: 'none'}}>
                    {[ <h5 style={{color: 'white', }}> Правильное питание ребенка </h5>].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{color: 'white'}}> <LocalHospitalOutlinedIcon /> </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </a>
            </List>
            УмарБрат2, [17.08.21 12:43]
            <List >
                <a href="https://zdorovye-detey.ru/services/vyzov-vracha-na-dom.html" style={{textDecoration: 'none'}}>
                    {[ <h5 style={{color: 'white', }}> Услуги няни </h5>].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{color: 'white'}}> <FaceIcon /> </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </a>
            </List>

            <List >
                <a href="https://onideti.ru/skype/?gclid=CjwKCAjwjdOIBhA_EiwAHz8xm4QybI2--fZppynQaTdZbaFpO0D3AttDwrAZDpsVD7pnf7A4LdoHxRoCUOcQAvD_BwE" style={{textDecoration: 'none'}}>
                    {[ <h5 style={{color: 'white', }}> Детский психолог </h5>].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{color: 'white'}}> <PermIdentityIcon /> </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </a>
            </List>

            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Controlled</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>

            <Divider />

        </div>
    );

    return (
        <div >

            {[ 'right',].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button variant="contained" color="primary" className={classes.buttonSidBar} onClick={toggleDrawer(anchor, true)}>Полезное</Button>


                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, CircularProgress, FormGroup, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { ToastDanger } from '../utils/izitoast.helper';
import { setUserLocalStorage } from '../utils/helpers';
import ChatIcon from '@material-ui/icons/Chat';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
      maxWidth: 200
    },
    button: {
        minWidth: 200,
        margin: theme.spacing(2),
        backgroundImage: '-webkit-gradient(linear, right top, left top, from(#9f78ff), to(#32cafe))',
        backgroundImage: '-webkit-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: '-moz-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: '-o-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: 'linear-gradient(to right, #9f78ff, #32cafe)',
        backgroundRepeat: 'repeat-x',
        color: '#ffff'
    },
    link: {
        textDecoration: 'none'
    }, 
    card: {
        margin: 'auto',
        marginTop: '110px',
        maxWidth: 300,
        boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 50px 0 rgba(0, 0, 0, 0.19)'
    },
    formGroup:{
       alignItems: 'center'
    },
    media: {
        height: 140,
    },
    loading: {
        color: '#ffff'
    },
    headerText: {
        fontWeight: 'bold',
        paddingTop: '10px',
        color: '#9f78ff'
    },
    Icon: {
        color: '#32cafe',
        marginLeft: '3px'
    }
}));

function Home({ socket }) {

    // console.log(socket)

    const classes = useStyles();
    const [username, setusername] = useState('');
    const [roomname, setroomname] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {  
        document.body.classList.add('login-bg')
        document.body.classList.remove('default-bg')
        //eslint-disable-next-line
    },[]);

    const joinRoom = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{

            const login = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                socket_id: socket.id,
                username,
                roomname,
            });
            
            setUserLocalStorage(login.data.user_data);
            socket.emit('joinRoom', login.data.user_data)
            setRedirect(true)
        }catch(err){
            console.log(err)
            ToastDanger(err.response.data.message)
            setLoading(false);
        }            
    }

    if(redirect){
        return <Redirect to={`/${roomname}/${username}`}/>
    }

    return (
        <Container maxWidth="md">
            <Grid>
                <Card className={classes.card}>
                    <CardContent>
                        <FormGroup className={classes.formGroup}>
                            <Typography className={classes.headerText} variant="h5">
                                ChatHive<ChatIcon className={classes.Icon}/>
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <TextField name="name"  value={username} onChange={e => setusername(e.target.value)} variant="standard" label="Your Name:" size="medium"></TextField>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Select Room</InputLabel>
                                <Select name="room" value={roomname} onChange={e => setroomname(e.target.value)}>
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="javascript">javascript</MenuItem>
                                    <MenuItem value="reactjs">reactjs</MenuItem>
                                    <MenuItem value="typescript">typescript</MenuItem>
                                    <MenuItem value="angularjs">angularjs</MenuItem>
                                    <MenuItem value="nodejs">nodejs</MenuItem>
                                </Select>
                            </FormControl>
                            <Button onClick={joinRoom} variant="contained"  size="large" className={classes.button}>
                                { loading ? <CircularProgress className={classes.loading} size={25}/> : 'JOIN ROOM' } 
                            </Button>
                        </FormGroup>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    )
}

export default Home

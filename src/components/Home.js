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
import { Button, CardContent, CircularProgress, FormGroup } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

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
        marginTop: '70px',
        maxWidth: 300
    },
    formGroup:{
       alignItems: 'center'
    },
    media: {
        height: 140,
    },
    loading: {
        color: '#ffff'
    }
}));

function Home({ socket }) {

    console.log(socket)

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

    const joinRoom = (e) => {
        e.preventDefault();

        setLoading(true);
        if(roomname != '' && username != ''){
            console.log("EMIT", socket)
            socket.emit('join_room', { username: username.toLowerCase(), roomname })
            setRedirect(true)
        }else{
            alert('username and roomname is required');
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
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField name="name"  value={username} onChange={e => setusername(e.target.value)} variant="standard" label="Your Name:" size="medium"></TextField>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Select Room</InputLabel>
                                    <Select name="room" value={roomname} onChange={e => setroomname(e.target.value)}>
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="javaScript">JavaScript</MenuItem>
                                        <MenuItem value="react">React</MenuItem>
                                        <MenuItem value="typescript">TypeScript</MenuItem>
                                        <MenuItem value="mongodb">MongoDB</MenuItem>
                                        <MenuItem value="node-express">Nodejs</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
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

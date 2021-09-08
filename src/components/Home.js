import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, CardMedia, FormGroup } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
      maxWidth: 200
    },
    button: {
        minWidth: 200,
        margin: theme.spacing(2)
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
}));

function Home({ socket }) {

    const classes = useStyles();
    const [username, setusername] = useState('');
    const [roomname, setroomname] = useState('');
    

    const joinRoomBtn = () => {
        if(roomname != '' && username != ''){
            socket.emit('join_room', { username: username.toLowerCase(), roomname })
        }else{
            alert('username and roomname is required');
        }
       
    } 

    

    return (
        <Container maxWidth="md">
            <Grid>
                <Card className={classes.card}>
                    <CardContent>
                        <FormGroup className={classes.formGroup}>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField name="name"  value={username} onChange={e => setusername(e.target.value)} variant="standard" label="Your Name:" size="medium" required></TextField>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Select Room</InputLabel>
                                    <Select name="room" value={roomname} onChange={e => setroomname(e.target.value)} required>
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="JavaScript">JavaScript</MenuItem>
                                        <MenuItem value="React">React</MenuItem>
                                        <MenuItem value="TypeScript">TypeScript</MenuItem>
                                        <MenuItem value="React-Typescript">React TypeScript</MenuItem>
                                        <MenuItem value="React-Redux">React Redux</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Link to={`/chat/${roomname}/${username}`} className={classes.link}>
                                <Button onClick={joinRoomBtn} variant="contained" color="primary" className={classes.button}>JOIN ROOM</Button>
                            </Link>
                        </FormGroup>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    )
}

export default Home

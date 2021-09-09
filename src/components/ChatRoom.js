import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { CardContent, List, ListItem, Typography, ListItemText, Divider, Avatar, ListItemAvatar, Box} from '@material-ui/core';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
    cardStyle: { 
        position: 'absolute',
        bottom: '0',
        marginTop: '90px',
        maxHeight: '90vh',
        marginBottom: '20px',
        marginLeft: '-5px',
        marginRight: '10px',
        overflowY: 'scroll',
        backgroundImage: '-webkit-gradient(linear, right top, left top, from(#9f78ff), to(#32cafe))',
        backgroundImage: '-webkit-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: '-moz-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: '-o-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: 'linear-gradient(to right, #9f78ff, #32cafe)',
        backgroundRepeat: 'repeat-x',
    },
    headerText: {
        marginBottom: '20px'
    },
    ButtonStyle: {
        marginLeft: '10px',
        height: '55px',
        // width: '80px'
    },
    box: {
        marginTop: '20px'
    }
})

function ChatRoom({ username, roomname, socket }) {

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('message', (payload) => {
            let temp = messages
            temp.push(payload)
            setMessages([...temp]);
        })
    },[socket])

    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <Card className={classes.cardStyle}>
                <CardContent>
                    <Typography className={classes.headerText}>Room: {roomname}</Typography>
                    <Message messages={messages} username={username} socket={socket}/>
                    <Box className={classes.box} display="flex" justifyContent="start" alignItems="center"> 
                        <TextField onChange={e => setText(e.target.value)} name="text" value={text} variant="outlined" label="Message" fullWidth size="medium"></TextField>
                        <Button type="submit" className={classes.ButtonStyle} variant="contained" color="primary" size="medium"> <SendIcon/> </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ChatRoom

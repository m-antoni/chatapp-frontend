import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, Box} from '@material-ui/core';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles({
    root: {
        background: '#fdf0d5'
    },
    cardStyle: { 
        bottom: '0',
        height: '75vh',
        marginTop: '0px',
        maxHeight: '75vh',
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
    roomName: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        zIndex: '99999',
        margin: '10px 0',
        color: '#4682B4'
    },
    chatIcon:{
        marginBottom: '-8px'
    },
    ButtonStyle: {
        marginLeft: '10px',
        height: '55px',
        backgroundImage: '-webkit-gradient(linear, right top, left top, from(#9f78ff), to(#32cafe))',
        backgroundImage: '-webkit-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: '-moz-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: '-o-linear-gradient(left, #9f78ff, #32cafe)',
        backgroundImage: 'linear-gradient(to right, #9f78ff, #32cafe)',
        backgroundRepeat: 'repeat-x',
    },
    box: {
        top: '0px',
        marginLeft: '-5px',
        marginRight: '10px',
        marginBottom: '10px'
    },
    input: {
        color: 'black'
    },
    cardContent:{
        '@media (min-width: 780px)' : {
            minWidth: '500px'
        },
        '@media (min-width: 480px)' : {
            minWidth: '400px'
        }
    },
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


    const onSubmit = () => {
        if(text !== ""){
            socket.emit("chat", text);
            setText('')
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <Typography className={classes.roomName}><ChatIcon className={classes.chatIcon}/> {roomname}</Typography>
                <Card className={classes.cardStyle}>
                    <CardContent className={classes.cardContent}>
                        <Message messages={messages} username={username} socket={socket}/>
                    </CardContent>
                </Card>
            </Container>
            <Container maxWidth="sm">
                <Box className={classes.box} display="flex" justifyContent="start" alignItems="center"> 
                    <TextField 
                        InputProps={{ className: classes.input}} 
                        onChange={e => setText(e.target.value)} 
                        onKeyPress={(e) => { if(e.key === 'Enter') return onSubmit() }}
                        name="text" 
                        value={text} 
                        variant="outlined" 
                        label="Message" 
                        fullWidth
                        size="medium"
                    > </TextField>
                    <Button type="submit" onClick={onSubmit} className={classes.ButtonStyle} variant="contained" color="primary" size="medium"> <SendIcon/> </Button>
                </Box>
            </Container>
        </>
    )
}

export default ChatRoom

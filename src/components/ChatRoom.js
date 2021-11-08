import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, CircularProgress, Box} from '@material-ui/core';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';
import { Link, useParams }from 'react-router-dom';
import { getUserLocalStorage, removeUserLocalStorage } from '../utils/helpers';
import { ToastDanger } from '../utils/izitoast.helper';

const useStyles = makeStyles({
    card: { 
        bottom: '0',
        height: '73vh',
        marginTop: '0px',
        maxHeight: '73vh',
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
        color: '#9f78ff'
    },
    chatIcon:{
        marginBottom: '-8px'
    },
    button: {
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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
    },
    leave: {
        height: '40px',
        marginRight: '10px'
    },
    link: {
        textDecoration: 'none'
    },
    circularBox: {
        marginTop: '100px'
    },
    circularProgress: {
        color: '#ffff',
    }
})

function ChatRoom({ socket }) {

    const { username, roomname } = useParams();

    const classes = useStyles();
    const [text, setText] = useState('')
    const [user_id, setUserID] = useState(null)
    const [messages, setMessages] = useState([])
    const [userTyping, setUserTyping] = useState({ is_typing: false, text: '' });
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        // check user credentials
        const userData = getUserLocalStorage();
        setUserID(userData.user_id);
        if(userData.username !== username || userData.roomname !== roomname){
            window.location.href = '/';
            ToastDanger(`Your not signed in to specific rooms`)
        }

        document.body.classList.remove('login-bg')
        document.body.classList.add('default-bg')
        getAllMessages()
        //eslint-disable-next-line
    },[]);

    useMemo(() => {
        // receive from server but will filter by room id
        socket.on('message', async (payload) => {
            // await updateSocketID(payload.socket_id);
            const userData = getUserLocalStorage();
            if(userData){
                if(userData.room_id === payload.room_id){
                    setUserTyping({ is_typing: false, text: ''});
                    setMessages(payload.messages);
                    setSpinner(false);
                }
            }
        })
        socket.on('typing', payload => {
            setUserTyping({ is_typing: payload.is_typing, text: payload.text })
            // console.log(payload)
        })
        //eslint-disable-next-line
    },[socket])


    // trigger when user stops typing
    useEffect(() => {
        const timeoutID = setTimeout(() => {
           socket.emit('typing', { is_typing: false, text: '' })
        }, 1000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [text])


    const getAllMessages = async () => {
        setSpinner(true);
        const userData = getUserLocalStorage();
        socket.emit('getAllMessages', userData)
    }

    const onSubmit = () => {
        socket.emit('typing', { is_typing: false, text: '' })
        if(text !== ""){
            const data = getUserLocalStorage();
            socket.emit("chatMessage", { ...data, text: text });
            setText('');        
        }
    }

    const leaveRoom = async () => {
        const userData = getUserLocalStorage();
        socket.emit("leaveRoom", userData);
        removeUserLocalStorage();
    }

    const onChange = e => {
        setText(e.target.value);
        if(e.target.value.length === 0){
            socket.emit('typing', { is_typing: false, text: '' })
        }
    }

    const onKeyUpChange = e => {
        if(e.target.value.length > 0){
            socket.emit("typing", {    
                is_typing: true,
                text: `Someone is typing...`
            });
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <div className={classes.header}>
                    <Typography className={classes.roomName}><ChatIcon className={classes.chatIcon}/> {roomname.toUpperCase()}</Typography> 
                    <Link to={'/'} onClick={leaveRoom} className={classes.link}><Button className={classes.leave} variant="contained" color="secondary" size="small"> Leave </Button> </Link>
                </div>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        {
                            spinner ? 
                            <Box className={classes.circularBox} display="flex" justifyContent="center">
                                <CircularProgress className={classes.circularProgress} size="4rem" thickness={3}/>
                            </Box>
                            :
                            <Message messages={messages} userID={user_id} socket={socket} userTyping={userTyping}/>
                        }
                    </CardContent>
                </Card>
            </Container>
            <Container maxWidth="sm">
                <Box className={classes.box} display="flex" justifyContent="start" alignItems="center"> 
                    <TextField 
                        InputProps={{ className: classes.input}} 
                        onChange={onChange} 
                        onKeyPress={(e) => { if(e.key === 'Enter') return onSubmit() }}
                        onKeyUp={onKeyUpChange}
                        name="text" 
                        value={text} 
                        variant="outlined" 
                        label="Message" 
                        fullWidth
                        size="medium"
                    > </TextField>
                    <Button type="submit" onClick={onSubmit} className={classes.button} variant="contained" color="primary" size="medium"> <SendIcon/> </Button>
                </Box>
            </Container>
        </>
    )
}

export default ChatRoom

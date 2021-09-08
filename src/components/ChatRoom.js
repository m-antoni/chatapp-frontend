import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { CardContent, List, ListItem, Typography, ListItemText, Divider, Avatar, ListItemAvatar, Box} from '@material-ui/core';
import Message from './Message';


const useStyles = makeStyles({
    cardStyle: {
        marginTop: '70px'
    },
    headerText: {
        marginBottom: '20px'
    },
    ButtonStyle: {
        marginLeft: '10px',
        height: '55px'
    },
    ListRight: {
        marginLeft: 'auto'
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
            <Grid>
                <Grid item xs={12}>
                    <Card className={classes.cardStyle}>
                        <CardContent>
                            <Typography className={classes.headerText}>Room: {roomname}</Typography>
                            <Message messages={messages} username={username} socket={socket}/>
                            <Box display="flex" justifyContent="start" alignItems="center"> 
                                <TextField onChange={e => setText(e.target.value)} name="text" value={text} variant="outlined" label="Message" fullWidth size="medium"></TextField>
                                <Button type="submit" className={classes.ButtonStyle} variant="contained" color="primary" size="medium"> Send</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatRoom

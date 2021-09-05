import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import { CardContent, List, ListItem, Typography, ListItemText, Divider, Avatar, ListItemAvatar } from '@material-ui/core';
import { io } from 'socket.io-client';


const useStyles = makeStyles({
    cardStyle: {
        marginTop: '70px'
    },
    headerText: {
        marginBottom: '20px'
    },
    ListStyle: {
        marginBottom: '10px'
    },
    ButtonStyle: {
        marginTop: '10px',
        float: 'right'
    }
})

function ChatRoom() {

    const socket = io(process.env.REACT_APP_API_URL);
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('chat', (payload) => {
            console.log(payload);
            setChat(chat.concat(payload))
        })
    },[socket])

    const onSubmit = (e) => {
        e.preventDefault();
        socket.emit('chat', message);
        setMessage('');
    }

    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <Grid>
                <Grid item xs={12}>
                    <Card className={classes.cardStyle}>
                        <CardContent>
                            <Typography className={classes.headerText}>ChatRoom</Typography>

                            <List className={classes.ListStyle}>
                                <ListItem>
                                    <ListItemAvatar>
                                       <Avatar>
                                           <ImageIcon/>
                                       </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Lorem Ipsum" secondary="Jan 9, 2014"/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemAvatar>
                                       <Avatar>
                                           <ImageIcon/>
                                       </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Lorem Ipsum" secondary="Jan 9, 2014"/>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemAvatar>
                                       <Avatar>
                                           <ImageIcon/>
                                       </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Lorem Ipsum" secondary="Jan 9, 2014"/>
                                </ListItem>
                            </List>

                            <form onSubmit={onSubmit}>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <TextField onChange={e => setMessage(e.target.value)} name="message" value={message} variant="standard" label="Message" fullWidth size="medium"></TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button type="submit" className={classes.ButtonStyle} variant="contained" color="primary"> Send</Button>
                                    </Grid>
                                </Grid>
                            </form>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatRoom

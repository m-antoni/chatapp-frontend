import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import { CardContent, List, ListItem, Typography, ListItemText, Divider, Avatar, ListItemAvatar } from '@material-ui/core';

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

    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <Grid>
                <Grid item xs={12}>
                    <Card className={classes.cardStyle}>
                        <CardContent>
                            <Typography className={classes.headerText}>ChatRoom</Typography>

                            <List clasName={classes.ListStyle}>
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

                            <form action="">
                                <Grid container>
                                    <Grid item xs={10}>
                                        <TextField variant="standard" label="Message" fullWidth size="medium"></TextField>
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

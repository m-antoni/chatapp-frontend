import React, { useRef, useEffect } from 'react';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import moment from 'moment';
import { capitalize } from '../utils/helpers';

const useStyles = makeStyles((theme) => ({
    orange: {
      color: 'white',
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: 'white',
      backgroundColor: deepPurple[500],
      marginRight: '6px'   
    },
    messageRight: {
        float: 'right',
        maxWidth: '75%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        fontSize: '0.9rem',
        backgroundColor: '#f8e896',
        padding: '10px',
        borderRadius: '20px 20px 0px 20px',
        margin: '5px 0px'
    },
    text:{
        margin: '0px 5px',
    },
    messageLeft: {
        float: 'left',
        maxWidth: '75%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginRight: 'auto',
        fontSize: '0.9rem',
        backgroundColor: '#A8DDFD',
        padding: '10px',
        borderRadius: '20px 20px 20px 0px',
        margin: '5px 0px',
    },
    clearBoth:{
        clear: 'both'
    },
    date:{
        color: 'grey',
        margin: '3px',
        fontSize: '0.7rem',
        fontWeight: '600'
    },
    usernameRight: {
        marginRight: '10px',
        textAlign: 'right',
        marginBottom: '-2px',
        color: '#000',
        margin: '3px',
        fontSize: '0.7rem',
        fontWeight: '600'
    },
    usernameLeft: {
        marginLeft: '5px',
        textAlign: 'left',
        marginBottom: '-2px',
        color: '##000',
        margin: '3px',
        fontSize: '0.7rem',
        fontWeight: '600'
    }
}));


function Message({ messages, userID }){
    
    const classes = useStyles();

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);


    return ( 
       <div>
            {
                messages && messages.map((m,i) => {
                    // console.log(m)
                    if(m.user_id === userID)
                    {
                        return (
                           <div key={i}>
                                <div className={classes.clearBoth}></div>
                                {/* <div className={classes.usernameRight}>{capitalize(m.username, true)}</div> */}
                                <div className={classes.messageRight}>
                                    <div className={classes.text}>
                                        <div>{m.text}</div>
                                        <div className={classes.date}>{moment(m.date).format('ll h:mm A')}</div>
                                    </div>
                                    <Avatar className={classes.orange}>{m.username.charAt(0).toUpperCase()}</Avatar>
                                </div>
                                <div className={classes.clearBoth}></div>
                            </div>
                        )
                    }
                    else
                    {
                        if(!m.user_id)
                        {
                            return (
                                <div key={i}>
                                    <div className={classes.clearBoth}></div>
                                    <div className={classes.usernameLeft}>{capitalize(m.username, true)}</div>
                                    <div className={classes.messageLeft}>
                                        <div className={classes.textLeft}>
                                            <div>{m.text}</div>
                                            <div className={classes.date}>{moment(m.date).format('ll h:mm A')}</div>
                                        </div>
                                    </div>
                                    <div className={classes.clearBoth}></div>
                                </div>
                            )
                        }
                        else
                        {
                            return (
                                <div key={i}>
                                    <div className={classes.clearBoth}></div>
                                    <div className={classes.usernameLeft}>{capitalize(m.username, true)}</div>
                                    <div className={classes.messageLeft}>
                                        <Avatar className={classes.purple}>{m.username.charAt(0).toUpperCase()}</Avatar>
                                        <div className={classes.textLeft}>
                                            <div>{m.text}</div>
                                            <div className={classes.date}>{moment(m.date).format('ll h:mm A')}</div>
                                        </div>
                                    </div>
                                    <div className={classes.clearBoth}></div>
                                </div>
                            )
                        }
                    }
                })
            }
             <div ref={messagesEndRef} />
       </div>
    );
}

export default Message

import React, { useRef, useEffect } from 'react';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

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
        margin: '0px 5px'
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
        color: '#000033',
        margin: '3px',
        fontSize: '0.7rem',
        fontWeight: '600'
    }
}));


function Message({ messages, username }){
    
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
                    if(m.username === username){
                        return (
                           <div key={i}>
                                <div className={classes.clearBoth}></div>
                                <div className={classes.messageRight}>
                                    <div className={classes.text}>
                                        <div>{m.text}</div>
                                        <div className={classes.date}>{m.date}</div>
                                    </div>
                                    <Avatar className={classes.orange}>{m.username.charAt(0).toUpperCase()}</Avatar>
                                </div>
                                <div className={classes.clearBoth}></div>
                            </div>
                        )
                    }else{
                        return (
                            <div key={i}>
                                <div className={classes.clearBoth}></div>
                                <div className={classes.messageLeft}>
                                    <Avatar className={classes.purple}>{m.username.charAt(0).toUpperCase()}</Avatar>
                                    <div className={classes.text}>
                                        <div>{m.text}</div>
                                        <div className={classes.date}>{m.date}</div>
                                    </div>
                                </div>
                                <div className={classes.clearBoth}></div>
                            </div>
                        )
                    }
                })
            }
             <div ref={messagesEndRef} />
       </div>
    );
}

export default Message

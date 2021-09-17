import React, { useRef, useEffect } from 'react';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
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
        margin: '10px 0px'
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
        margin: '10px 0px',
        clear: 'both',
        overflowWrap: 'anywhere'
    },
    clearBoth:{
        clear: 'both'
    },
    dateStyle:{
        color: 'grey',
        margin: '3px 6px',
        fontSize: '0.7rem'
    }
}));



function Message({ messages, username }){
    
    const classes = useStyles();

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    console.log(messages);
    
    return ( 
       <div>
            {
                messages && messages.map((m) => {
                    if(m.username === username){
                        return (
                           <>
                                <div className={classes.clearBoth}></div>
                                <div className={classes.messageRight}>
                                    <div>
                                        <div>{m.text}</div>
                                        <div className={classes.dateStyle}>{m.date}</div>
                                    </div>
                                    <Avatar className={classes.orange}>M</Avatar>
                                </div>
                                <div className={classes.clearBoth}></div>
                            </>
                        )
                    }else{
                        return (
                            <>
                                <div className={classes.clearBoth}></div>
                                <div className={classes.messageLeft}>
                                    <Avatar className={classes.purple}>M</Avatar>
                                    <div>
                                        <div>{m.text}</div>
                                        <div className={classes.dateStyle}>{m.date}</div>
                                    </div>
                                </div>
                                <div className={classes.clearBoth}></div>
                            </>
                        )
                    }
                })
            }
             <div ref={messagesEndRef} />
       </div>
    );
}

export default Message

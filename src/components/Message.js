import React, { useRef, useEffect } from 'react';
import { makeStyles, ThemeProvider   } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import { deepOrange, deepPurple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh'        
    },
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
        width: '75%',
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
        width: '75%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginRight: 'auto',
        fontSize: '0.9rem',
        backgroundColor: '#A8DDFD',
        padding: '10px',
        borderRadius: '20px 20px 20px 0px',
        margin: '10px 0px'
    },
}));




function Message({ messages, username }){

    console.log(messages, username)
    
    const classes = useStyles();

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    
    return ( 
       <div>
            {
                messages && messages.map((m) => {
                    if(m.username === username){
                        return (
                            <Avatar className={classes.purple}>M</Avatar>
                        )
                    }else{
                        return (
                            <>
                            <div className={classes.messageLeft}>
                                <Avatar className={classes.purple}>M</Avatar>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                            </div>
                 
                            <div className={classes.messageRight}>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                                <Avatar className={classes.orange}>M</Avatar>
                            </div>
                            <div className={classes.messageLeft}>
                                <Avatar className={classes.purple}>M</Avatar>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                            </div>
                 
                            <div className={classes.messageRight}>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                                <Avatar className={classes.orange}>M</Avatar>
                            </div>
         
                            <div className={classes.messageLeft}>
                                <Avatar className={classes.purple}>M</Avatar>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                            </div>
                 
                            <div className={classes.messageRight}>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                                <Avatar className={classes.orange}>M</Avatar>
                            </div>
                            <div className={classes.messageLeft}>
                                <Avatar className={classes.purple}>M</Avatar>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                            </div>
                 
                            <div className={classes.messageRight}>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                                <Avatar className={classes.orange}>M</Avatar>
                            </div>
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

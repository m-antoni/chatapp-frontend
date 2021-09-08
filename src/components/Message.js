import React from 'react';
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
    },
    messageRight: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        fontSize: '0.9rem',
        backgroundColor: '#f8e896',
        padding: '8px',
        borderRadius: '10px',
        margin: '10px 0px'
    }
}));

// #A8DDFD
function Message({ messages, username }){

    console.log(messages, username)
    const classes = useStyles();
    
    return ( 
       <>
            {
                messages && messages.map((m) => {
                    if(m.username === username){
                        return (
                            <Avatar className={classes.purple}>M</Avatar>
                        )
                    }else{
                        return (
                            <div className={classes.messageRight}>
                                <div>
                                    <div>Lorem Ipsum akjsdkalsj kasjdklasjdkl ajlkdja asdasd asdasd adasklsjd</div>
                                </div>
                                <Avatar className={classes.orange}>M</Avatar>
                            </div>
                            
                        )
                    }
                })
            }
       </>
    );
}

export default Message

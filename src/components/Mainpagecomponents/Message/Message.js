import {Card,Typography} from '@material-ui/core';
import "./Message.css";
import React, { forwardRef } from 'react';


const Message = forwardRef(({message,username,timestamp}, ref) => {


const isUser = username === message.username;  
    
    return ( 
<div  ref={ref}  > 
            
<Card className={`message ${isUser ?'message__user':'message__others'}`}>
        <Typography >
        {!isUser && `${message.username || 'Unknown User'}:`} {message.message}
        </Typography>
    </Card>
        
        </div>
     );
})
 


export default Message;
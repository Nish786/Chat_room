import {useState,useEffect} from 'react';
import './Chat.css';
import Message from '../Message/Message';
import { FormControl,Input} from '@material-ui/core';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core';
import {db,rdb} from '../../../firebase'
import {useAuth} from '../../../contexts/Authcontexts'



function Chat() {

const [input,setInput] =useState(''); 
const [messages,setMessages]=useState([]);
const {currentUser,username,setUsername}=useAuth()
const [login,setLogin]=useState(false)

useEffect(()=>{
  if(currentUser){
    rdb.child('person-details').on('value',snapshot=>{
    if(snapshot.val()!==null){
    Object.keys(snapshot.val()).map(id=>{
    if(snapshot.val()[id].email===currentUser.email) setUsername(snapshot.val()[id].name)
    })
   }})}
},[])

useEffect(()=>{
  db.collection('messages')
  .orderBy('timestamp','desc')
  .onSnapshot(snapshot =>{
    setMessages(snapshot.docs.map(doc =>({id:doc.id,message:doc.data()})))
  });
  // Retrive the information from the database
},[]);

const handleMessage = () => {

db.collection('messages').add({
  message: input,
  username:username,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
//send data to the db

setInput('');

}
const handleSubmit =(e) => { 
e.preventDefault();
}
const textInput=currentUser ? "Enter Message" : "Please Sign in to send and View Messages"
useEffect(()=>{
  currentUser? setLogin(false):setLogin(true)
})
return (
   
  <div className="App">
  {currentUser && <h2>Welcome {username}....!</h2>}

  <form className="app__form">
  <FormControl onSubmit={handleSubmit} className="app__formControl">
  <Input className="app-input"  disabled={login} placeholder={textInput} value={input} onChange={e => setInput(e.target.value)}/>

  <IconButton className="app__iconButton" disabled={!input} variant="outlined" color="primary" type='submit' onClick={handleMessage}>
  <SendIcon />
  </IconButton>

</FormControl>
</form>

{currentUser && <FlipMove>
{
  messages.map(({id,message,timestamp}) =>
    <Message key={id} username={username} message={message} timestamp={timestamp}/>
   )
} 
</FlipMove>}


</div>
  );
}

export default Chat;

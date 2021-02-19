import React,{useRef,useEffect,useState} from 'react'
import {Card,Button,Form,Alert,Container} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom';
import {useAuth} from '../../contexts/Authcontexts'
import {rdb} from '../../firebase';



function UpdateProfile() {
    
    const emailRef=useRef()
    const passwordRef=useRef();
    const conpasswordRef=useRef()
    const nameRef=useRef()
    const {currentUser,updateEmail,updatePassword,username} = useAuth();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false)
    const history=useHistory()
    const initialValues={
        name:'',
        email:'',
    }
    const [values,setValues]=useState(initialValues);


    const handleChange=e=>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

     function handleSubmit(e){
        e.preventDefault();

        if(emailRef.current.value){
            rdb.child('person-details').on('value',snapshot=>{ //
            if(snapshot.val()!==null){
            if(values){
                Object.keys(snapshot.val()).map(id=>{
                if(snapshot.val()[id].name===username){
                    rdb.child(`person-details/${id}`).set(values,err=>{ if(err) console.log(err)}) 
                    console.log(id)
                }
                })
            }
           }})}
        
        if(passwordRef.current.value!==conpasswordRef.current.value){
            return setError("Password does not Match")
        }
        setError('')
        setLoading(true)
        const promises=[];
        if(emailRef.current.value!==currentUser.email){
             promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=>{
            history.push("/")
        }).catch((err)=>{
            setError(err.message)
        }).finally(()=>{
            setLoading(false)
        })
    }
    
    return (
     <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
     <div className="w-100" style={{maxWidth:'400px'}}>
    <Card>
      <Card.Body>
          <h2 className="mb-4 text-center">Update Profile</h2>
          <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" name='name' value={values.name} onChange={handleChange} placeholder={username} required ref={nameRef} />
              </Form.Group>
              <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' value={values.email} placeholder={currentUser.email} onChange={handleChange} required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Leave it as blank if you dont want to update password"  ref={passwordRef} />
              </Form.Group>
              <Form.Group id="password-confirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control type="password" placeholder="Leave it as blank if you dont want to update password"  ref={conpasswordRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">Update</Button>
              
          </Form>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
     <Link to="/">Cancel</Link>
     </div>
    </div>
    </Container>
    )
}

export default UpdateProfile

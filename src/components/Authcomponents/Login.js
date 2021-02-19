import React,{useRef,useState} from 'react'
import {Card,Button,Form,Alert,Container} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontexts';
import { rdb } from '../../firebase';

import './auth.css'



function Login() {
    
    const emailRef=useRef()
    const passwordRef=useRef();
    const {login} = useAuth();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false)
    const history=useHistory()

    async function handleSubmit(e){
        e.preventDefault();

        try {
           setError('') 
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value) 
            history.push('/')     
        } catch (error) {
            setLoading(false)
            return setError(error.message)
        }
    }
    
    return (
    <div className="body">
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
    <div className="w-100" style={{maxWidth:'400px'}}> 
    <Card >
      <Card.Body className="container">
          <h2 className="mb-4 text-center">Log In</h2>
          <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>
              <div className="w-100 text-center mt-3 mb-3">
               <Link to="/forgot-password">Forgot Password</Link>
              </div>
              <Button disabled={loading} className="w-100" type="submit"> Login</Button>
          </Form>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
     Need an account ? <Link to="/signup">Sign Up</Link>
    </div>
    </div>
    </Container> 
    </div>
   )
}

export default Login

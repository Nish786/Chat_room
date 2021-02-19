import React,{useRef,useState} from 'react'
import {Card,Button,Form,Alert,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {useAuth} from '../../contexts/Authcontexts'



function ForgotPassword() {
    
    const emailRef=useRef()
    const {resetpassword} = useAuth();
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    const [loading,setLoading]=useState(false)

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetpassword(emailRef.current.value)
            setMessage("Check email for futher instruction")   
  
        } catch (error) {
            return setError("Failed to reset password")
        }
        setLoading(false)
    }
    
    return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
    <div className="w-100" style={{maxWidth:'400px'}}> 
    <Card>
      <Card.Body>
          <h2 className="mb-4 text-center">Password Reset</h2>
          <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-3" type="submit"> Reset Password</Button>
              <div className="w-100 text-center mt-2">
               <Link to="/login">Log In</Link>
               </div>
          </Form>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
     Need an account ? <Link to="/signup">Sign Up</Link>
    </div>
    </div>
    </Container> 
   )
}

export default ForgotPassword

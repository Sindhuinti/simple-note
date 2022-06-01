import React,{useEffect, useState} from 'react';
import { Form ,Button,Row,Col} from 'react-bootstrap';
import MainScreen from '../../MainScreen';
import {Link,useNavigate} from "react-router-dom";
import ErrorMessage from '../../ErrorMessage';
import Loading from '../../Loading';
import { useDispatch, useSelector } from 'react-redux';
import {register} from "../../../actions/userActions";

const RegisterScreen = () => {

  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [message,setMessage]=useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  
  const {loading,error,userInfo} = userRegister;
  
  useEffect(() => {
    if(userInfo){
      navigate("/mynotes");
    }
  },[navigate,userInfo]);
  
  const submitHandler = async (e)=>{
    e.preventDefault();

    if(password!==confirmPassword){
      setMessage('Password does not match');
    }else{
      dispatch(register(name,email,password));
    }

  };

 
  return (
   <MainScreen title="REGISTER">

   <div className="loginContainer">
   {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
   {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
    {loading && <Loading />}
   <Form onSubmit={submitHandler}>
     <Form.Group controlId="name">
       <Form.Label>Name</Form.Label>
       <Form.Control type="text" value={name} placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>
     </Form.Group>
     <br/>
     <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      <br/>
      <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <br/>
      <Form.Group controlId="confirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
      </Form.Group>
      <br/>
      
      <Button variant="primary" type="submit" onClick={submitHandler}>
                Submit
        </Button>

   </Form>
   <Row className="py-3">
                <Col>
                  Already have an account ? <Link to="/login">Login Here</Link>
                </Col>
            </Row>

   </div>

   </MainScreen>
  )
}

export default RegisterScreen;

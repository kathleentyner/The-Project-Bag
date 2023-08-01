import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../APIManagers/UserManager";


export const Register = ({setIsLoggedIn}) =>{
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
 

  const registerClick = (e) => {
    e.preventDefault();
   {
      const user = {name, email };
      register(user)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
 };


  return (
    <Form onSubmit={registerClick}>
      <fieldset>
    
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input id="fullName" type="text" onChange={e => setName(e.target.value)} />
        </FormGroup>
               <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>     
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}

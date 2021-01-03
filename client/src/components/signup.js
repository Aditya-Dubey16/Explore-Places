import React, { Component } from 'react';
import {  Button, Form, FormGroup, Input, Label } from 'reactstrap';




class Login extends Component {


  constructor(props) {
          super(props);


          this.handleLogin = this.handleLogin.bind(this);


      }


  handleLogin(event) {

         this.props.loginUser({firstname:this.firstname, lastname:this.lastname, username: this.username.value, password: this.password.value});
         event.preventDefault();
         console.log(this.props);

}

  render(){

    return(


      <Form onSubmit={this.handleLogin}>
                      <FormGroup>
                          <Label htmlFor="firstname">firstname</Label>
                          <Input type="text" id="firstname" name="firstname"
                              innerRef={(input) => this.firstname = input} />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="lastname">Lastname</Label>
                          <Input type="lastname" id="lastname" name="lastname"
                              innerRef={(input) => this.lastname = input}  />


                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="username">Username</Label>
                          <Input type="text" id="username" name="username"
                              innerRef={(input) => this.username = input} />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" name="password"
                              innerRef={(input) => this.password = input}  />


                      </FormGroup>
                      <Button type="submit" value="submit" color="primary">Signup!</Button>
                  </Form>



    );
  }
}

export default Login;

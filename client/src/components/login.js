import React, { Component } from 'react';
import {  Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';




class Login extends Component {


  constructor(props) {
          super(props);
          this.state = {

          isModalOpen: false
      };

           this.toggleModal = this.toggleModal.bind(this);
          this.handleLogin = this.handleLogin.bind(this);
          this.handleSignup = this.handleSignup.bind(this);


      }
      toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSignup(event) {
            this.toggleModal();
           this.props.signup({firstname:this.firstname.value, lastname:this.lastname.value, username: this.username.value, password: this.password.value});
           event.preventDefault();
           console.log(event);

    }


  handleLogin(event) {

         this.props.loginUser({username: this.username.value, password: this.password.value});
         event.preventDefault();
         console.log(this.props);

}

  render(){

    return(
      <>

      <Form onSubmit={this.handleLogin}>
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

                      <Button type="submit" value="submit" color="primary">Login</Button>
                  </Form>
                  <Button outline onClick={this.toggleModal}> Signup!</Button>


                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                     <ModalHeader toggle={this.toggleModal}>Signup!</ModalHeader>
                       <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                                        <FormGroup>
                                            <Label htmlFor="firstname">Firstname</Label>
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
                                    </ModalBody>
                                    </Modal>
            </>



    );
  }
}

export default Login;

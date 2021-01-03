import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';




class New extends Component {


  constructor(props) {
          super(props);
          this.state = {
            selectedFile: null
          }

          this.handleNew = this.handleNew.bind(this);


      }


  handleNew(event) {

      let name=(event.target.name.value);
      let description=(event.target.description.value);
      let newplaces = new FormData();
      newplaces.append('name', event.target.name.value);
      newplaces.append('description', event.target.description.value);
      newplaces.append('image', this.state.selectedFile);

      //let image=event.target.files[0];
         this.props.newplaces(newplaces);
         console.log(newplaces);
         //console.log({name: this.name.value, description: this.description.value, image:this.image.value});
         event.preventDefault();


}

handleFile(event) {

      this.setState({selectedFile: event.target.files[0]});
       console.log(event.target.files[0]);
       console.log(event.target.files);



}



  render(){

    return(

      <div>
      <Form onSubmit={this.handleNew}>

                      <FormGroup>
                          <Label htmlFor="name">Name</Label>
                          <Input type="text" id="name" name="name" />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="description">Description</Label>
                          <Input type="textarea" rows="6" id="description" name="description"  />


                      </FormGroup>
                      <FormGroup>

                              <Input type="file" name="image"
                              onChange={(event) =>  this.handleFile(event)}  />


                      </FormGroup>
                      <Button type="submit" value="submit" color="primary">Submit</Button>

                  </Form>

                </div>
    );
  }
}

export default New;

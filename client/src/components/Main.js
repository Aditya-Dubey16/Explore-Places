import React, { Component } from 'react';
import Home from './home';
import Login from './login';
import New from './newPlaces';
import { Button } from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPlaces, loginUser, postPlaces, postlike, deletelike, fetchlike,  updateplace,  logoutUser, signup} from '../redux/ActionCreators';



const mapStateToProps = state => {
    return {
      auth: state.auth,
      places: state.places,
      like: state.likes
    }
}

const mapDispatchToProps = (dispatch) => ({

  fetchPlaces: () => {dispatch(fetchPlaces())},
  signup: (details) => {dispatch(signup(details))},
  loginUser: (creds) => {dispatch(loginUser(creds))},
  logoutUser: () => {dispatch(logoutUser())},
  postPlaces: (newplaces) => {dispatch(postPlaces(newplaces))},
  fetchlike: () => {dispatch(fetchlike())},
  postlike: (placeId) => { console.log(placeId); dispatch(postlike(placeId))},
  deletelike:  (placeId) => {  console.log(placeId);  dispatch(deletelike(placeId))},
  updateplace: (placeId, action)  => dispatch(updateplace(placeId, action))
});

class Main extends Component {

 componentDidMount() {
    this.props.fetchlike();
   this.props.fetchPlaces();



  }

  render() {



    return (
      <div className="mainContainer ">

        <div className="col-12 col-md-8 m-1">

              { this.props.auth.isAuthenticated ?
              <Home places={this.props.places} likes={this.props.like.likes} postlike={this.props.postlike} deletelike={this.props.deletelike} updateplace={this.props.updateplace} auth={this.props.auth}/>
                  :
              <Home places={this.props.places} auth={this.props.auth} />
            }

        </div>
        <div>
            {this.props.auth.isAuthenticated ?
                <div><New newplaces={this.props.postPlaces}  logoutUser={this.props.logoutUser}/>
                <Button type="logout" value="submit" onClick={this.props.logoutUser}>logout</Button></div> :
               <Login  auth={this.props.auth} loginUser={this.props.loginUser} signup={this.props.signup} />

            }

          </div>






      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const signup = (details) => (dispatch) =>  {


  return fetch(baseUrl + 'users/signup', {
    method:  'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details),


  })
  .then(response =>  {
    if(response.ok)  {
      return response;
    }
    else  {
      var error = new Error('Error'+ response.status + ' : ' + response.statusText);
      error.response = response;
      throw error;
    }
  },  error  => {
    var errmess = new Error(error.message);
          throw errmess;
  })
  .then(response => response.json())
  .then(response => {alert("Registration Successful, Please login")})
  .catch(error  => console.log(error.message));
};


export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}


export const loginUser = (creds) => (dispatch) =>  {
  dispatch(requestLogin(creds))

  return fetch(baseUrl + 'users/login', {
    method:  'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds),


  })
  .then(response =>  {
    if(response.ok)  {
      return response;
    }
    else  {
      var error = new Error('Error'+ response.status + ' : ' + response.statusText);
      error.response = response;
      throw error;
    }
  },  error  => {
    throw error;
  })
  .then(response => response.json())
  .then(response =>  {
    if(response.success)  {
      localStorage.setItem('token', response.token);
      localStorage.setItem('creds', JSON.stringify(creds));
      dispatch(receiveLogin(response));
    }
    else  {
      var error = new Error('Error  ' + response.ststus);
      error.response =  response;
      throw error;
    }

  })
  .catch(error  => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(likeFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}




export const fetchPlaces = () => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'places', {

      headers: {
        'Authorization' : bearer
      },

    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(places => dispatch(addPlaces(places)))
        .catch(error => dispatch(placesFailed(error.message)));
}
export const placesFailed = (errmess) => ({
    type: ActionTypes.PLACES_FAILED,
    payload: errmess
});

export const addPlaces = (places) => ({
    type: ActionTypes.ADD_PLACES,
    payload: places
});


export const postPlaces = (newplaces) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'places', {

      method: 'POST',

      headers: {
        'Authorization' : bearer,


      },
        body: newplaces,

    })
        .then(response => {
            if (response.ok) {

                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(places =>   dispatch(addPlace(places)))
        .catch(error => dispatch(placesFailed(error.message)));
}

export const addPlace = (places) => ({
    type: ActionTypes.ADD_PLACE,
    payload: places
});


export const updateplace = (placeId, action) =>(dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log(placeId, action);


    return  fetch(baseUrl + 'places', {

        method: "PUT",


        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        body: JSON.stringify({"_id": placeId,  "action": action}),
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(place  => { console.log('Place Added', place); dispatch(addPlace(place)); })
    .catch(error => dispatch(placesFailed(error.message)));
}




export const postlike = (placeId) =>(dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return  fetch(baseUrl + 'like' , {

        method: "POST",
        body: JSON.stringify({"_id": placeId}),

        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(like => { console.log('Place Added', like); dispatch(addLikes(like)); })
    .catch(error => dispatch(likeFailed(error.message)));
}

export const deletelike = (placeId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return  fetch( baseUrl + 'like', {
        method: "DELETE",
        body: JSON.stringify({"_id": placeId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"

    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(like => { console.log('Place Deleted', like); dispatch(addLikes(like)); })
    .catch(error => dispatch(likeFailed(error.message)));
};

export const fetchlike = () =>  (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'like', {
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(like=> {console.log(like.places);  dispatch(addLikes(like)); })
    .catch(error => dispatch(likeFailed(error.message)));
}


export const likeFailed = (errmess) => ({
    type: ActionTypes.LIKE_FAILED,
    payload: errmess
});

export const addLikes = (like) => ({

    type: ActionTypes.ADD_LIKE,
    payload: like

});

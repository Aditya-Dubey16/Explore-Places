import * as ActionTypes from './ActionTypes';

export const Places = (state = {

        errMess: null,
        places: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PLACES:
            return {...state, errMess: null, places: action.payload};


            case ActionTypes.PLACES_FAILED:
               return {...state, errMess: action.payload, places: []};

          case ActionTypes.ADD_PLACE:
          var place = action.payload;
             return {...state, places: state.places.concat(place)};



            default:
               return state;

        }
    }

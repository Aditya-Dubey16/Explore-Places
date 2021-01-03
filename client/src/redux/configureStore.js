import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Places } from './places';
import { Likes } from './likes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
          auth: Auth,
          places: Places,
          likes: Likes
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}

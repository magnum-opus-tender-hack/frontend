import {configureStore} from '@reduxjs/toolkit'
import nodesInputReducer from './reducers/nodesInputReducer';
import thunk from 'redux-thunk'


const store = configureStore({reducer: nodesInputReducer, middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: nodesInputReducer
      }
    })})

export default store;

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

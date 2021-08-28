import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit';

import userReducer from './user';
import paisesReducer from './core/paises';
import provinciasReducer from './core/provincias';



import {
    persistStore,
    persistReducer
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
    user: userReducer,
    paises: paisesReducer,
    provincias: provinciasReducer

});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore(
    {
        reducer: persistedReducer
    }
)

export const persistor = persistStore(store);
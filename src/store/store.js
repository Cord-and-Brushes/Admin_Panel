import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import bannerReducer from '../features/bannerSlice';
import postReducer from '../features/postSlice';

const persistConfig = {
 key: 'root',
 storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    banner: bannerReducer,
    posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
 reducer: persistedReducer,
});

export const persistor = persistStore(store);

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import allReducers from './reducers';

const persistConfig = {
    key: 'root', // The key under which your Redux state will be saved
    storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const initializeStore = () => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};
'use client'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import orderSlice from '@/app/slice/orderSlice'; // Import both slices

// Redux Persist Configuration
const persistConfig = {
    key: 'root',
    storage, // The storage engine to use (localStorage in this case)
};

// Combine reducers into one root reducer
const rootReducer = combineReducers({
    order: orderSlice.orderSlice.reducer, // Access the `reducer` property directly
    mobile: orderSlice.mobileSlice.reducer, // Same here
});

// Apply `persistReducer` to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false, // Disable serializable checks for redux-persist
            }),
    });
};

export const store = makeStore();
export const persistor = persistStore(store); // Persistor for handling persistence

// Export types for RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

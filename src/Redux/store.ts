import { createStore, applyMiddleware, type Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import reducers from './reducers';


// 1️⃣ Middleware Saga
const sagaMiddleware = createSagaMiddleware()

const store: Store<any> = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// 4️⃣ Types globaux Redux
export type RootState = ReturnType<typeof store.getState>
export type IRootState = RootState
export type AppDispatch = typeof store.dispatch

export default store
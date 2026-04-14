import { all } from 'redux-saga/effects';
import { authSaga } from './auth/saga';

// si tu as authSaga, garde-le

// --- V3 sagas ---


export default function* rootSaga() {
  yield all([
    authSaga(), // optionnel si tu l’as

  ]);
}

import { all, takeLatest } from 'redux-saga/effects';

import { Types as DevsTypes } from '../ducks/devs';
import { addNewDev } from './devs';

export default function* rootSaga() {
  yield all([takeLatest(DevsTypes.ADD_REQUEST, addNewDev)]);
}

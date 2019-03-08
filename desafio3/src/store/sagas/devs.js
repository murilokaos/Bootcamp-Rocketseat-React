import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as DevsActions } from '../ducks/devs';

export function* addNewDev(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.devId}`);

    const isDuplicated = yield select(state => state.devs.data.find(favorite => favorite.id === data.id));
  } catch (error) {
    yield put(DevsActions.addFailure);
  }
}

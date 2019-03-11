import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as DevsActions } from '../ducks/devs';

export function* addNewDev(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.devGitUser}`);

    const isDuplicated = yield select(state => state.devs.data.find(dev => dev.id === data.id));

    if (!isDuplicated) {
      const userData = {
        id: data.id,
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        company: data.company,
        url: data.html_url,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
      yield put(DevsActions.addDevSuccess(userData));
    } else yield put(DevsActions.addDevFailure('Usuário já cadastrado!'));
  } catch (error) {
    yield put(DevsActions.addFailure('Falha ao cadastrar usuário!'));
  }
}

import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
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
      toast.success('Usuário Cadastrado Com Sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      yield put(DevsActions.addDevFailure('Usuário já cadastrado!'));
      toast.warn('Usuário Duplicado!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put(DevsActions.addDevFailure('Falha ao cadastrar usuário!'));
    toast.error('Falha ao cadastrar usuário!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

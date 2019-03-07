import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as FavoriteActions } from '../ducks/favorites';

export function* addFavorite(action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

    const isDuplicated = yield select(state => state.favorites.data.find(favorite => favorite.id === data.id));

    if (isDuplicated) {
      yield put(FavoriteActions.addFavoriteFailure('Repositório Duplicado!'));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        url: data.html_url,
        avatar: data.owner.avatar_url,
        description: data.description,
      };
      yield put(FavoriteActions.addFavoriteSuccess(repositoryData));
    }
  } catch (error) {
    yield put(FavoriteActions.addFavoriteFailure('Erro ao adicionar o repositório!'));
  }
}

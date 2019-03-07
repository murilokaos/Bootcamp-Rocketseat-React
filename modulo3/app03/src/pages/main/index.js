import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as FavoritesActions } from '../../store/ducks/favorites';

class Main extends Component {
  static propTypes = {
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          url: PropTypes.string,
          name: PropTypes.string,
          avatar: PropTypes.string,
          description: PropTypes.string,
        }),
      ),
    }).isRequired,
    addFavoriteRequest: PropTypes.func.isRequired,
  };

  state = {
    repositoryInput: '',
  };

  handleChange = (e) => {
    this.setState({
      repositoryInput: e.target.value,
    });
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositoryInput } = this.state;
    const { addFavoriteRequest } = this.props;

    addFavoriteRequest(repositoryInput);
    this.setState({
      repositoryInput: '',
    });
  };

  render() {
    const { repositoryInput } = this.state;
    const { favorites } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          {!!favorites.error && (
            <span style={{ color: '#f00', display: 'block' }}>{favorites.error}</span>
          )}
          <input
            type="text"
            placeholder="usuario/repositório"
            value={repositoryInput}
            onChange={this.handleChange}
          />
          <button type="submit">
            {favorites.loading ? 'Carregando...' : 'Adicionar aos Favoritos'}
          </button>
        </form>

        <ul style={{ listStyle: 'none' }}>
          {!!favorites
            && favorites.data.map(favorite => (
              <li key={favorite.id}>
                <img
                  src={favorite.avatar}
                  alt={favorite.name}
                  style={{ width: '50px', height: 'auto', borderRadius: '50%' }}
                />
                <p>{`${favorite.name} (${favorite.description})`}</p>
                <a href={favorite.url} target="_blank" rel="noopener noreferrer">
                  Acessar
                </a>
              </li>
            ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoritesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

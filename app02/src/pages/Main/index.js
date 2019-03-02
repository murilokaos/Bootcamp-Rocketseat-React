import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import api, { getRepository } from '../../services/api';

import CompareList from '../../components/CompareList';
import { Container, Form } from './styles';
import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
    repositoryError: false,
    loading: false,
  };

  async componentDidMount() {
    moment.locale('pt-br');
    const local = await localStorage.getItem('repositories');
    if (local.length > 0) {
      this.setState({
        repositories: JSON.parse(local),
      });
    }
  }

  handleDelete = (repoName) => {
    const { repositories } = this.state;
    const reposActual = repositories.filter(repository => !(repository.full_name === repoName));
    this.setState({
      repositories: reposActual,
    });

    localStorage.setItem('repositories', JSON.stringify(reposActual));
  };

  handleUpdate = async (repoName) => {
    const { repositories } = this.state;

    await api
      .get(`/repos/${repoName}`)
      .then((response) => {
        response.data.lastCommit = moment(response.data.pushed_at).fromNow();
        const update = repositories.map((repository) => {
          if (repository.full_name === repoName) {
            repository = response.data;
          }
          return repository;
        });
        this.setState({
          repositories: update,
        });
        localStorage.setItem('repositories', JSON.stringify(update));
      })
      .catch((error) => {
        this.setState({
          repositoryError: true,
        });
        console.log(error);
      });
  };

  handleAddRepository = (e) => {
    e.preventDefault();

    const { repositories, repositoryInput } = this.state;

    this.setState({
      loading: true,
    });

    const double = repositories.filter(repository => repository.full_name === repositoryInput);

    if (!double.length) {
      getRepository(e.target.usuario.value)
        .then((resp) => {
          if (resp) {
            resp.lastCommit = moment(resp.pushed_at).fromNow();
            const addRepositories = [...repositories, resp];
            this.setState({
              repositoryInput: '',
              repositories: addRepositories,
              repositoryError: false,
            });
            localStorage.setItem('repositories', JSON.stringify(addRepositories));
          }
        })
        .catch((error) => {
          this.setState({
            repositoryError: true,
          });
          console.log(error);
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false, repositoryError: true });
    }
  };

  render() {
    const {
      repositoryError, repositoryInput, repositories, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          cbUp={this.handleUpdate}
          cbDel={this.handleDelete}
        />
      </Container>
    );
  }
}

import React, { Component } from 'react';
import moment from 'moment';
import { getRepository } from '../../services/api';

import CompareList from '../../components/CompareList';
import { Container, Form } from './styles';
import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
    repositoryError: false,
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    getRepository(this.state.repositoryInput)
      .then((resp) => {
        if (resp) {
          resp.lastCommit = moment(resp.pushed_at).fromNow();
          this.setState({
            repositoryInput: '',
            repositories: [...this.state.repositories, resp],
            repositoryError: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          repositoryError: true,
        });
      });
    // try {
    //   const resp = await getRepository(this.state.repositoryInput);

    //   if (resp) {
    //     this.setState({
    //       repositories: [...this.state.repositories, resp],
    //     });
    //   }
    // } catch (error) {
    //   console.log(error.status, error);
    // }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}

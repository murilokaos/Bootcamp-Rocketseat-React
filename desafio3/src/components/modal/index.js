import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as DevsActions } from '../../store/ducks/devs';

import {
  Container, Board, Button, ButtonsContainer,
} from './styles';

class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.func.isRequired,
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    addDevRequest: PropTypes.func.isRequired,
  };

  state = {
    userInput: '',
    closing: false,
  };

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  setClosing = () => {
    const { isOpen } = this.props;
    this.setState((currState) => {
      if (currState.closing === true) {
        isOpen();
      }
      return {
        userInput: '',
        closing: true,
      };
    });
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setClosing();
  };

  handleSave = (e) => {
    e.preventDefault();
    const { lng, lat, addDevRequest } = this.props;
    const { userInput } = this.state;

    addDevRequest(userInput, lat, lng);

    this.setClosing();
  };

  render() {
    const { userInput, closing } = this.state;
    return (
      <Container close={closing} open={!closing}>
        <Board onSubmit={this.handleSave}>
          <label htmlFor="gitUser">
            Adicionar novo dev
            <input
              type="text"
              value={userInput}
              onChange={e => this.handleChange(e)}
              id="gitUser"
              placeholder="Usuário no GitHub"
              required
            />
          </label>
          <ButtonsContainer>
            <Button type="button" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </ButtonsContainer>
        </Board>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  devs: state.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

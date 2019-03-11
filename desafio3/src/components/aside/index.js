import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Container,
  ListItem,
  List,
  ListTitle,
  ListSubTitle,
  ListImage,
  ListTitleContainer,
  ListButtonsContainer,
  ButtonDelete,
  ButtonArrow,
} from './styles';

const Aside = ({ devsInArea }) => (
  <Container>
    {devsInArea.length ? (
      <List>
        {devsInArea.map(dev => (
          <ListItem key={dev.id}>
            <ListImage src={dev.avatar} alt={`Avatar of ${dev.name}`} />
            <ListTitleContainer>
              <ListTitle>{dev.name}</ListTitle>
              <ListSubTitle>{dev.username}</ListSubTitle>
            </ListTitleContainer>
            <ListButtonsContainer>
              <ButtonDelete>
                <i className="fa fa-fw fa-times-circle remove" />
              </ButtonDelete>
              <ButtonArrow>{'>'}</ButtonArrow>
            </ListButtonsContainer>
          </ListItem>
        ))}
      </List>
    ) : (
      <h1>puts... Não tem ninguém aqui!</h1>
    )}
  </Container>
);

Aside.propTypes = {
  devsInArea: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      avatar: PropTypes.string,
      name: PropTypes.string,
      company: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  devsInArea: state.devs.data,
});
export default connect(mapStateToProps)(Aside);

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as DevActions } from '../../store/ducks/devs';

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

const Aside = ({ devsInArea, removeDev }) => (
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
              <ButtonDelete
                type="button"
                onClick={() => {
                  removeDev(dev);
                }}
              >
                <i className="fa fa-fw fa-times-circle remove" />
              </ButtonDelete>
              <ButtonArrow href={dev.url} target="_blank" rel="noreferrer noopener">
                <i className="fa fa-angle-right" />
              </ButtonArrow>
            </ListButtonsContainer>
          </ListItem>
        ))}
      </List>
    ) : (
      <div>
        <img
          src="https://www.shareicon.net/download/2016/08/13/808566_media.svg"
          alt="Logo Github"
        />
        Puts... Parece que não tem ninguém cadastrado ainda! Seja o primeiro.
      </div>
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

const mapStateToProps = ({ devs }) => ({
  devsInArea: devs.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);

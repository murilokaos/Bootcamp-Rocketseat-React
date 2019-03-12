import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGL, { Marker } from 'react-map-gl';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as DevsActions } from '../../store/ducks/devs';

import Aside from '../../components/aside';
import Modal from '../../components/modal';

import { Container } from './styles';

class Main extends Component {
  static propTypes = {
    devsInArea: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        lng: PropTypes.number,
        lat: PropTypes.number,
        avatar: PropTypes.string,
        name: PropTypes.string,
        company: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -16.6762391,
      longitude: -49.3102765,
      zoom: 15,
    },
    latitude: 0,
    longitude: 0,
    isModalClose: true,
  };

  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleOpenOrNo = () => {
    const { isModalClose } = this.state;
    const status = this.setState({
      isModalClose: !isModalClose,
    });

    return status;
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;

    this.handleOpenOrNo();
    this.setState({
      latitude,
      longitude,
    });
  };

  render() {
    const {
      viewport, isModalClose, latitude, longitude,
    } = this.state;
    const { devsInArea } = this.props;
    return (
      <Container>
        {!isModalClose && (
          <Modal
            isOpen={this.handleOpenOrNo}
            lng={longitude}
            lat={latitude}
            isModalClose={isModalClose}
          />
        )}
        <Aside />
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={view => this.setState({ viewport: view })}
          onClick={this.handleMapClick}
        >
          {!!devsInArea
            && devsInArea.map(dev => (
              <Marker key={dev.id} longitude={dev.lng} latitude={dev.lat}>
                <img
                  style={{
                    borderRadius: 100,
                    width: 48,
                    height: 48,
                  }}
                  src={dev.avatar}
                  alt={`${dev.name} Avatar`}
                />
              </Marker>
            ))}
        </MapGL>
      </Container>
    );
  }
}

const mapStateToProps = ({ devs }) => ({
  devsInArea: devs.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

/* eslint-disable */
import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

export class InfoWindow extends React.Component {

  componentDidMount() {
    this.renderInfoWindow();
  }

  componentDidUpdate(prevProps) {
    const {google, map, lat, lng} = this.props;

    if (!google || !map) {
      return;
    }

    if (map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible ||
	 this.props.marker !== prevProps.marker ||
	 lat != prevProps.lat ||
	 lng != prevProps.lng)) {
      if (this.props.visible && prevProps.visible) {
	this.infowindow.setPosition({lat: lat, lng: lng});
      } else if (this.props.visible) {
	this.openWindow();
      } else {
	this.closeWindow();
      }
    }
  }

  renderInfoWindow() {
    let {map, google, mapCenter, lat, lng} = this.props;

    if (!google || !google.maps) {
      return;
    }

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: ''
    });
    // Set the new position of the infoWindow
    iw.setPosition({lat: lat, lng: lng});
    
    google.maps.event
          .addListener(iw, 'closeclick', this.onClose.bind(this))
    google.maps.event
          .addListener(iw, 'domready', this.onOpen.bind(this));
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  openWindow() {
    this.infowindow.setPosition({lat: this.props.lat, lng: this.props.lng});
    this.infowindow.open(this.props.map);
  }

  updateContent() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
  }

  closeWindow() {
    this.infowindow.close();
    return true;
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }

  render() {
    return null;
  }
}

InfoWindow.propTypes = {
  children: T.element.isRequired,
  map: T.object,
  marker: T.object,
  visible: T.bool,

  // callbacks
  onClose: T.func,
  onOpen: T.func,

  lat: T.number,
  lng: T.number
}

InfoWindow.defaultProps = {
  visible: false
}

export default InfoWindow


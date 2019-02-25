import React from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../actions';
import Image from './Image';

class ImageContainer extends React.Component {
  componentDidMount() {
    this.props.getFiles();
  }

  // Maps files to be displayed in the #image-container
  renderImages = () => {
    if ( !this.props.files || this.props.files.length === 0 ) {
      return <p>No images to display</p>;
    }

    return this.props.files.map( ( file, i ) => {
      return (
        <Image file={ file } key={ i }/>
      )
    });
  }

  render() {
    return (
      <div id="image-container">
        { this.renderImages() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    files: Object.values( state.files )
  };
}

export default connect(
  mapStateToProps,
  {
    getFiles,
  }
)( ImageContainer );

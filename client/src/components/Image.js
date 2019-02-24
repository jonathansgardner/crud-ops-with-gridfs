import React from 'react';
import { connect } from 'react-redux';
import { deleteFile, updateFile } from '../actions';
import Modal from './Modal';
import '../styles/Image.css';

class Image extends React.Component {
  state = {
    imageUpdateToggle: false,
    alt: this.props.file.metadata.alt,
    caption: this.props.file.metadata.caption
  }

  toggleImageUpdateModal = () => {
    this.setState({ imageUpdateToggle: !this.state.imageUpdateToggle });
  }

  handleAltInputChange = (event) => {
    this.setState({
      alt: event.target.value
    })
  }

  handleCaptionInputChange = (event) => {
    this.setState({
      caption: event.target.value
    })
  }

  handleImageUpdateFormSubmit = (event) => {
    event.preventDefault();
    const data = { caption: this.state.caption, alt: this.state.alt }
    this.props.updateFile(this.props.file.filename, data);
    this.toggleImageUpdateModal();
  }

  renderImageUpdateModalContent = () => {
    return (
      <form className="file-update-form">
        <label htmlFor="alt">Image alt attribute</label>
        <input name="alt" type="text" onChange={ this.handleAltInputChange } value={ this.state.alt } />
        <label htmlFor="caption">Image caption</label>
        <textarea name="caption" rows="3" onChange={ this.handleCaptionInputChange } value={ this.state.caption }></textarea>
        <input type="submit" value="Update file" onClick={ this.handleImageUpdateFormSubmit }/>
      </form>
    );
  }

  render() {
    return (
      <div
        id="image-wrapper"
      >
        <figure>
          <img
            src={ `/files/read/${ this.props.file.filename }` }
            alt={ this.props.file.metadata.alt }
          />
          <figcaption>{ this.props.file.metadata.caption }</figcaption>
          <div className="image-options">
            <small className="option" onClick={ this.toggleImageUpdateModal }>edit</small>
            <small>&nbsp;|&nbsp;</small>
            <small className="option" onClick={ () => this.props.deleteFile( this.props.file.filename ) }>delete</small>
          </div>
        </figure>
        { this.state.imageUpdateToggle ?
          <Modal
            onDismiss={ this.toggleImageUpdateModal }
            title="Edit Image Info"
            content={ this.renderImageUpdateModalContent() }
          /> :
          null
        }
      </div>
    );
  }
}

export default connect( null, { deleteFile, updateFile } )( Image );

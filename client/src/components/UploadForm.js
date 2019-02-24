import React from 'react';
import { connect } from 'react-redux';
import { getFiles, uploadFile } from '../actions';
import '../styles/UploadForm.css';

class Form extends React.Component {
  state = {
    selectedFile: null,
    fileName: '', // Used to update the file Input's label
    disableButton: true, // Used to toggle disables attribute of the submit button
    inputKey: Date.now() // Used to re-render the file input on submit and validation
  }

  // Updates the file input's label to reflect the current file that is loaded
  // Called from validateFile() and handleSubmit()
  updateLabel = file => {
    if ( file ) {
      this.setState({
        fileName: file.name
      });
    } else {
      this.setState({
        fileName: 'Choose File'
      });
    }
  }

  // Checks if the file is one of the supported file formats
  // Called from handleInputChange
  validateFile = file => {
    if ( !file.name ) return;

    const a = file.name.split( "." );
    const fileType = "." + a[a.length-1];
    const fileTypes = ['.jpg','.jpeg','.png','.gif'];

    if ( fileTypes.join().indexOf( fileType ) !== -1 ) {
      this.setState({
        selectedFile: file,
        disableButton: false
      });
      this.updateLabel( file );
    } else {
      alert(
        `Only the following image file formats are supported:\n${ fileTypes.join( ", ") }\n\nPlease select a new file and try again.`
      );
      this.setState({
        inputKey: Date.now(),
        disableButton: true
      });
      this.updateLabel();
    }
  }

  // Handles the onChange event for the file input
  handleInputChange = event => {
    this.validateFile( event.target.files[0] );
  }

  // Handles form submission
  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append( 'file', this.state.selectedFile );
    this.props.uploadFile(formData);
    this.setState({
      inputKey: Date.now(),
      disableButton: true
    });
    this.updateLabel();
  }

  render() {
    return (
      <form id="file-upload-form">
        <input
          id="fileInput"
          name="fileInput"
          type="file"
          key={ this.state.inputKey }
          onChange={ this.handleInputChange }
        />
        <label htmlFor="fileInput">{ this.state.fileName }</label>
        <input
          type="submit" value="Upload File"
          disabled={ this.state.disableButton }
          onClick={ this.handleSubmit }
        />
      </form>
    )
  }
}

export default connect(
  null,
  {
    getFiles,
    uploadFile
  }
)( Form );

import React from 'react';
import UploadForm from './UploadForm';
import ImageContainer from './ImageContainer';

import '../styles/App.css';

const App = () => {
  return (
    <div id="container">
      <h1>C.R.U.D. Operations With GridFS</h1>
      <p>Upload a supported image file and see it displayed below. After uploading an image, you'll have the option to edit the image's alt attribute and caption or delete the image entirely.</p>
      <h2>Upload an image</h2>
      <small>Supported file formats: .jpg,&nbsp;.jpeg,&nbsp;.png,&nbsp;.gif</small>
      <UploadForm />
      <ImageContainer />
    </div>
  );
}

export default App;

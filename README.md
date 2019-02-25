# crud-ops-with-gridfs

A simple MERN stack app that allows users to upload images, specifically .jpg, .jpeg, .png, and .gif files, to a MongoDB database. Uploaded images are displayed on the page and users have the option to edit the caption and alt attribute of any of the currently uploaded images or to delete an image, removing it from the database entirely.

The app uses a node backend with an Express API. Multer, Multer GridFS Storage, GridFs Stream, and Method Override are used to facilitate the upload of multipart/form-data to MongoDB's GridFS storage system. These include, . The app's frontend is built with React and Redux and bootstrapped with create-react-app. Axios is used to handle HTTP requests on the frontend.

You can see the app in action at https://salty-oasis-51802.herokuapp.com/

Please note that the Heroku link above is only meant as a demo. Any images uploaded there will be removed from the database hourly to conserve space.

# hackerbay-interview-backend

A  microservice in Nodejs, with three major functionalities 
 * Authentication
 * JSON patching
 * Image Thumbnail Generation

## Quick Overview and setup

* Clone the repo
```sh
git clone https://github.com/Somtozech/hackerbay-interview-backend.git
cd hackerbay-interview-backend
```
* Install npm packages
```sh
 npm install
```
* Start Node Server
```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) to access server

## Usage
### Authentication (public)
To authenticate user you have to provide a username and password field in the request body. On successful authentication a token is returned in the response body. This token should be used for further request. Token must be placed in the Authorization header ie 
```
//headers
{
  ...
  Authorization : "Bearer `${token}`"
  ...
}
```
or in the query ``` http://localhost:port/privateRoute?token=`${token}` ```
To Authenticate , send a **POST** request to `localhost:3000/api/user/login`. 

### JSON patching (private)
 Applies a json patch to the json object, and return the resulting json object. The request body  must contain a json and patch field both representing the json object and the json patch.
 To perform a  json patch , send a **POST** request to ``` http://localhost:3000/api/patch-json```
 
 **NB:** The JSON patching route is a private route and requires a token to be present in the authorization header or query
 
 ### Image Thumbnail Generation (private)
 Downloads an image, resize to 50x50 pixels, and return the resulting thumbnail.
 The request body must contain an **imageUrl** which represents a public image url. 
 #### Supported image Types
 * jpg
 * jpeg
 * png
 * gif
 * svg
 To create a thumb send a **POST** request to ```http://localhost:3000/api/create-thumbnail```.
 
 **NB:** The image thumbnail generation route is a private route and requires a token to be present in the authorization header or query
 
## View Docs
Open [http://localhost:3000/docs](http://localhost:3000) to view docs

### Run tests
```
npm test
```

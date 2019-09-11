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

***Authentication (public)***
----
To authenticate user you have to provide a username and password field in the request body.<br /> On successful authentication a token is returned in the response body. <br />This token should be used for further request. Token must be placed in the Authorization header ie 

```
Pass the token in the request header
{
  ...
  Authorization : "Bearer `token"
  ...
}
Or pass the token as query String on the Url
http://localhost:port/privateRoute?token=token
```
***Login***
----
* **URL:** `localhost:3000/api/user/login` <br />
* **Method:** `POST` <br />
* **Success response** `{
 message:  "Message here",
 data: {
  token : "Some token here"
 }
} `
**Status Code:** 200
* **Error response** `{
 message:  "Some Message here",
 error: {
  token : "Error Message here"
 }
} `
**Status Code:** 300
### JSON patching (private)
```
Applies a json patch to the json object, and return the resulting json object.The request body  
must contain a json and patch field both representing the json object and the json patch. To 
perform a  json patch , send a **POST** request to  http://localhost:3000/api/patch-json.
```
* **URL:** `http://localhost:3000/api/create-thumbnail` <br />
* **Method:** `POST` <br />
* **Success response** `{
 message:  "Message here",
 data: {
  token : "Some token here"
 }
} `
**Status Code:** 200
* **Error response** `{
 message:  "Some Message here",
 error: {
  token : "Error Message here"
 }
} `
**Status Code:** 300
 **NB:** The JSON patching route is a private route and requires a token to be present in the authorization header or query

 
 
 ### Image Thumbnail Generation (private)
 The request body must contain an **imageUrl** which represents a public image url. 
 #### Supported image Types
 * jpg
 * jpeg
 * png
 * gif
 * svg
 
 
## View Docs
Open [http://localhost:3000/docs](http://localhost:3000) to view docs

### Run tests

npm test


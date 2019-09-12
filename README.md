# hackerbay-interview-backend

A microservice in Nodejs, with three major functionalities

- Authentication
- JSON patching
- Image Thumbnail Generation

## Quick Overview and setup

- Clone the repo

```sh
git clone https://github.com/Somtozech/hackerbay-interview-backend.git
cd hackerbay-interview-backend
```

- Install npm packages

```sh
 npm install
```

- Start Node Server

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to access server

## Usage

### Authentication

---

Returns a token on successful login

- **URL**

  /api/user/login

- **Method**

  `POST`

- **Data Params**

  **Required:**

  `username=[string]`

  `password=[string]`

- **Success Response**

  - **Code:** 200 <br/>
    **Content:** `{ message: 'User login successful', data: { token } }`

- **Error Response**

  - **Code:** 400 <br/>
    **Content:** `message: 'Bad Request', error: { name: error.name, message: error.message } }`

- **Sample Call**

```
curl -X POST "http://localhost:3000/api/user/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"username\": \"<username>\", \"password\": \"<password>\"}"
```

### JSON patching (private)

---

Takes a json objects and a patch and returns the patched json object. The request body must contain a json and patch field both representing the json object and the json patch.

- **URL**

  /api/patch-json

- **Method**

  `POST`

- **Data Params**

  **Required:**

  `json=[Object]`

  `patch=[Array]`

- **Success Response**

  - **Code:** 200 <br/>
    **Content:** `{ message: 'Json was patched', data: { patched } }`

- **Error Response**

  - **Code:** 400 <br/>
    **Content:** `message: 'Bad Request', error: { name: error.name, message: error.message } }`

  OR

  - **Code:** 401 <br/>
    **Content:** `{ message: 'Authentication Failed. Access Denied' }`

- **Sample Call**

```
curl -X POST "http://localhost:3000/api/patch-json" -H "accept: application/json" -H "Authorization: Bearer <Token>" -H "Content-Type: application/json" -d "{ \"json\": {}, \"patch\": []}"
```

### Image Thumbnail Generation (private)

---

Downloads an image, resize to 50x50 pixels, and return the resulting thumbnail.
The request body must contain an **imageUrl** which represents a public image url.

#### Supported image Types

- jpg
- jpeg
- png
- gif
- svg

* **URL**

  /api/create-thumbnail

* **Method**

  `POST`

* **Data Params**

  **Required:**

  `imageUrl=[String]`

* **Success Response**

  - **Code:** 200

* **Error Response**

  - **Code:** 400 <br/>
    **Content:** `message: 'Bad Request', error: { name: error.name, message: error.message } }`

  OR

  - **Code:** 401 <br/>
    **Content:** `{ message: 'Authentication Failed. Access Denied' }`

* **Sample Call**

```
curl -X POST "http://localhost:3000/api/create-thumbnail" -H "accept: image/jpeg" -H "Authorization: Bearer <Token>" -H "Content-Type: application/json" -d "{ \"imageUrl\": \"https://picsum.photos/id/203/600/600.jpg\"}"
```

## Access Private Route

When you login. You get a token in the response. Use this token to access private routes. Token must be placed in the authorization header in the following format

```
// headers
{
 ...
 Authorization: Bearer <Token>
 ...
}
```

## View Docs

Open [http://localhost:3000/docs](http://localhost:3000) to view docs

### Run tests

```
npm test
```

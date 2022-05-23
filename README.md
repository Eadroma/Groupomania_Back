# Groupomania - Back

Creation of a corporate social network using : 
 - Vue, vuetify for the front
 - **Express, sequelize js for the back.**



## Run Locally

Clone the project

```bash
  git clone https://github.com/Eadroma/Groupomania_Back.git
```

Go to the project directory

```bash
  cd Groupomania_back
```

Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## API Reference


In the majority of the request, you'll need to set your JWT in the headers : 
```js
 headers:  {
     authorization: <YourJWTToken>
 }
```

### User 
```http
  POST /api/users/create
```
#### Sign up an user
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string`   |  **Required**. Your Email  |
| `password`|`string`  | **Required**. Your Password|

#### Sign in an user

```http
 POST /api/users/login
```
#### Signin an user
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string`   |  **Required**. Your Email  |
| `password`|`string`  | **Required**. Your Password|

#### get the connected user
```http
 GET /api/users/me
```

#### get one user
```http
 GET /api/users/:id
```

#### update a user
```http
 PUT /api/users/:id
 ```
#### delete a user
```http
    DELETE /api/users/:id
```

#### upload cover image for a specific user
```http
  POST /api/users/:id/upload/cover
```

#### upload avatar image for a specific user
```http
  POST /api/users/:id/upload/avatar
```

#### Get all users
```http
   GET /api/users
```

### POST 
#### Create a post
```http
  POST /api/posts/create
```
#### Create a post (parameters has to be send as a form data)
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `content`|`string`  | **Required**. the content of the post|
| `image`|`file`  | image |

#### Delete a post

```http
 DELETE /api/posts/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `number`   |  **Required**. user id   |

#### Modify a post
```http
 PUT /api/posts/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `number`   |  **Required**. user id   |
| `content`|`string`  | **Required**. the content of the post|
| `image`|`file`  | image |

### Get one post
```http
 GET /api/posts/:id
```

### Post a like 
```http
 POST /api/posts/:id/like
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `number`   |  **Required**. user id   |

### Post a comment 
```http
 POST /api/posts/:id/comments
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `number`   |  **Required**. user id   |
| `content`|`string`  | **Required**. the content of the comment|

### Get all post from one User
```http
 GET /api/posts/user/:id
 ```

 ### Get all post 
```http
 GET /api/posts/
 ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`
`DB`
`DB_USER`
`PORT`
`DB_PASSWORD`
`URI`
`TOKEN`

(Follow the .env.example file)
And you will need a database using `mysql` (for sequelize).
## Authors

- [@eadroma](https://www.github.com/eadroma)


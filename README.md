# Getting Started with node server App

## Installation

Enter to the server folder

```bash
cd server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be purple with the message:

`server run on: http://:localhost : 8181`

And if there are no login errors you should see the message painted in purple:

`connected to MongoDb!`

## Available Routes

### Register a new user

```http
  POST /api/users/register
```

### Login a user

```http
  POST /api/users/login
```

### For Information about a user

```http
  GET /api/users/userInfo
```

You will need to provide a token to get an answer from this api

### To receive all todos

```http
  GET /api/todos/todos
```

You will need to provide a token to get an answer from this api

### To receive a specific task

```http
  GET /api/todos/todo/:id
```

You will need to provide a token to get an answer from this api

#### Return this todo object

| todo key           | type    | min | max  | remark   |
| ------------------ | ------- | --- | ---- | -------- |
| title              | string  | 2   | 256  | required |
| description        | string  | 2   | 1024 | required |
| createdAt          | date    |     |      | Date.now |
| user_id            | string  | 2   | 256  | required |
| completed          | boolean |     |      | false    |
| priority           | number  |     |      | required |
| category           | string  | 2   | 256  | required |
| completionDate     | date    |     |      |          |
| dueDate            | date    |     |      | required |
| remarks            | string  | 2   | 1024 |          |
| inResponsibilityOf | string  | 2   | 1024 | required |

#### To create a new todo

```http
  POST /api/todos/
```

You will need to provide a token to get an answer from this api

#### To update a todo

```http
  PUT /api/todos/:id
```

You will need to provide a token to get an answer from this api

#### To delete a todo

```http
  DELETE /api/todos/:id
```

You will need to provide a token to get an answer from this api

#### To change todo isComplete status

```http
  PATCH /api/todos/isCompleted/:id
```

You will need to provide a token to get an answer from this api

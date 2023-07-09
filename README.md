# chat

## Requirements

- Docker

## Environment Variables

The following environment variables must be set before running the project:

in client folder

```sh
export REACT_APP_API_AUTH_BASE_URL=http://localhost:8080
```

in backend folder

```sh
export SERVER_PORT=8080
export DB_URI="mongodb://db:27017/chat"
export CLIENT_URL=http://localhost:3000
```

set up one file in each service

## Running the Service

To run the Listener Service, clone the repository and install the dependencies:

```sh
git clone git@github.com:OlremProj/chat.git
cd chat
```

Then, start the service with the following command:

```sh
docker-compose up
```

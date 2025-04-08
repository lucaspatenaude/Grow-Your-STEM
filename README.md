# ✅ Getting Started

## 📌 Application Information

**Type:** `node.js`

Web application that is deployed through Docker @ port `3003`

## 🐳 Install Docker

> [!WARNING]
>
> In order to deploy the web application the following must be installed:
>
> 1. [Docker](https://docs.docker.com/get-docker/)
> 2. [Docker-Compose](https://docs.docker.com/compose/install/)
> 3. [Node.js](https://nodejs.org/en/download)

## 📦 Running the Container

1. Open the terminal in the program directory: `/WRTG-3030-Project` (this is the folder containing `docker-compose.yml`)
2. In the program directory run the following command:

`docker-compose up`

This should launch the web application

3. Check to see that the container has launched. Run the following command in the terminal to check:

`docker ps`

You should see an output as follows:

```txt
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                         NAMES
8aacc138f334   node:lts   "docker-entrypoint.s…"   2 seconds ago   Up 2 seconds   0.0.0.0:3003->3000/tcp, [::]:3003->3000/tcp   web-interface
```

## 🌎 Navigating to the Web Application

To view the application enter the following address in your browser:

`localhost:3003`

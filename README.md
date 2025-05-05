# ✅ Getting Started

## 📌 Application Information

**Type:** `node.js`

Web application that is deployed through Docker @ port `3000` by default.

Users can also go to `.env` to set a custom port if `3000` is already in use.

## 🐳 Install Docker

> [!WARNING]
>
> In order to deploy the web application the following must be installed:
>
> 1. [Docker](https://docs.docker.com/get-docker/)
> 2. [Docker-Compose](https://docs.docker.com/compose/install/) (Compose may already come pre-installed on most platforms)

## 📦 Running the Container

1. Open the terminal in the program directory: `/Grow-Your-STEM` (this is the folder containing `docker-compose.yml`)
2. In the program directory run the following command:

`docker-compose up`

This should launch the web application

3. Check to see that the container has launched. Run the following command in the terminal to check:

`docker ps`

You should see an output as follows:

```txt
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                         NAMES
8aacc138f334   node:lts   "docker-entrypoint.s…"   2 seconds ago   Up 2 seconds   0.0.0.0:3000->3000/tcp, [::]:3003->3000/tcp   web
```

## 🌎 Navigating to the Web Application

To view the application enter the following address in your browser:

`localhost:3000` or your custom set port from `.env` instead of `3000`

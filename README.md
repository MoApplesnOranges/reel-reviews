# Module3 Project Gamma

## Getting started

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

# Reel Reviews

- Will Mo
- Nick Ignatovich
- Jonah Han
- Kevin Almonte

# Intended Market

We are targeting fellow movie lovers who are looking to leave their unfiltered reviews and become a part of our evergrowing community.

# Project Initialization

To start leaving your hot reviews on Reel Reviews, follow these steps:

1. Clone the repository down to your local machine
2. Navigate into the new project directory in your terminal
3. Run `docker volume create pg-admin` and `docker volume create postgres-data`
4. CD into "ghi" directory. Run `npm install bootstrap` and run `npm install react-bootstrap`.
5. Open Docker
6. Run `docker compose build`
7. Run `docker compose up`
8. Navigate to http://localhost:3000 in your broswer
9. Enjoy!

## Project layout

In the api folder are the FastAPI queries, routes, and Dockerfiles.

Docs folder contains additional wireframes for design of application.

The ghi folder contains src folder using React components.

### Directories

In `api` is a directory for the migrations.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service.
- `.gitlab-ci.yml`
- `.gitignore`
- `.env.sample`

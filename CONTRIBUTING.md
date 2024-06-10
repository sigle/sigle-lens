# Contributing to Sigle

We're open to all community contributions! This includes bug reports, feature requests, ideas, pull requests. If you are unsure about anything, just ask us in Discord, we're happy to help!

## Requirements

- [Node](https://nodejs.org/en/) 20+
- [pnpm](https://pnpm.io/) 9+
- [Docker](https://www.docker.com/)

## Pull Requests

For non-bug-fixes, please open an issue first and discuss your idea to make sure we're on the same page.

**Before submitting a pull request**, please make sure the following is done:

- Fork the repository and create a new branch from `main`.
- Must not break the test suite. If you're fixing a bug, include a test that would fail without your fix.
- Must be formatted and linted with biome (`pnpm run format`).
- Must be **isolated**. Avoid grouping many, unrelated changes in a single PR.
- Must contain a changeset file describing the changes and affected packages. Run `pnpm changeset` to generate one.

## Structure

Sigle is a monorepo made of multiple applications and packages:

- `apps` - Contains the apps.
  - `web` - Contains the user facing application.
  - `server` - Contains the server application and API.
- `packages` - Contains the shared packages.

## Development Workflow

To setup the project locally you first need to fork the project on Github (top right on the project page). Then clone the project:

```sh
git clone git@github.com:yourname/sigle-lens.git`
```

Now you can run the following command to install the dependencies:

```sh
pnpm install
```

To start the project in development/watch mode run:

```sh
docker compose up --build
```

And press `w` to start the Docker watch mode for the apps.

This will start the databases and the applications services. You can now open your browser and go to http://localhost:3000 to see the app.

### Docker services

| Name          | Link                  |
| ------------- | --------------------- |
| @sigle/web    | http://localhost:3000 |
| @sigle/server | http://localhost:3001 |

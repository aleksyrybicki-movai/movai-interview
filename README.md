# mov.ai Interview

## Repository for interviews with new developers

This is NX monorepo fully typed with typescript.
Libraries:

- `libs/api-interfaces` contains all API interfaces

Applications:

- `apps/api` contains express application which has in-memory database and handles api routes
- `apps/interview` is actual react app with api connectors and react-query preinstalled

# API Connectors

Located in `apps/interview/src/app/api`. Basically they are functions that return promise (which resolves to actual response).

# API Documentation

After running app - available under http://127.0.0.1:4200/#/api-docs

# Tasks

1. Css Card task is located in `apps/interview/src/CardTask`
2. Css Layout task is located in `apps/interview/src/LayoutTask`
3. Coding task is located in `apps/interview/src/CodingTask`

# Run Dev Server

```
npm start
```

# Lint

```
npm run lint
```

# Interview process using gitpod

https://ctct.atlassian.net/wiki/spaces/TD/pages/11735205446/GitPod+Workflow

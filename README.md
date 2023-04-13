# QA Automation Playground

This project is a lightweight React app, intended to create some somewhat interesting scenarios for experimenting with playwright, WDIO, and other automation tools that strike my fancy.

## Available Scripts

### Running locally 

Will launch at [http://localhost:9001/qa-playground](http://localhost:9001/qa-playground):

```
npm start
```

### Deployment

Deploy the site to GitHub Pages, as described below.  Wraps the `npm run build` script.

```
npm run deploy
```

## Setup Notes

### Versions

This was built on node 16.15.1 / npm 8.11.0.

### Primary dependencies

- [Mui](https://mui.com/material-ui/getting-started/overview/)

### General

This project is a means to an end, and a simple deployment was a top priority.  

- enable app routing
  - React Router v6 [guide](https://dev.to/salehmubashar/react-router-dom-36a2)
- deploy to GitHub Pages for simplicity (via script, not GUI)
  - React [docs](https://create-react-app.dev/docs/deployment/#github-pages)
- preserve SPA routing functionality in deployed app
  - Super helpful [example](https://github.com/rafgraph/spa-github-pages)
# v2-dipl.io

> A faster, more modern dipl.io for online Diplomacy games!

This README is very much a work in progress.

## Build Setup

1. [Set up and start running a local instance of Diplicity.](https://github.com/zond/diplicity)
1. Clone this repository.
1. Install dependencies using `npm install`.
1. Create a .env.local file in the project root. Populate it with
```
VUE_APP_DIPLICITY_ENDPOINT=http://localhost:8080
VUE_APP_DOMAIN=http://localhost:8081
```
(Modify port numbers as necessary.)

5. Kick off the dipl.io dev server using `npm run serve`. The port used by the server should match `VUE_APP_DOMAIN`.
5. Visit the URL in your browser.

## Commands
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

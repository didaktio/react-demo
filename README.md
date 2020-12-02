# React Demo

React demo using [Hooks](https://reactjs.org/docs/hooks-intro.html), [Functional Components](https://reactjs.org/docs/components-and-props.html), and [Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/).

Because common sense, it's React **[with TypeScript](https://create-react-app.dev/docs/adding-typescript/)**.

Also demonstrated:
* BEM [(Block, Element, Modifier)](https://en.bem.info/methodology/quick-start/) approach
* Lazy-loading (using [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API))
* Custom image slider
* Testing with [Cypress](https://www.cypress.io/)

**LIVE**: https://react.didakt.io

## Getting Started
1) Clone or download the repo into a fresh folder on your machine.
2) Run `npm install` from the project root to install dependencies.
3) Run `npm start` to start the development server.
4) Edit/break/improve/add to the code, starting with the `App.tsx` file.

#### Testing
Run `npm run test`, which concurrently starts a dev server at `http://localhost:3001` and opens [Cypress](https://www.cypress.io/) in a separate window. In Cypress, click the `main.spec.js` file to begin the tests. Adding tests is very
[straightforward](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-your-first-test).

#### TODO?
* [Server-Side Rendering](https://www.freecodecamp.org/news/server-side-rendering-your-react-app-in-three-simple-steps-7a82b95db82e/).
* Implement [Custom Hooks](https://reactjs.org/docs/hooks-custom.html) where useful.
* Add tests for ensuring image slider works.

#### Troubleshooting
* Typescript complaints about `--jsx flags` and incompatible versions &mdash; Try:
    * Ensuring your using the latest and/or compatible versions of React and TypeScript.
    * If using VSCode, Set ts server to use local version of TypeScript, via command palette.
    * If using VSCode, [restart the ts server](https://stackoverflow.com/questions/47700939/how-to-reset-intellisense-in-vs-code/55212141).
    * Restarting your IDE.
* `Argument for '--jsx' option must be: 'preserve', 'react-native', 'react'.ts` &mdash; Ignore it.
* If Cypress complains about the server not being live, ensure your app is loading at `http://localhost:3001`. Then try again.
Sometimes the dev server is too slow for Cypress. If this problem persists, perform the two automated steps manually: run `npm start`, wait for the server to load, then `npm run cypress:open`.

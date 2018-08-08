# visualization-components

This is a repository about data visualization components.

## TiDB Admin

TiDB-Admin uses React. We’ll use Facebook’s create-react-app to create an empty React app, and install the react-admin package:


### Setting Up

```
npm install -g create-react-app
create-react-app test-admin
cd test-admin/
yarn add react-admin prop-types
yarn start
```

You should be up and running with an empty React application on port 3000.

### Using an API As Data Source

TiDB-Admin runs in the browser, and uses REST APIs for fetching and storing data.

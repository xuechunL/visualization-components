# TiDB Admin

TiDB-Admin uses React. We’ll use Facebook’s create-react-app to create an empty React app, and install the react-admin package:

## Install Dependencies

```
npm install
```

## Development Setting Up

```
npm start
```

You should be up and running with an empty React application on port 3000.

### Using an API As Data Source

TiDB-Admin runs in the browser, and uses REST APIs for fetching and storing data.

> note: The APIs used in this project are provided by [PD](https://github.com/pingcap/pd) in the [TiDB](https://github.com/pingcap/tidb) Cluster deployed by using docker compose in local. For specific environment deployment operations, refer to the documentation: [How To Spin Up an HTAP Database in 5 Minutes with TiDB + TiSpark](https://pingcap.com/blog/how_to_spin_up_an_htap_database_in_5_minutes_with_tidb_tispark/)

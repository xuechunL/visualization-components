// in src/dashboard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ViewTitle } from 'react-admin';

const ClusterStatus = () => (
  <div>Status</div>
)

export default () => (
  <div>
    <Card>
        <ViewTitle title="Welcome to the TiDB Dashboard" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    </Card>

    <Card>
        <ViewTitle title="Cluster Status" />
        <CardContent>
          <ClusterStatus />
        </CardContent>
    </Card>
  </div>
);

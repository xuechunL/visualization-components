// in src/containers/Regions.js
import React from 'react'
import { List, Datagrid, TextField, ArrayField } from 'react-admin/lib'

export const RegionList = props => (
  <List title="All Regions" {...props} perPage={10}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="start_key" />
      <TextField source="end_key" />
      <TextField source="epoch.version" />
      <TextField source="epoch.conf_ver" />
      <ArrayField source="peers">
        <Datagrid>
          <TextField source="id" />
          <TextField source="store_id" />
        </Datagrid>
      </ArrayField>
    </Datagrid>
  </List>
)

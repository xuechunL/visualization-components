// in src/resources/Regions.js
import React from 'react'
import { List, Datagrid, TextField, TextInput, Filter } from 'react-admin/lib'

const StoreFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="State" source="state_name" defaultValue="Down" />
  </Filter>
)

export const StoreList = props => (
  <List title="All Stores" {...props} perPage={10} filters={<StoreFilter />}>
    <Datagrid>
      <TextField source="id" sortable={false} />
      <TextField source="address" />
      <TextField source="version" />
      <TextField source="capacity" />
      <TextField source="available" />
      <TextField source="uptime" />
      <TextField source="region_count" />
      <TextField source="leader_count" />
      <TextField source="last_heartbeat_ts" />
      <TextField source="state_name" />
    </Datagrid>
  </List>
)

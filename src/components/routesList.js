import React from 'react'
import { Paper, List, ListItem } from '@material-ui/core'

export const RoutesList = ({ routes = [], currentRoute = '', onSelectRoute = () => {} }) => {
  return (
    <Paper style={{ margin: '20px', textAlign: 'center' }}>
      <h1>Routes</h1>
      <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
        {routes.map((route, idx) => 
          <ListItem 
            onClick={onSelectRoute}
            selected={currentRoute === route.Route}
            value={route.Route} 
            key={idx}
          >
            {route.Description}
          </ListItem>
        )}
      </List>
    </Paper> 
  )
} 

export default RoutesList
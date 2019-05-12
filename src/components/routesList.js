import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, List, ListItem } from '@material-ui/core'
import { header } from '../utils/styleConstants'

const styles = {
  header
}

export const RoutesList = ({ 
  classes = {},
  routes = [], 
  currentRoute = '', 
  onSelectRoute = () => {},
  history = {},
}) => {
  const currentRouteData = routes.find(x => x.Route === currentRoute)
  return (
    <Paper style={{ margin: '20px', textAlign: 'center' }}>
      <h1 onClick={() => history.push('/')} className={classes.header}>Routes</h1>
      {currentRoute === '' ?
        <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
          {routes.map((route, idx) => 
            <ListItem 
              onClick={() => onSelectRoute(route.Route)}
              selected={currentRoute === route.Route}
              key={idx}
            >
              {route.Description}
            </ListItem>
          )}
        </List>:
        <h4 style={{ margin: '15px' }}>
          {currentRouteData.Description}
        </h4>
      }
    </Paper> 
  )
} 

export default withStyles(styles)(RoutesList)
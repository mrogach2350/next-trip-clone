import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, List, ListItem, Button } from '@material-ui/core'
import { flexHeader } from '../utils/styleConstants'

const styles = {
  header: {
    ...flexHeader,
  },
  root: { 
    margin: '20px', 
    textAlign: 'center', 
  }
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
    <Paper className={classes.root}>
      <div className={classes.header}>
        <h1 style={{ margin: 0 }}>Routes</h1>
        <Button onClick={() => history.push('/')} variant="contained" >Reset</Button>
      </div>
      {/* <h1 onClick={() => history.push('/')} className={classes.header}>Routes</h1> */}
      {currentRoute === '' ?
        <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
          {routes.map((route, idx) => 
            <ListItem 
              button
              onClick={() => onSelectRoute(route.Route)}
              selected={currentRoute === route.Route}
              key={idx}
            >
              {route.Description}
            </ListItem>
          )}
        </List>:
        <h4 style={{ padding: '15px', margin: 0 }}>
          {currentRouteData.Description}
        </h4>
      }
    </Paper> 
  )
} 

RoutesList.propTypes = {
  classes: PropTypes.object,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      Route: PropTypes.string,
      Description: PropTypes.string,
    })
  ),
  currentRoute: PropTypes.string,
  onSelectRoute: PropTypes.func,
  history: PropTypes.object,
}

export default withStyles(styles)(RoutesList)
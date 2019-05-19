import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
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
  },
  list: { 
    maxHeight: '70vh', 
    overflow: 'scroll' 
  },
  h1: {
    margin: 0,
  }
}

export const RoutesList = ({ 
  classes = {},
  routes = [], 
  currentRouteData = {}, 
  onSelectRoute = () => {},
  history = {},
}) => {
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.h1}>Routes</h1>
        <Button onClick={() => history.push('/')} variant="contained" >Reset</Button>
      </div>
      {isEmpty(currentRouteData) ?
        <List className={classes.list}>
          {routes.map((route, idx) => 
            <ListItem 
              button
              onClick={() => onSelectRoute(route.Route)}
              selected={currentRouteData.Route === route.Route}
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
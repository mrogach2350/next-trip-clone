import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, List, ListItem } from '@material-ui/core'
import { header } from '../utils/styleConstants'

const styles = {
  header,
  root: { 
    margin: '20px', 
    textAlign: 'center', 
  },
  list: { 
    maxHeight: '60vh', 
    overflow: 'scroll', 
  }
}

export const StopsList = ({ 
  stops = [], 
  classes = {}, 
  onStopClicked = () => {} 
}) => 
  <Paper className={classes.root}>
    <h1 className={classes.header}>Stops</h1>
    <List className={classes.list}>
      {stops.map((stop, idx) => 
        <ListItem 
          button
          onClick={() => onStopClicked(stop)}
          value={stop.Value} 
          key={idx}
        >
          {stop.Text}
        </ListItem>
      )}
    </List>
  </Paper>

export default withStyles(styles)(StopsList)
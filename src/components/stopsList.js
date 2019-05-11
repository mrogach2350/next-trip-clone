import React from 'react'
import { Paper, List, ListItem } from '@material-ui/core'

export const StopsList = ({ stops = [] }) => {
  return (
    <Paper style={{ margin: '20px', textAlign: 'center' }}>
      <h1>Stops</h1>
      <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
        {stops.map((stop, idx) => 
          <ListItem 
            value={stop.Value} 
            key={idx}
          >
            {stop.Text}
          </ListItem>
        )}
      </List>
    </Paper>
  )
}

export default StopsList
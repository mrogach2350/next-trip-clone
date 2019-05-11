import  React from 'react'
import { Paper, List, ListItem } from '@material-ui/core'

export const DirectionButtons = ({ directions = [], currentDirection = '', onSelectDirection = () => {} }) => {
  return (
    <Paper style={{ margin: '20px', textAlign: 'center' }}>
      <h1>Direction</h1>
      <List style={{ maxHeight: '500px', overflow: 'scroll' }}>
        {directions.map((direction, idx) => 
          <ListItem 
            onClick={onSelectDirection}
            selected={currentDirection === direction.Value}
            value={direction.Value} 
            key={idx}
          >
            {direction.Text}
          </ListItem>
        )}
      </List>
    </Paper>
  )
}

export default DirectionButtons
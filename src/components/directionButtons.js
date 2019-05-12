import  React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'
import { header } from '../utils/styleConstants'

const styles = {
  root: { 
    margin: '20px', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  button: {
    margin: '10px',
  },
  header,
}

export const DirectionButtons = ({ 
    classes = {},
    directions = [], 
    currentDirection = '', 
    onSelectDirection = () => {} 
  }) => {
    return (
    <Paper style={{ textAlign: 'center' }}>
    <h1 className={classes.header}>Direction</h1>
    <div className={classes.root}>
      {directions.map((direction, idx) => 
        <Button 
          key={idx}
          className={classes.button}
          variant="contained" 
          color={currentDirection === direction.Value ? "primary" : ''}
          onClick={() => onSelectDirection(direction.Value)}
        >
          {direction.Text}
        </Button>
      )}
    </div>
    </Paper>
  )
  }

export default withStyles(styles)(DirectionButtons)
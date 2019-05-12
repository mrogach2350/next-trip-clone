import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'
import { header } from '../utils/styleConstants'

const styles = {
  root: { 
    margin: 0,
    padding: '16px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center' 
  },
  button: {
    margin: '10px',
  },
  header,
  paper: { 
    margin: '20px', 
    textAlign: 'center', 
  }
}

export const DirectionButtons = ({ 
    classes = {},
    directions = [], 
    currentDirection = '', 
    onSelectDirection = () => {} 
  }) => 
    <Paper className={classes.paper}>
      <h1 className={classes.header}>Direction</h1>
      <div className={classes.root}>
        {directions.map((direction, idx) => 
          <Button 
            key={idx}
            className={classes.button}
            variant="contained" 
            color={currentDirection === direction.Value ? "primary" : "default"}
            onClick={() => onSelectDirection(direction.Value)}
          >
            {direction.Text}
          </Button>
        )}
      </div>
    </Paper>

DirectionButtons.propTypes = {
  classes: PropTypes.object,
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      Value: PropTypes.string,
      Text: PropTypes.string,
    })
  ),
  currentDirection: PropTypes.string,
  onSelectDirection: PropTypes.func,
}

export default withStyles(styles)(DirectionButtons)